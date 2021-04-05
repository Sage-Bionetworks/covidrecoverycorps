//import { authHeader } from '../_helpers';
import * as _ from 'lodash'
import { callEndpoint } from '../helpers/utility'
import {
  ENDPOINT,
  LoggedInUserData,
  MONTHLY_SURVEY_IDENTIFIER,
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
  getUserMonthlySurveys,
  postUserSurvey,
  postMonthlyUserSurvey,
  saveSurvey,
  completeSaveAndPostSurvey,
  getLatestMonthlySurvey,
  getCompletionStatus,
  isContactInfoDone,
  isInitialSurveysCompleted,
}

const SURVEY_ENDPOINT = `/v4/users/self/reports/${SURVEY_IDENTIFIER}`
const MONTHLY_SURVEY_ENDPOINT = `/v4/users/self/reports/${MONTHLY_SURVEY_IDENTIFIER}`

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
  // we handle monthly reports differrent

  const hasMonthlySurveys = data.surveys.find(s => s.type.includes('_MONTHLY'))
  if (hasMonthlySurveys) {
    return postMonthlyUserSurvey(data, token)
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
  surveyName?: SurveyType,
): Promise<Response<{ items: { data: SavedSurveysObject }[] }>> {
  //different path for monthly surveys
  if (surveyName?.includes('_MONTHLY')) {
    return getUserMonthlySurveys(token)
  }

  const startDate = new Date(Date.parse(SURVEY_TIME_CONSTANT))
  const endDate = new Date(Date.parse(SURVEY_TIME_CONSTANT))
  startDate.setDate(startDate.getDate() - 1)
  endDate.setDate(endDate.getDate() + 1)
  const getData = {
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
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
  const savedSurveysResponse = await getUserSurveys(token, surveyType)
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
  const surveys = await SurveyService.getUserSurveys(token, postLabSurveyType)
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

function isContactInfoDone(userInfo: LoggedInUserData | undefined): boolean {
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
    (completedSurveyNames.includes('RESULT_UPLOAD') ||
      !hasTakenTest(_savedSurveys))

  if (doneAll) {
    return SurveysCompletionStatusEnum.ALL_DONE
  } else {
    return SurveysCompletionStatusEnum.NOT_DONE
  }
}

async function isInitialSurveysCompleted(
  token: string,
  userInfo: LoggedInUserData | undefined,
): Promise<boolean> {
  const response = await SurveyService.getUserSurveys(token)
  const savedSurvyes = _.first(response.data.items)?.data
  const status = getCompletionStatus(savedSurvyes, userInfo)
  return status === SurveysCompletionStatusEnum.ALL_DONE
}

/******** MONTHLY SURVEYS ***********/
// get reports
async function getUserMonthlySurveys(
  token: string,
): Promise<Response<{ items: { dateTime: Date, data: SavedSurveysObject }[] }>> {
  const today = new Date()
  const daysAgo30 = new Date()

  today.setDate(today.getDate() + 1)

  console.log('Today is: ' + today.toLocaleString())

  daysAgo30.setDate(daysAgo30.getDate() - 30)

  console.log('30 days ago: ' + daysAgo30.toLocaleString())

  console.log('<br>5 days ago was: ' + daysAgo30.toLocaleString())
  const getData = {
    startTime: daysAgo30.toISOString(),
    endTime: today.toISOString(),
  }
  const result =  await callEndpoint<{ items: { dateTime: Date, data: SavedSurveysObject }[] }>(
    `${ENDPOINT}${MONTHLY_SURVEY_ENDPOINT}`,
    'GET',
    getData,
    token,
  )

const sorted = _.orderBy(result.data.items, 'dateTime', 'desc')
  return result

}

async function postMonthlyUserSurvey(
  data: SavedSurveysObject,
  token: string,
): Promise<any> {

  //find surveys within 30 days
let surv = await (await getUserMonthlySurveys(token)).data.items
// list Of Dates
const dates: Date[] =   _.sortBy(surv.map(s=>s.dateTime), function(value) {return new Date(value);})
let updatedDate = _.last(dates) || (new Date()).toISOString()


  debugger
  const postData = {
    dateTime: updatedDate,
    data: data,
  }

  const result = await callEndpoint<object>(
    `${ENDPOINT}${MONTHLY_SURVEY_ENDPOINT}`,
    'POST',
    postData,
    token,
  )
  return result
}
