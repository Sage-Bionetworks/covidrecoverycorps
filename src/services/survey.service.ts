//import { authHeader } from '../_helpers';
import {
  RegistrationData,
  ENDPOINT,
  STUDY_ID,
  SURVEY_TIME_CONSTANT,
  SURVEY_IDENTIFIER,
} from '../types/types'
import { SavedSurveysObject, Response } from '../types/types'
import { callEndpoint } from '../helpers/utility'


export const SurveyService = {
  postToHealthData,
  getUserSurveys,
  postUserSurvey,
}

const SURVEY_ENDPOINT = `/v4/users/self/reports/${SURVEY_IDENTIFIER}`

async function postToHealthData(surveyData: any, token: string): Promise<any> {
  const postData = {
    appVersion: 'v1',
    createdOn: new Date().toISOString(),
    data: surveyData,
    metadata: {},
    phoneInfo: navigator.userAgent,
  }

  const result = await callEndpoint<object>(
    `${ENDPOINT}/v3/healthdata`,
    'POST',
    postData,
    token
  )
  alert(JSON.stringify(result, null, 2))
  return result
}

async function postUserSurvey(data: any, token: string): Promise<any> {
  const postData = {
    dateTime: SURVEY_TIME_CONSTANT,
    data: data,
  }

  const result = await callEndpoint<object>(
    `${ENDPOINT}${SURVEY_ENDPOINT}`,
    'POST',
    postData,
    token
  )
  return result
}

async function getUserSurveys(token: string): Promise<Response<SavedSurveysObject>> {
  const getData = {
    startTime: SURVEY_TIME_CONSTANT,
    endTime: SURVEY_TIME_CONSTANT,
  }
  return await callEndpoint<SavedSurveysObject>(
    `${ENDPOINT}${SURVEY_ENDPOINT}`,
    'GET',
    getData,
    token
  )
}
