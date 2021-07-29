import {computed, makeAutoObservable, observable} from "mobx";
import moment from "moment";
import {apiClient} from "../api/api";
import {IPaymentsByDate} from "../api/apiResponseTypes";
import EventStore from "./EventStore";

class OverviewStore {
  @observable public loading: boolean = false;

  @observable public items: IPaymentsByDate[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  @computed
  public fetchItemsList = async () => {
    try {
      this.loading = true;
      const data = await apiClient.getPaymentsByDate(EventStore.eventId);
      this.items = data;
    } catch (e) {
      console.error("TeamStore.fetchTeamsList", e);
    } finally {
      this.loading = false;
    }
  }

  @computed
  public getPaymentChartData = () => {
    const obj = this.items
      .map(item => ({
        created: item.created,
        date: moment(item.created).format('DD/MM'),
        amount: item.amount,
      }))

    if (obj.length < 30 && obj.length >= 3) {
      for (let i = obj.length; i < 31; i++) {
        obj.push({
          amount: 0,
          created: moment(obj[i - 1].created).subtract(1, 'day').valueOf(),
          date: moment(obj[i - 1].created).subtract(1, 'day').format('DD/MM'),
        })
      }
    }

    return obj
  }

  @computed
  public getRaisedPercent = (): number => {
    return EventStore.items?.raisedSum! / EventStore.items?.fundraising! * 100;
  }
}

export default new OverviewStore();
