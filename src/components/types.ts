export const STUDY_ID = 'czi-coronavirus'
export const SUBPOP_GUID = 'czi-coronavirus'
export const SESSION_NAME = 'bridge-session-ny-strong'
export const ENDPOINT = 'https://webservices.sagebridge.org'
export const SHARE_SCOPE = 'sponsors_and_partners'
export const SURVEY_TIME_CONSTANT = '2020-04-25T00:14:04.322Z'
export const SURVEY_IDENTIFIER = 'ny-strong'

export type EmailSigninParams = {
  email: string
  token: string
}

export type IneligibilityReason =   'AGE' | 'CONSENT' | 'LOCATION' | 'NONE'

export interface StringDictionary {
    [key: string]: any
 } 

export type LoginType =  'PHONE' | 'EMAIL'
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

export interface LoggedInUserData extends UserData  {
    sessionToken: string
    consented: boolean
}

export interface RegistrationData extends UserData  {
    study: string
  
}

export interface Response<T> {
    status: number;
    ok: boolean;
    data: T
}

export type SignInData = {
    study: string
  }
 export  interface SignInDataPhone extends SignInData {
    phone: {
      number: string
      regionCode: string
    }
  }
  
 export interface SignInDataEmail extends SignInData {
    email: string
  }


