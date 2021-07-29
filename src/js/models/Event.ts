import {IEventResponse} from "../api/apiResponseTypes";

export class Event {
  id: number;
  name: string;
  locationInfo: string;
  end: number;
  personalMessage: string;
  summary: string;
  video?: string;
  photo?: string;
  city: string;

  locationId: number;
  schoolName: string;
  zip: string;
  state: string;

  hideComments: boolean;
  showDonations: boolean;
  accessToDonationPage: boolean;

  fundraising: number;
  fundraisingPerMember: number;
  readingBooks: number;
  readingBooksEnabled: number;
  readingBooksPerMember: number;
  readingMins: number;
  readingMinsEnabled: number;
  readingMinsPerMember: number;

  raisedSum: number;
  booksSum: number;
  donationsCount: number;
  // minsSum: number;

  constructor(response: IEventResponse) {
    this.id = response.id;
    this.name = response.name;
    this.locationInfo = `${response.location.schoolName}, ${response.location.displayState} ${response.location.zip}, ${response.location.country}`;
    this.end = response.end;
    this.personalMessage = response.details.personalMessage;
    this.summary = response.details.summary;
    this.video = response.details.video;
    this.photo = response.details.photo;
    this.city = response.location.city;
    this.state = response.location.displayState;

    this.locationId = response.location.id;
    this.schoolName = response.location.schoolName;
    this.zip = response.location.zip;

    this.hideComments = response.options.hideComments;
    this.showDonations = response.options.showDonations;
    this.accessToDonationPage = response.options.accessToDonationPage;

    //goals
    this.fundraising = response.goals.fundraising;
    this.fundraisingPerMember = response.goals.fundraisingPerMember;
    this.readingBooks = response.goals.readingBooks;
    this.readingBooksEnabled = response.goals.readingBooksEnabled;
    this.readingBooksPerMember = response.goals.readingBooksPerMember;
    this.readingMins = response.goals.readingMins;
    this.readingMinsEnabled = response.goals.readingMinsEnabled;
    this.readingMinsPerMember = response.goals.readingMinsPerMember;

    //progress
    this.raisedSum = response.progress.raisedSum;
    this.donationsCount = response.progress.donationsCount;
    this.booksSum = response.progress.booksSum;
  }

  public static toRequestBody(event?: Event): IEventResponse {
    return {
      id: event?.id,
      name: event?.name,
      end: event?.end,

      goals: {
        fundraising: event?.fundraising,
        fundraisingPerMember: event?.fundraisingPerMember,
        readingBooks: event?.readingBooks,
        readingBooksEnabled: event?.readingBooksEnabled,
        readingBooksPerMember: event?.readingBooksPerMember,
        readingMins: event?.readingMins,
        readingMinsEnabled: event?.readingMinsEnabled,
        readingMinsPerMember: event?.readingMinsPerMember,
      },

      options: {
        accessToDonationPage: event?.accessToDonationPage,
        hideComments: event?.hideComments,
        showDonations: event?.showDonations,
      },
      
      details: {
        personalMessage: event?.personalMessage,
        summary: event?.summary,
        video: event?.video,
        photo: event?.photo,
      },

      location: {
        id: event?.locationId,
        zip: event?.zip,
        city: event?.city,
        schoolName: event?.schoolName,
        state: event?.state,
      },

      progress: {
        raisedSum: event?.raisedSum,
      }
    } as IEventResponse;
  }
}