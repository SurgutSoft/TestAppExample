export enum Path {
  main = '/main',
  fundraiser = '/fundraiser',
  fundraiserInvite = '/fundraiser/invite',
  fundraiserInviteLetter = '/fundraiser/invite-letter',
  teams = '/teams',
  students = '/students',
  donations = '/donations',
  account = '/account',
  login = '/login',
  signUp = 'sign-up/:step'
}

export const BREAD_CRUMB = {
  [Path.main]: 'main',
  [Path.fundraiser]: '/ Fundraiser Details',
}