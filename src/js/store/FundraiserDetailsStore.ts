import {action, computed, makeAutoObservable, observable} from 'mobx';
import {apiClient} from '../api/api';
import EventStore from './EventStore';
import {Event} from '../models/Event';
import moment from 'moment';

class FundraiserDetailsStore {
  @observable isEditMode: boolean = false;
  @observable public isLoading?: boolean;

  constructor() {
    makeAutoObservable(this)
  }

  @action
  public onSwitchDeteilsEditMode = () => this.isEditMode = !this.isEditMode;



  @computed
  public updateEventData = async (data?: Event) => {
    if (data) {
      //save event data info with anither api each value (need refactor later)
      this.isLoading = true;
      try {
        const eventDetailsFormData = new FormData();
        eventDetailsFormData.append('summary', data.summary);
        eventDetailsFormData.append('video', data.video || '');
        await apiClient.updateEventDetailsData(EventStore.eventId, eventDetailsFormData);

      } catch (e) {
        console.error("EventStore.updateEventDetailsData", e)
      }

      try {
        const eventFormData = new FormData();

        eventFormData.append('name', data.name);
        eventFormData.append('endDate', moment(data.end).format("MM/DD/yyyy"));

        await apiClient.updateEventData(EventStore.eventId, eventFormData);

      } catch (e) {
        console.error("EventStore.updateEventData", e)
      }

      try {
        const locationFormData = new FormData();

        locationFormData.append('state', data.state);
        locationFormData.append('schoolName', data.schoolName);
        locationFormData.append('city', data.city);
        locationFormData.append('zip', data.zip);

        await apiClient.updateFundraiserLocation(data.locationId, locationFormData);
      } catch (e) {
        console.error("EventStore.updateFundraiserLocation", e)
      }

      await EventStore.fetchEventData();
      this.isLoading = false;
    }
  }


}

export default new FundraiserDetailsStore();
