import {IOption} from "../components/common/Select/Select";

export enum SortDirectionEnum {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

export enum SortColEnum {
  ACTIVE_AT = 'ACTIVE_AT',
  GRADE = 'GRADE',
  MINUTES = 'MINUTES',
  BOOKS = 'BOOKS',
  DONATIONS = 'DONATIONS',
}

export enum SortTeamColsEnum {
  STUDENTS_COUNT = 'STUDENTS_COUNT',
  GRADE = 'GRADE',
  MINUTES = 'MINUTES',
  BOOKS = 'BOOKS',
  DONATIONS = 'DONATIONS',
}

export enum RegistrationTypeEnum {
  ANY = 'Any',
  MANAGED_PROFILE = 'Managed profile',
  SELF_REGiSTRATION = 'Self registration'
}

export const registrationType: Array<IOption> = [
  {
    value: RegistrationTypeEnum.ANY,
    label: 'Any',
  },
  {
    value: RegistrationTypeEnum.MANAGED_PROFILE,
    label: 'Managed profile',
  }, 
  {
    value: RegistrationTypeEnum.SELF_REGiSTRATION,
    label: 'Self registration',
  }
]

