import {computed, makeAutoObservable, observable} from "mobx";
import {apiClient} from "../api/api";
import {IFundraiserOptionFormData} from "../interfaces/IFundraisers";
import EventStore from "./EventStore";

class FundraiserOptionsStore {
  @observable public isLoading?: boolean;

  constructor() {
    makeAutoObservable(this)
  }

  @computed
  public updateOptions = async (data?: IFundraiserOptionFormData) => {
    try {
      if (data) {
        this.isLoading = true;
        const formData = new FormData();
        //@ts-ignore
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        await apiClient.updateFundraiserOptions(EventStore.eventId, formData);
        await EventStore.fetchEventData();
      }
    } catch (e) {
      console.error("FundraiserStore.updateOptions", e)
    } finally {
      this.isLoading = false;
    }
  }
}

export default new FundraiserOptionsStore();