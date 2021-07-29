import {action, computed, makeAutoObservable, observable} from "mobx";
import {apiClient} from "../api/api";
import {ITeamMembersResponse} from "../api/apiResponseTypes";
import {RegistrationTypeEnum, SortColEnum, SortDirectionEnum} from "../consts/TeamMembers";
import {saveAs} from 'file-saver';
import EventStore from "./EventStore";

class TeamMembersStore {
  @observable public data: ITeamMembersResponse[] = [];

  @observable public filteredData: ITeamMembersResponse[] = [];

  @observable public loading: boolean = false;

  @observable public isExportLoading: boolean = false;

  @observable public registred?: number;

  @observable public filterByName?: string;

  @observable public filterByRegistrationType: string = RegistrationTypeEnum.ANY;

  @observable public filterByTeamId: number | string = 'any';

  @observable public activeSortCol?: SortColEnum;

  @observable public sortDirection?: SortDirectionEnum;

  @observable public selectedIdMember?: number;

  constructor() {
    makeAutoObservable(this)
  }

  @computed
  public fetchTeamMember = async () => {
    try {
      this.loading = true;
      const data = await apiClient.getTeamMembers(EventStore.eventId);
      this.data = this.baseSorting(data);
      this.filteredData = data;
    }
    catch (e) {
      console.error("TeamMembersStore.fetchTeamMember", e);
    }
    finally {
      this.loading = false;
    }
  }

  @computed
  public getRegistredCount = (): number =>
    this.data.reduce((acc, cur) => acc = acc + cur.team.targetSize, 0);

  @computed
  public getStudentCount = (): number => this.data.length;

  @computed
  public getPercentDonationStudents = (): number => this.data.filter(item => item.progress.raisedSum > 0).length / this.data.length * 100;

  @action.bound
  public deleteUser = (idUser: number) => {
    return `deleted ${idUser}`
  }

  @action.bound
  public handleChangeFilterByName = (value: string) => {
    this.filterByName = value;
    this.getFilteredData();
  }

  @action.bound
  public handleChangeFilterByRegistrationType = (e: any) => {
    this.filterByRegistrationType = e.target.value;
    this.getFilteredData();
  }

  @action.bound
  public handleChangeFilterByTeamId = (e: any) => {
    this.filterByTeamId = e.target.value
    this.getFilteredData();
  }

  @computed
  public getFilteredData = () => {
    let filteredData = this.data;

    if (this.filterByName) {
      filteredData = filteredData.filter(item =>
        item.user.firstName?.toLowerCase().indexOf(this.filterByName?.toLowerCase()!) === 0
        || item.user.lastName?.toLowerCase().indexOf(this.filterByName?.toLowerCase()!) === 0
        || item.user.email?.toLowerCase() === this.filterByName?.toLowerCase());
    }

    if (this.filterByRegistrationType) {
      filteredData = filteredData.filter(item => {
        if (this.filterByRegistrationType === RegistrationTypeEnum.SELF_REGiSTRATION) {
          return !!item.user.email
        }

        if (this.filterByRegistrationType === RegistrationTypeEnum.MANAGED_PROFILE) {
          return !item.user.email
        }

        return true
      })
    }

    if (this.filterByTeamId && this.filterByTeamId !== 'any') {
      filteredData = filteredData.filter(item => item.teamId === this.filterByTeamId);
    }

    this.filteredData = filteredData;
  }

  @computed
  public exportTeamMembers = async () => {
    try {
      this.isExportLoading = true;
      const data = await apiClient.getEventTeamMembersCsv(EventStore.eventId);
      saveAs(new Blob([data], {type: 'text/csv'}), `members_${EventStore.items?.name.replace(/\s+/g, '-').toLowerCase()}.csv`);
    } catch (e) {
      console.error("TeamMembersStore.exportTeamMembers", e);
    } finally {
      this.isExportLoading = false;
    }
  }

  @computed
  public selectIdMember = (id: number) => this.selectedIdMember = id;

  @computed
  public deleteTeamMember = async () => {
    try {
      console.log(`deleted idMember = ${this.selectedIdMember}`)
    } catch (e) {
      console.error("TeamMembersStore.deleteTeamMember", e);
    }
  }


  @action.bound
  setActiveSortCol = (col: SortColEnum) => {
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

  @computed
  baseSorting = (data: ITeamMembersResponse[]) => {
    return data
      .sort((a, b) => {
        const aCompareString = `${a.team.gradeDisplay} ${a.user.firstName}`;
        const bCompareString = `${b.team.gradeDisplay} ${b.user.firstName}`;
        return aCompareString.localeCompare(bCompareString)
      })
  }

  @action.bound
  setSortDirection = (direction: SortDirectionEnum) => {
    this.sortDirection = direction;
  }

  @action.bound
  public sortByActiveSortCol = () => {
    if (this.activeSortCol === SortColEnum.MINUTES) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.filteredData
          .sort((a, b) => a.progress.minsSum - b.progress.minsSum);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.filteredData
          .sort((a, b) => b.progress.minsSum - a.progress.minsSum);
      }
    }

    if (this.activeSortCol === SortColEnum.BOOKS) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.filteredData
          .sort((a, b) => a.progress.booksSum - b.progress.booksSum);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.filteredData
          .sort((a, b) => b.progress.booksSum - a.progress.booksSum);
      }
    }

    if (this.activeSortCol === SortColEnum.DONATIONS) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.filteredData
          .sort((a, b) => a.progress.raisedSum - b.progress.raisedSum);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.filteredData
          .sort((a, b) => b.progress.raisedSum - a.progress.raisedSum);
      }
    }

    if (this.activeSortCol === SortColEnum.GRADE) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.filteredData
          .sort((a, b) => a.team.grade - b.team.grade);
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.filteredData
          .sort((a, b) => b.team.grade - a.team.grade);
      }
    }

    if (this.activeSortCol === SortColEnum.ACTIVE_AT) {
      if (this.sortDirection === SortDirectionEnum.ASCENDING) {
        this.filteredData
          .sort((a, b) => (b.user.activeAt || 0) - (a.user.activeAt || 0));
      }

      if (this.sortDirection === SortDirectionEnum.DESCENDING) {
        this.filteredData
          .sort((a, b) => (a.user.activeAt || 0) - (b.user.activeAt || 0));
      }
    }
  }

}

export default new TeamMembersStore();
