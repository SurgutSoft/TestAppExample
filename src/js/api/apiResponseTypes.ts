export interface IUserBodyResponse extends IUserResponse {}

export interface IUserResponse {
  activeAt: number
  avatar: string
  created: number;
  createdBy: number;
  displayName: string;
  email: string;
  emailVerified: boolean;
  events: IEvents[];
  firstName: string;
  id: number;
  lastName: string;
  managed: IManaged[];
  password: boolean;
  personalMessage: string;
  role: string;
}

export interface IEvents {
  approved: boolean;
  assignedUserId: number;
  closed: boolean;
  created: number;
  currency: string;
  end: number;
  id: number;
  location: ILocation;
  name: string
  role: string
  start: number;
  teamId: number;
}

interface ILocation {
  address1: string;
  city: string;
  country: string;
  currency: string;
  displayCountry: string;
  id: number;
  schoolName: string;
  state: string;
  valid: boolean;
  zip: string;
}

export interface IManaged {
  accessToken: string;
  avatar: string;
  firstName: string;
  id: number;
  lastName: string;
}

// event Response
export interface IEventResponse {
  id: number,
  name: string;
  end: number;
  shareLink: string;
  location: IEventLocation,
  details: {
    personalMessage: string;
    summary: string;
    video?: string;
    photo?: string;
  };
  goals: {
    fundraising: number;
    fundraisingPerMember: number;
    readingBooks: number;
    readingBooksEnabled: number;
    readingBooksPerMember: number;
    readingMins: number;
    readingMinsEnabled: number;
    readingMinsPerMember: number;
  }
  options: {
    hideComments: boolean;
    showDonations: boolean;
    accessToDonationPage: boolean;
  }
  progress: IProgress;
}

interface IEventLocation {
  country: string;
  currency: string;
  displayCountry: string;
  id: number;
  schoolName: string;
  valid: boolean;
  zip: string;
  state: string;
  displayState: string;
  city: string;
  address1: string;
}

// TeamMembers

export interface ITeamMembersResponse {
  id: number;
  teamId: number;
  user: IUser;
  progress: IProgress;
  team: ITeam;
};

interface IUser {
  id: number;
  activeAt?: number;
  avatar: string;
  firstName: string;
  lastName: string;
  displayName: string;
  emailVerified: boolean;
  email: string;
};

interface IProgress {
  booksSum: number;
  raisedSum: number;
  donationsCount: number;
  minsSum: number;
};

interface ITeam {
  grade: number;
  gradeDisplay: string;
  targetSize: number;
}

// Teams
export interface ITeamsResponse {
  eventId: number;
  grade: number;
  gradeDisplay: string;
  id: number;
  inviteCode: string;
  name: string;
  size: number;
  targetSize: number;
  progress: IProgress;
  owner: IOwner;
}

interface IOwner {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

// donations

export interface IDonationsResponse {
  amount: number;
  feeAmount: number;
  netAmount: number;
  created: number;
  donorEmail: string;
  donorMessage: string;
  donorName: string;
  id: number;
  chargeId: string;
  public: boolean;
  matchCorp: boolean;
  status: string;
  team: {
    name: string;
  }
  beneficiary: {
    displayName: string;
  }
}

//overview

export interface IPaymentsByDate {
  id: number;
  amount: number;
  created: number;
}