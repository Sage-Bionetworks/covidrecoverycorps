import { EmailFormFields } from 'react-mailchimp-subscribe'

export const APP_ID = 'czi-coronavirus'

export const SESSION_NAME = 'bridge-session-ny-strong'
export const ENDPOINT = 'https://webservices.sagebridge.org'

export const SURVEY_TIME_CONSTANT = '2020-05-08T00:14:04.322Z'
export const SURVEY_IDENTIFIER = 'ny-strong'

export interface MailChimpFormFields extends EmailFormFields {
  NAME: string
  ZIP: string
}

export type EmailSigninParams = {
  email: string
  token: string
}

export type IneligibilityReason =
  | 'LOCATION'
  | 'NONE'

export interface StringDictionary {
  [key: string]: any
}

export type LoginType = 'PHONE' | 'EMAIL'
export type Phone = {
  number: string
  regionCode: string
}

export type UserAttributes = {
  address: string
  city: string
  state: string
  zip_code: string
  dob: string
  gender: string
}
export interface UserData {
  username?: string
  firstName: string
  lastName: string
  email?: string
  phone?: Phone
  clientData: object
  attributes?: UserAttributes
}

export interface LoggedInUserData extends UserData {
  sessionToken: string
  consented: boolean
  sharingScope: string
  dataGroups: string[]
  id: string
}

export interface RegistrationData {
  appId: string
  substudyIds: string[]

  email?: string
  phone?: Phone
  clientData: object
  dataGroups?: string[]
}

export interface Response<T> {
  status: number
  ok: boolean
  data: T
}

export type SignInData = {
  appId: string
}
export interface SignInDataPhone extends SignInData {
  phone: {
    number: string
    regionCode: string
  }
}

export interface SignInDataEmail extends SignInData {
  email: string
}

// --------------Surveys
export type SurveyType =
  | 'CONTACT'
  | 'DEMOGRAPHIC'
  | 'COVID_EXPERIENCE'
  | 'HISTORY'
  | 'MORE'
  | 'WITHDRAW'
  | 'TEST_LOCATION'

export type SurveyConfigObject = {
  [key in SurveyType]: {
    formSchema: Function
    uiSchema: Function
    navSchema: Function
  }
}

export type SavedSurvey = {
  type: SurveyType
  data: any
  completedDate?: Date
  updatedDate?: Date
}

export type SavedSurveysObject = {
  surveys: SavedSurvey[]
}
export type ColumbiaAppointment = {
  start: string, // date/time when appointment will start
  status: string
}

export type ReportData = {
  localDate: string,
  date: string,
  data: ColumbiaAppointment
}
export type ReportDataList = {
  items: ReportData[]
}
