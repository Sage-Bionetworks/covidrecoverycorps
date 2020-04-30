export const STUDY_ID = 'czi-coronavirus'
export const SUBPOP_GUID = 'czi-coronavirus'
export const SESSION_NAME = 'bridge-session-ny-strong'
export const ENDPOINT = 'https://webservices.sagebridge.org'
export const SHARE_SCOPE = 'sponsors_and_partners'
export const SURVEY_TIME_CONSTANT = '2020-04-26T00:14:04.322Z'
export const SURVEY_IDENTIFIER = 'ny-strong'



export const ZIPCODES = ['10001', '10002' , '10003' , '10004' , '10005' , '10006' , '10007' , '10008' , '10009' , '10010' , '10011' , '10012' , '10013' , '10014' , '10016' , '10017' , '10018' , '10019' , '10020' , '10021' , '10022' , '10023' , '10024' , '10025' , '10026' , '10027' , '10028' , '10029' , '10030' , '10031' , '10032' , '10033' , '10034' , '10035' , '10036' , '10037' , '10038' , '10039' , '10040' , '10041' , '10043' , '10044' , '10045' , '10055' , '10060' , '10065' , '10069' , '10075' , '10080' , '10081' , '10087' , '10090' , '10101' , '10102' , '10103' , '10104' , '10105' , '10106' , '10107' , '10108' , '10109' , '10110' , '10111' , '10112' , '10113' , '10114' , '10115' , '10116' , '10117' , '10118' , '10119' , '10120' , '10121' , '10122' , '10123' , '10124' , '10125' , '10126' , '10128' , '10129' , '10130' , '10131' , '10132' , '10133' , '10138' , '10150' , '10151' , '10152' , '10153' , '10154' , '10155' , '10156' , '10157' , '10158' , '10159' , '10160' , '10161' , '10162' , '10163' , '10164' , '10165' , '10166' , '10167' , '10168' , '10169' , '10170' , '10171' , '10172' , '10173' , '10174' , '10175' , '10176' , '10177' , '10178' , '10179' , '10185' , '10199' , '10203' , '10211' , '10212' , '10213' , '10242' , '10249' , '10256' , '10258' , '10259' , '10260' , '10261' , '10265' , '10268' , '10269' , '10270' , '10271' , '10272' , '10273' , '10274' , '10275' , '10276' , '10277' , '10278' , '10279' , '10280' , '10281' , '10282' , '10285' , '10286']


export type EmailSigninParams = {
  email: string
  token: string
}

export type IneligibilityReason = 'AGE' | 'CONSENT' | 'LOCATION' | 'COVID'|'NONE'

export interface StringDictionary {
  [key: string]: any
}

export type LoginType = 'PHONE' | 'EMAIL'
export type Phone = {
  number: string
  regionCode: string
}

export interface UserData {
  username?: string
  firstName: string
  lastName: string
  email?: string
  phone?: Phone
  clientData: object
}

export interface LoggedInUserData extends UserData {
  sessionToken: string
  consented: boolean
}

export interface RegistrationData extends UserData {
  study: string
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
export type SurveyType = 'DEMOGRAPHIC' | 'COVID_EXPERIENCE' | 'HISTORY' | 'MORE'

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
