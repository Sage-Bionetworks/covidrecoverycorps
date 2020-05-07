import {
  ENDPOINT,
  LoggedInUserData,
  Response,
  UserAttributes,
} from '../types/types'

import { callEndpoint } from '../helpers/utility'
import { result } from 'lodash-es'

const SUBPOP_GUID = 'czi-coronavirus'

export const UserService = {
  getUserInfo,
  updateUserAttributes,
}

async function getUserInfo(token: string): Promise<Response<LoggedInUserData>> {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'GET',
    {},
    token
  )
  return result
}

async function updateUserAttributes(
  token: string,
  attributes: UserAttributes
): Promise<Response<LoggedInUserData>> {
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    {
      attributes,
    },
    token
  )
  return result
}
