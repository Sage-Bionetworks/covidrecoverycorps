import i18n from 'i18next'
import moment from 'moment'
import { callEndpoint } from '../helpers/utility'
import { ENDPOINT, LoggedInUserData, Response } from '../types/types'

const SHARE_SCOPE_PARTNERS = 'sponsors_and_partners'
const SHARE_SCOPE_ALL = 'all_qualified_researchers'
const SUBPOP_GUID = 'czi-coronavirus'
const SUBPOP_GUID_ES = 'p18ECVDwIcT1Els2YzNgSxrS'
const HIPAA_SUBPOP_GUID = 'g2mW_YdW70k9lJ4PZQboJD3n'
const HIPAA_SUBPOP_GUID_ES = 'QjoTt6O2bQZixHwQPZovdg3e'

export const ConsentService = {
  updateMySharingScope,
  signGeneralConsent,
  signEhrConsent,
  withdrawEhrConsent,
  withdrawFromStudy,
  SHARE_SCOPE_PARTNERS,
  SHARE_SCOPE_ALL,
}

const getSubpopGuid = (): string => {
  return i18n.language === 'es' ? SUBPOP_GUID_ES : SUBPOP_GUID
}

const getHIPAASubpopGuid = (): string => {
  return i18n.language === 'es' ? HIPAA_SUBPOP_GUID_ES : HIPAA_SUBPOP_GUID
}

async function updateMySharingScope(
  scope: string,
  token: string,
): Promise<Response<LoggedInUserData>> {
  const data = {
    sharingScope: scope,
  }

  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    data,
    token,
  )
  return result
}

async function updateMyLanguage(
  token: string,
): Promise<Response<LoggedInUserData>> {
  const data = {
    languages: [i18n.language],
  }
  const result = await callEndpoint<LoggedInUserData>(
    `${ENDPOINT}/v3/participants/self`,
    'POST',
    data,
    token,
  )
  return result
}

async function signGeneralConsent(
  name: string,
  scope: string,
  token: string,
): Promise<any> {
  const data = {
    name,
    scope,
    signedOn: moment().toLocaleString(),
  }
  const endpnt = `${ENDPOINT}/v3/subpopulations/${getSubpopGuid()}/consents/signature`
  try {
    const result = await callEndpoint(endpnt, 'POST', data, token)
    return result
  } catch (e) {
    //signing consent in wrong language. Change the prference
    if (e.statusCode === 404 && e.entityClass === 'Subpopulation') {
      const update = await updateMyLanguage(token)
      //try again
      const result = await callEndpoint(endpnt, 'POST', data, token)
      return result
    } else {
      throw e
    }
  }
}

async function signEhrConsent(
  name: string,
  scope: string,
  token: string,
): Promise<any> {
  const data = {
    name,

    scope,
    signedOn: moment().toLocaleString(),
  }

  const result = await callEndpoint(
    `${ENDPOINT}/v3/subpopulations/${getHIPAASubpopGuid()}/consents/signature`,
    'POST',
    data,
    token,
  )
  return result
}

async function withdrawEhrConsent(token: string): Promise<any> {
  const data = {
    // could add a reason
  }

  const result = await callEndpoint(
    `${ENDPOINT}/v3/subpopulations/${getHIPAASubpopGuid()}/consents/signature/withdraw`,
    'POST',
    data,
    token,
  )
  return result
}

async function withdrawFromStudy(userId: string, token: string): Promise<any> {
  const data = {
    // could add a reason
  }

  const result = await callEndpoint(
    `${ENDPOINT}/v3/consents/withdraw`,
    'POST',
    data,
    token,
  )
  return result
}
