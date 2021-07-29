
import {computed, makeAutoObservable, observable} from "mobx";
import {apiClient} from "../api/api";
import {IDonationsResponse} from "../api/apiResponseTypes";
import EventStore from "./EventStore";

class DonationsStore {
  @observable public loading: boolean = false;

  @observable public items: IDonationsResponse[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  @computed
  public fetchItemsList = async () => {
    try {
      this.loading = true;
      const data = await apiClient.getDonations(EventStore.eventId);
      this.items = data;
    } catch (e) {
      console.error("DonationsStore.fetchItemsList", e);
    } finally {
      this.loading = false;
    }
  }

  @computed
  public exportDonations = async () => {
    try {
      const data = await apiClient.getDonationsCsv(EventStore.eventId);
      saveAs(new Blob([data], {type: 'text/csv'}), `members_${EventStore.items?.name.replace(/\s+/g, '-').toLowerCase()}.csv`);
    } catch (e) {
      console.error("DonationsStore.exportDonations", e);
    }
  }
}

export default new DonationsStore();