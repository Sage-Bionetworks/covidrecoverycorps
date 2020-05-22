import { EmailFormFields } from 'react-mailchimp-subscribe'

export const STUDY_ID = 'czi-coronavirus'

export const SESSION_NAME = 'bridge-session-ny-strong'
export const ENDPOINT = 'https://webservices.sagebridge.org'

export const SURVEY_TIME_CONSTANT = '2020-05-07T00:14:04.322Z'
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
  | 'AGE'
  | 'CONSENT'
  | 'LOCATION'
  | 'COVID'
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
  study: string
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
  study: string
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

export type SurveyConfigObject = {
  [key in SurveyType]: {
    formSchema: any
    uiSchema: any
    navSchema: any
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
