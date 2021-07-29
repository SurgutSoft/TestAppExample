import {action, computed, makeAutoObservable, observable} from "mobx";
import {apiClient} from "../api/api";
import {ITeamsResponse} from "../api/apiResponseTypes";
import {IOption} from "../components/common/Select/Select";
import {SortTeamColsEnum, SortDirectionEnum} from "../consts/TeamMembers";
import EventStore from "./EventStore";

class TeamStore {
  @observable public loading: boolean = false;

  @observable public items: ITeamsResponse[] = [];

  @observable public activeSortCol: SortTeamColsEnum = SortTeamColsEnum.DONATIONS;

  @observable public sortDirection: SortDirectionEnum = SortDirectionEnum.DESCENDING;

  constructor() {
    makeAutoObservable(this)
  }

  @computed
  public fetchItemsList = async () => {
    try {
      this.loading = true;
      const data = await apiClient.getTeams(EventStore.eventId);
      this.items = this.baseSorting(data);
    } catch (e) {
      console.error("TeamStore.fetchTeamsList", e);
    } finally {
      this.loading = false;
    }
  }

  @computed
  public getOptions = () => {
    let options: Array<IOption> = [{
      label: 'Any',
      value: 'any',
    }];
    this.items.forEach(item => options.push({label: item.name, value: item.id.toString()}));

    return options;
  }

  //TODO need think about refactor later (duplicate code in stores)
  @action.bound
  setActiveSortCol = (col: SortTeamColsEnum) => {
    if (this.activeSortCol === col) {
      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.setSortDirection(SortDirectionEnum.ASCENDING)
      } else {
        this.setSortDirection(SortDirectionEnum.DESCENDING)
      }

    } else {
      this.activeSortCol = col;
      this.setSortDirection(SortDirectionEnum.DESCENDING)
    }

    this.sortByActiveSortCol();
  }

  @action.bound
  setSortDirection = (direction: SortDirectionEnum) => {
    this.sortDirection = direction;
  }

  @action.bound
  baseSorting = (data: ITeamsResponse[]) => {
    return data.sort((a, b) => b.progress.raisedSum - a.progress.raisedSum)
  }

  @action.bound
  public sortByActiveSortCol = () => {
    if (this.activeSortCol === SortTeamColsEnum.MINUTES) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.items
          .sort((a, b) => a.progress.minsSum - b.progress.minsSum);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.items
          .sort((a, b) => b.progress.minsSum - a.progress.minsSum);
      }
    }

    if (this.activeSortCol === SortTeamColsEnum.BOOKS) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.items
          .sort((a, b) => a.progress.booksSum - b.progress.booksSum);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.items
          .sort((a, b) => b.progress.booksSum - a.progress.booksSum);
      }
    }

    if (this.activeSortCol === SortTeamColsEnum.DONATIONS) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.items
          .sort((a, b) => a.progress.raisedSum - b.progress.raisedSum);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.items
          .sort((a, b) => b.progress.raisedSum - a.progress.raisedSum);
      }
    }

    if (this.activeSortCol === SortTeamColsEnum.GRADE) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.items
          .sort((a, b) => a.grade - b.grade);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.items
          .sort((a, b) => b.grade - a.grade);
      }
    }

    if (this.activeSortCol === SortTeamColsEnum.STUDENTS_COUNT) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.items
          .sort((a, b) => a.size - b.size);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.items
          .sort((a, b) => b.size - a.size);
      }
    }
  }

}

export default new TeamStore();