//import { authHeader } from '../_helpers';
import {
  ENDPOINT,
  SURVEY_TIME_CONSTANT,
  SURVEY_IDENTIFIER,
  SurveyType,
  SavedSurvey,
} from '../types/types'
import { SavedSurveysObject, Response } from '../types/types'
import { callEndpoint } from '../helpers/utility'
import * as _ from 'lodash'

export const SurveyService = {
  postToHealthData,
  getUserSurveys,
  postUserSurvey,
  saveSurvey,
}

const SURVEY_ENDPOINT = `/v4/users/self/reports/${SURVEY_IDENTIFIER}`

async function postToHealthData(surveyType: SurveyType, surveyData: any, token: string): Promise<any> {
  const postData = {
    appVersion: 'v1',
    createdOn: new Date().toISOString(),
    data: surveyData,
    metadata: {type: surveyType},
    phoneInfo: navigator.userAgent,
  }

  const result = await callEndpoint<object>(
    `${ENDPOINT}/v3/healthdata`,
    'POST',
    postData,
    token,
  )
  return result
}

async function postUserSurvey(
  data: SavedSurveysObject,
  token: string,
): Promise<any> {
  const postData = {
    dateTime: SURVEY_TIME_CONSTANT,
    data: data,
  }

  const result = await callEndpoint<object>(
    `${ENDPOINT}${SURVEY_ENDPOINT}`,
    'POST',
    postData,
    token,
  )
  return result
}

async function getUserSurveys(
  token: string,
): Promise<Response<{ items: { data: SavedSurveysObject }[] }>> {
  const getData = {
    startTime: SURVEY_TIME_CONSTANT,
    endTime: SURVEY_TIME_CONSTANT,
  }
  return await callEndpoint<{ items: { data: SavedSurveysObject }[] }>(
    `${ENDPOINT}${SURVEY_ENDPOINT}`,
    'GET',
    getData,
    token,
  )
}

async function saveSurvey(
  surveyType: SurveyType, surveyData: any, token: string, completedDate: Date) {

  const savedSurveysResponse = await getUserSurveys(
    token,
  )
  const savedData = _.first(savedSurveysResponse.data.items)
  // all surveys
  const savedSuveysData = savedData?.data

  const updatedSurvey: SavedSurvey = {
    type: surveyType,
    updatedDate: new Date(),
    completedDate: completedDate,
    data: surveyData,
  }

  let savedSurveys = _.cloneDeep(savedSuveysData)
  if (!savedSurveys?.surveys) {
    savedSurveys = {
      surveys: [updatedSurvey],
    }
  } else {
    const ourSurveyIndex: number | undefined = savedSurveys.surveys.findIndex(
      survey => survey.type === updatedSurvey.type,
    )
    if (ourSurveyIndex === -1) {
      savedSurveys.surveys.push(updatedSurvey)
    } else {
      savedSurveys.surveys[ourSurveyIndex] = updatedSurvey
    }
  }


    await SurveyService.postUserSurvey(savedSurveys, token)
  
return
}
