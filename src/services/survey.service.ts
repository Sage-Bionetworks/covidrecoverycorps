//import { authHeader } from '../_helpers';
import * as _ from 'lodash'
import { callEndpoint } from '../helpers/utility'
import {
  ENDPOINT,
  LoggedInUserData,
  Response,
  SavedSurvey,
  SavedSurveysObject,
  SurveysCompletionStatusEnum,
  SurveyType,
  SURVEY_IDENTIFIER,
  SURVEY_TIME_CONSTANT
} from '../types/types'

export const SurveyService = {
  postToHealthData,
  getUserSurveys,
  postUserSurvey,
  saveSurvey,
  completeSaveAndPostSurvey,
  getLatestMonthlySurvey,
  getCompletionStatus,
  isContactInfoDone,
  isInitialSurveysCompleted
}

const SURVEY_ENDPOINT = `/v4/users/self/reports/${SURVEY_IDENTIFIER}`

// save survey
async function postToHealthData(
  surveyType: SurveyType,
  surveyData: any,
  token: string,
): Promise<any> {
  const postData = {
    appVersion: 'v1',
    createdOn: new Date().toISOString(),
    data: surveyData,
    metadata: { type: surveyType },
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

// save report
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

// get reports
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

//
async function saveSurvey(
  surveyType: SurveyType,
  surveyData: any,
  token: string,
  completedDate: Date,
) {
  const savedSurveysResponse = await getUserSurveys(token)
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

async function completeSaveAndPostSurvey(
  name: SurveyType,
  data: any,
  token: string,
): Promise<any> {
  try {
    await SurveyService.postToHealthData(name, data, token)
    await SurveyService.saveSurvey(name, data, token, new Date())
    return
  } catch (e) {
    throw e
  }
}

async function getLatestMonthlySurvey(
  token: string,
): Promise<{ survey?: SavedSurvey; isCompleted: boolean }> {
  const postLabSurveyType = 'POST_LAB_MONTHLY'
  const surveys = await SurveyService.getUserSurveys(token)
  const savedSurveys: SavedSurveysObject | undefined = _.first(
    surveys.data.items,
  )?.data
  if (!savedSurveys) {
    return { isCompleted: false }
  }
  const savedSurvey = savedSurveys.surveys.find(
    savedSurvey => postLabSurveyType === savedSurvey.type,
  )

  return { survey: savedSurvey, isCompleted: !!savedSurvey?.completedDate }
}


function isContactInfoDone  (userInfo: LoggedInUserData | undefined): boolean  {
  if (!userInfo) {
    return false
  } else {
    return !!userInfo.attributes?.gender
  }
}

function getCompletionStatus(
  _savedSurveys: SavedSurveysObject | undefined,
  userInfo: LoggedInUserData | undefined,
): SurveysCompletionStatusEnum {
  if (!_savedSurveys) {
    return SurveysCompletionStatusEnum.NOT_DONE
  }

  const hasTakenTest = (savedSurveys: SavedSurveysObject): boolean => {
    if (!savedSurveys) {
      return false
    }
    const covidSurvey = savedSurveys.surveys.find(
      savedSurvey => 'COVID_EXPERIENCE' === savedSurvey.type,
    )

    if (!covidSurvey || !covidSurvey?.completedDate) {
      return false
    }
    const kind_of_testing = covidSurvey.data.symptoms2?.kind_of_testing
    return kind_of_testing.serum_test || kind_of_testing.nasal_swab
  }

  const completedSurveyNames = (_savedSurveys.surveys || [])
    .filter(survey => survey && survey.completedDate)
    .map(survey => survey?.type)

  const doneAll =
    isContactInfoDone(userInfo) &&
    completedSurveyNames.includes('DEMOGRAPHIC') &&
    completedSurveyNames.includes('COVID_EXPERIENCE') &&
    completedSurveyNames.includes('HISTORY') &&
    completedSurveyNames.includes('MORE') &&
    (completedSurveyNames.includes('RESULT_UPLOAD') || !hasTakenTest(_savedSurveys))

  if (doneAll) {
    return SurveysCompletionStatusEnum.ALL_DONE
  } else {
    return SurveysCompletionStatusEnum.NOT_DONE
  }
}

async function isInitialSurveysCompleted(token: string, userInfo: LoggedInUserData | undefined): Promise<boolean> {
  const response = await SurveyService.getUserSurveys(token)
  const savedSurvyes = _.first(response.data.items)?.data
  const status = getCompletionStatus(savedSurvyes, userInfo)
  return status === SurveysCompletionStatusEnum.ALL_DONE

}
