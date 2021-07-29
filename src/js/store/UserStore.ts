import {action, makeAutoObservable} from 'mobx';
import {apiClient} from "../api/api";
import {IUserBodyResponse} from '../api/apiResponseTypes';
import EventStore from './EventStore';
import {User} from '../models/User';
import {EVENT_ID} from '../consts/localStorage';

class UserStore {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  public fetchData = async () => {
    try {
      const response: IUserBodyResponse = await apiClient.getUser();
      if (!localStorage.getItem(EVENT_ID)) {
        EventStore.setEventId(response.events[0].id);
      } else {
        EventStore.setEventId(Number(localStorage.getItem(EVENT_ID)));
      }
      this.user = new User(response);

    } catch (e) {
      console.error("UserStore.fetchData", e);
    }
  }
}

export default new UserStore();
