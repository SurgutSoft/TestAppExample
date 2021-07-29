import {action, computed, observable} from "mobx";
import {Path} from "../consts/router";

class AppStore {
  @observable public activePath: string = window.location.pathname || Path.fundraiser;

  @action
  setActivePath = (pathValue: string) => {
    this.activePath = pathValue;
  }

  @computed
  getBreadCrumbByPath = () => {
    switch(true) {
      case this.activePath === Path.main: return '/ Overview';
      case this.activePath === Path.fundraiser: return '/ Fundraiser Details';
      case this.activePath === Path.students: return '/ Students';
      case this.activePath === Path.teams: return '/ Teams';
      case this.activePath === Path.donations: return '/ Donations';

      default: return '/ none describe bread crumb';
    }
  }
}

export default new AppStore();