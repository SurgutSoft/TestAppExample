export interface IFundraiserOptionFormData {
  readingBooksEnabled: boolean,
  hideComments: boolean,
  showDonations: boolean,
  accessToDonationPage: boolean,
}

export interface IFunsraiserGoals {
  fundraising: number;
  fundraisingPerMember: number;
  readingBooks: number;
  readingBooksPerMember: number;
  readingMins: number;
  readingMinsPerMember: number;
  readingBooksEnabled: number;
}