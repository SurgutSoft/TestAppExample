import {action, computed, makeAutoObservable, observable, } from 'mobx';
import {apiClient} from "../api/api";

import {IEventResponse} from '../api/apiResponseTypes';
import {Event} from '../models/Event';
import {EVENT_ID} from "../consts/localStorage";

class EventStore {
  @observable public eventId: number = Number(window.localStorage.getItem(EVENT_ID));

  @observable public items?: Event;
  
  @observable public isLoading?: boolean;

  constructor() {
    makeAutoObservable(this)
  }

  @action
  public setEventId = (eventId: number) => {
    if (eventId > 0) {
      window.localStorage.setItem(EVENT_ID, eventId.toString());
      this.eventId = eventId;
      this.fetchEventData()
    }
  }

  @computed
  public fetchEventData = async () => {
    try {
      const response: IEventResponse = await apiClient.getEventData(this.eventId);
      this.items = new Event(response);
    } catch (e) {
      console.error("EventStore.fetchEventData", e);
    }
  }

  @computed
  public uploadPhoto = async (files: FileList | null) => {
    let maxFileSize = 0.5 * 1024 * 1024 * 1024;
    let formData = new FormData();

    if (files?.length) {
      const file = files[0];

      if ((file.size <= maxFileSize) && (['image/png', 'image/jpeg'].includes(file.type))) {
        formData.append('file', file);
      }

      await apiClient.uploadEventPhoto(this.eventId, formData);
    }
  }
}

export default new EventStore();
