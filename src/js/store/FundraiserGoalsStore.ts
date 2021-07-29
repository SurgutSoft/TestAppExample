import {action, computed, makeAutoObservable, observable} from "mobx";
import {apiClient} from "../api/api";
import {IFunsraiserGoals} from "../interfaces/IFundraisers";
import EventStore from "./EventStore";



class FundraiserGoalsStore {
  @observable isEditMode: boolean = false;
  @observable public isLoading?: boolean;

  constructor() {
    makeAutoObservable(this)
  }
  
  @action
  public onSwitchGoalsEditMode = () => this.isEditMode = !this.isEditMode;

  @computed
  public updateGoals = async (data: IFunsraiserGoals) => {
    try {
      this.isLoading = true;
      const formData = new FormData();
      //@ts-ignore
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      await apiClient.updateFundraiserGoals(EventStore.eventId, formData);
      await EventStore.fetchEventData();
      this.onSwitchGoalsEditMode();
    } catch (e) {
      console.error("FundraiserStore.updateGoals", e)
    } finally {
      this.isLoading = false;
    }
  }

}

export default new FundraiserGoalsStore();
