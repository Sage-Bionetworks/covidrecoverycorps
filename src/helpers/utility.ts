import {
  Response,
  Phone,
  SignInData,
  LoggedInUserData,
  SignInDataEmail,
  SignInDataPhone,
  STUDY_ID,
  LoginType,
  StringDictionary,
  SESSION_NAME,
} from '../types/types'

import moment from 'moment'

export const callEndpoint = async <T>(
  endpoint: string,
  method: 'POST' | 'GET' = 'POST',
  data: StringDictionary,
  token?: string
): Promise<Response<T>> => {
  const headers: HeadersInit = new Headers()


  headers.set('Content-Type', 'application/json')
  if (token) {
    headers.set('Bridge-Session', token)
  }

  const config = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers,
    body: JSON.stringify(data),
  }

  if (method === 'GET') {
    const queryString = Object.keys(data)
      .map((key) => key + '=' + data[key])
      .join('&')
    endpoint = queryString ? `${endpoint}?${queryString}` : endpoint
    delete config.body
  }

  const response = await fetch(endpoint, config)

  const result = await response.json()
  if (!response.ok && response.status !== 412) {
   //alert(JSON.stringify(result, null, 2))
    throw(result)
  }
  return { status: response.status, data: result, ok: response.ok }
}

export const makePhone = (phone: string): Phone => {
  const number = phone?.includes('+1') ? phone : `+1${phone}`
  return {
    number: number,
    regionCode: 'US',
  }
}

export const getMomentDate = (
  year: string,
  monthStart1: string,
  day: string
): moment.Moment | undefined => {
  let date = [Number(year), Number(monthStart1) - 1, Number(day)]
  const anyNaN = date.find((item) => isNaN(item))
  if (anyNaN) {
    return undefined
  }

  return moment(date)
}

export const getAge = (
  year: string,
  monthStart1: string,
  day: string
): number => {
  const birthday = getMomentDate(year, monthStart1, day)
  const age = moment().diff(birthday, 'years')
  return age
}

export const getSession = ():{token: string, name: string, consented: boolean} | undefined => {
  const item =  sessionStorage.getItem(SESSION_NAME) || ''
  try {
    const json = JSON.parse(item)
    return json
  } catch {
    return undefined
  }
}



export const setSession = (token: string, name: string, consented: boolean) => {
  const data = {
    token,
    name,
    consented,
  }
  sessionStorage.setItem(SESSION_NAME, JSON.stringify(data))
}

export const sendSignInRequest = async (
  loginType: LoginType,
  phoneOrEmail: string,
  endpoint: string
): Promise<any> => {
  let postData: SignInData
  // setLoginType(_loginType)
  if (loginType === 'PHONE') {
    postData = {
      study: STUDY_ID,
      phone: makePhone(phoneOrEmail),
    } as SignInDataPhone
  } else {
    postData = {
      study: STUDY_ID,
      email: phoneOrEmail,
    } as SignInDataEmail
  }

  try {
    return callEndpoint<LoggedInUserData>(endpoint, 'POST', postData)
  } catch (e) {
  
    console.log(e)

    throw e
  }
}
