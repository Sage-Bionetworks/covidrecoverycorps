import { EmailFormFields } from 'react-mailchimp-subscribe'

export const APP_ID = 'czi-coronavirus'

export const SESSION_NAME = 'bridge-session-ny-strong'
export const ENDPOINT = 'https://webservices.sagebridge.org'

export const SURVEY_TIME_CONSTANT = '2020-06-15T00:14:04.322Z'
export const SURVEY_IDENTIFIER = 'ny-strong'

export interface MailChimpFormFields extends EmailFormFields {
  NAME: string
  ZIP: string
}

export type EmailSigninParams = {
  email: string
  token: string
  password?: string
}

export type IneligibilityReason = 'LOCATION' | 'NONE'

export interface StringDictionary {
  [key: string]: any
}

export type LoginType = 'PHONE' | 'EMAIL'
export type Phone = {
  number: string
  regionCode: string
}

export type UserAttributes = {
  address1: string
  address2?: string
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

export type UserDataGroup =
  | 'enrolled'
  | 'declined'
  | 'selected'
  | 'tests_requested'
  | 'tests_scheduled'
  | 'tests_cancelled'
  | 'tests_collected'
  | 'tests_available'
  | 'tests_notified'
  | 'hipaa_consented'
  | 'test_user'

export interface LoggedInUserData extends UserData {
  sessionToken: string
  consented: boolean
  sharingScope: string
  dataGroups: UserDataGroup[]
  id: string
}

export interface RegistrationData {
  appId: string
  substudyIds: string[]

  email?: string
  phone?: Phone
  clientData: object
  dataGroups?: UserDataGroup[]
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
export type SurveyPrelabType = 'CONTACT'
| 'DEMOGRAPHIC'
| 'COVID_EXPERIENCE'
| 'HISTORY'
| 'MORE'
| 'WITHDRAW'
| 'TEST_LOCATION'
| 'RESULT_UPLOAD'
export type SurveyPostLabType = 'POST_LAB'
export type SurveyType =SurveyPrelabType | SurveyPostLabType

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

export type GeocodedColumbiaAppointmentAddress = {
  location: { lat: number; lng: number }
}

export type ColumbiaAppointmentAddress = {
  city: string
  line: string[]
  postalCode: string
  state: string
}

export type AppointmentParticipant = {
  actor: {
    reference: string
    display: string
    address?: ColumbiaAppointmentAddress
    geocoding?: GeocodedColumbiaAppointmentAddress
  }
  required: string
  status: string
}
export type ColumbiaAppointment = {
  start: string // date/time when appointment will start
  status: string
  participant?: AppointmentParticipant[]
  patient?: AppointmentParticipant['actor']
  location?: AppointmentParticipant['actor']
}

export type ReportData = {
  localDate: string
  date: string
  data: ColumbiaAppointment
}
export type ReportDataList = {
  items: ReportData[]
}

export type SessionData = {
  token: string | undefined
  name?: string
  consented?: boolean
  alert?: string
  userDataGroup: UserDataGroup[]
}

export enum TestLocationEnum {
  'HOME' = 'home',
  'LAB' = 'lab',
  'NO_TEST' = 'noTest',
  'N/A' = 'N/A'
}

export enum SurveysCompletionStatusEnum {
  'NOT_DONE',
  'ALL_DONE',
}

export type TestResultString = 'NEGATIVE' | 'POSITIVE' | 'INDETERMINATE'

export type TestResult = {
  data: {
    status: string
    effectiveDateTime: string
    valueString: TestResultString
    valueRange: {
      extension: any[]
    }
    performer: any[]
    comment: string
    subject: any
    issued: string

    contained: any[]
  }
}
