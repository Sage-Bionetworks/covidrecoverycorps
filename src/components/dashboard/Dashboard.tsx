import React, { useState, useEffect, useContext } from 'react'

import saveProgressIconImg from '../../assets/dashboard/icon_savedprogress.svg'
import clockIconImg from '../../assets/dashboard/icon_timer.svg'
import completeIconImg from '../../assets/dashboard/icon_complete.svg'
import emptyIconImg from '../../assets/dashboard/icon_empty.svg'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { SurveyService } from '../../services/survey.service'
import {
  SavedSurveysObject,
  SurveyType,
  SavedSurvey,
  TestLocationEnum,
  SurveysCompletionStatusEnum,
  LoggedInUserData,
  ReportData,
} from '../../types/types'
import _ from 'lodash'
import { UserService } from '../../services/user.service'
import Alert from '@material-ui/lab/Alert/Alert'
import Intro from './Intro'
import TestLocationSurvey from '../surveys/TestLocationSurvey'
import i18next from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import * as FeatureToggle from '../../helpers/FeatureToggle'

type DashboardProps = {
  token: string
}
type UISurvey = {
  type: SurveyType
  title: string
  link: string
  description: string
  time: string
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
  },
})

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<LoggedInUserData | undefined>(
    undefined,
  )
  const [appt, setAppt] = useState<ReportData | undefined>(undefined)

  const [
    testLocationSurveySubmitted,
    setTestLocationSurveySubmitted,
  ] = useState<TestLocationEnum | undefined>(undefined)

  const classes = useStyles()
  const { t } = useTranslation()

  const featureFlags = useContext(FeatureToggle.FeaturesContext)
  const hasResultsUploadToggle = FeatureToggle.getToggleState(
    featureFlags,
    FeatureToggle.TOGGLE_NAMES.RESULTS_UPLOAD,
  )

  const surveys: UISurvey[] = [
    {
      type: 'CONTACT',
      title: i18next.t('dashboard.text1'),
      description: i18next.t('dashboard.text2'),
      time: '2',
      link: '/contactinfo',
    },
    {
      type: 'DEMOGRAPHIC',
      title: i18next.t('dashboard.text3'),
      description: i18next.t('dashboard.text4'),
      time: '2',
      link: '/survey1',
    },
    {
      type: 'COVID_EXPERIENCE',
      title: i18next.t('dashboard.text5'),
      description: i18next.t('dashboard.text6'),
      time: '5',
      link: '/survey2',
    },
    {
      type: 'RESULT_UPLOAD',
      title: i18next.t('dashboard.text61'),
      description: i18next.t('dashboard.text62'),
      time: '1-2',
      link: '/resultupload',
    },
    {
      type: 'HISTORY',
      title: i18next.t('dashboard.text7'),
      description: i18next.t('dashboard.text8'),
      time: '5-10',
      link: '/survey3',
    },
    {
      type: 'MORE',
      title: i18next.t('dashboard.text9'),
      description: i18next.t('dashboard.text10'),
      time: '5-10',
      link: '/survey4',
    },
  ]

  const hasInvitation = (userData?: LoggedInUserData): boolean =>
    !!userData && userData.dataGroups.indexOf('tests_requested') > -1

  const hasCancelledAppointment = (userData?: LoggedInUserData): boolean =>
    !!userData && userData.dataGroups.indexOf('tests_cancelled') > -1

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfoResponse = await UserService.getUserInfo(token)
          const response = await SurveyService.getUserSurveys(token)
          if (isSubscribed) {
            setUserInfo(_old => userInfoResponse.data)
            setSavedSurveys(_.first(response.data.items)?.data)
          }
        } catch (e) {
          isSubscribed && setError(e)
        } finally {
          isSubscribed && setIsLoading(false)
        }
      }
    }

    getInfo()

    return () => {
      isSubscribed = false
    }
  }, [token, testLocationSurveySubmitted])

  /* POSSIBLE SCENARIOS:
- minimum surveys not completed
- minimum surveys completed 
  - test location not completed -- > show test location question
  - test location completed 
- all suverys completed
*/

  const isContactInfoDone = (): boolean => {
    if (!userInfo) {
      return false
    } else {
      return !!userInfo.attributes?.gender
    }
  }

  const getSavedSurvey = (surveyType: SurveyType): SavedSurvey | undefined => {
    if (!savedSurveys) {
      return undefined
    }
    return savedSurveys.surveys.find(
      savedSurvey => surveyType === savedSurvey.type,
    )
  }

  const getPreferredTestLocation = (): TestLocationEnum | undefined => {
    const locationFromLocationSurvey = getSavedSurvey('TEST_LOCATION')?.data
      .location
    const locationFromCovidSurvey = _.get(
      getSavedSurvey('MORE'),
      'data.test_location.test_location',
    )
    return locationFromCovidSurvey || locationFromLocationSurvey
  }

  const isDone = (surveyType: SurveyType): boolean => {
    const savedSurvey = getSavedSurvey(surveyType)

    return !!savedSurvey?.completedDate
  }
  const isInProgress = (surveyType: SurveyType): boolean => {
    const savedSurvey = getSavedSurvey(surveyType)

    return !!savedSurvey?.updatedDate && !isDone(surveyType)
  }

  const renderSurveyItems = (savedSurveys: SavedSurvey[]) => {
    const getIconImageForContact = (): JSX.Element => {
      return isContactInfoDone() ? (
        <img src={completeIconImg} alt="done"></img>
      ) : (
        <img src={emptyIconImg} alt="to do"></img>
      )
    }

    const getIconImage = (survey: UISurvey): JSX.Element => {
      if (survey.type === 'CONTACT') {
        return getIconImageForContact()
      }
      if (isInProgress(survey.type)) {
        return <img src={saveProgressIconImg}></img>
      } else {
        const image = isDone(survey.type) ? (
          <img src={completeIconImg} alt="done"></img>
        ) : (
          <img src={emptyIconImg} alt="to do"></img>
        )
        return image
      }
    }

    const isSurveyDisabled = (surveyType: SurveyType): boolean => {
      if (surveyType === 'CONTACT') {
        return isContactInfoDone()
      } else {
        return isDone(surveyType) || !isContactInfoDone()
      }
    }

    const getClassNameForSurveyItem = (surveyType: SurveyType): string => {
      return isSurveyDisabled(surveyType) ? 'item-wrap disabled' : 'item-wrap'
    }

    const renderSurveyInfo = (survey: UISurvey): JSX.Element => {
      const innerElement = (
        <>
          <div className="graphics">
            <div className="circle">{getIconImage(survey)}</div>
          </div>
          <div>
            <div className="title">{survey.title}</div>

            <div className="description">{survey.description}</div>
          </div>

          <div className="time">
            <img src={clockIconImg}></img>
            <span>
              {survey.time}&nbsp;{i18next.t('dashboard.min')}
            </span>
          </div>
        </>
      )

      if (isSurveyDisabled(survey.type)) {
        return <div className="btn-container">{innerElement}</div>
      } else {
        return (
          <a className="btn-container" href={survey.link}>
            {innerElement}
          </a>
        )
      }
    }

    const hasTakenTest = (): boolean => {
      const covidSurvey = getSavedSurvey('COVID_EXPERIENCE')
      if (!covidSurvey || !covidSurvey?.completedDate) {
        return false
      }
      const kind_of_testing = covidSurvey.data.symptoms2?.kind_of_testing
      return kind_of_testing.serum_test || kind_of_testing.nasal_swab
    }

    // see if we need uploadResults Survey
    if (!hasResultsUploadToggle || !hasTakenTest()) {
      surveys.splice(3, 1)
    }

    const items = surveys.map((survey: UISurvey, index) => (
      <li className={getClassNameForSurveyItem(survey.type)} key={survey.title}>
        <div className="item">{renderSurveyInfo(survey)}</div>
      </li>
    ))
    return <ul className="items">{items}</ul>
  }

  const getCompletionStatus = (): SurveysCompletionStatusEnum => {
    if (!savedSurveys) {
      return SurveysCompletionStatusEnum.NOT_DONE
    }
    const completedSurveyNames = (savedSurveys.surveys || [])
      .filter(survey => survey && survey.completedDate)
      .map(survey => survey?.type)

    const doneAll =
      isContactInfoDone() &&
      completedSurveyNames.includes('DEMOGRAPHIC') &&
      completedSurveyNames.includes('COVID_EXPERIENCE') &&
      completedSurveyNames.includes('HISTORY') &&
      completedSurveyNames.includes('MORE') &&
      (completedSurveyNames.includes('RESULT_UPLOAD') ||
        !hasResultsUploadToggle)

    if (doneAll) {
      return SurveysCompletionStatusEnum.ALL_DONE
    } else {
      return SurveysCompletionStatusEnum.NOT_DONE
    }
  }

  if ((isLoading || !userInfo) && !error) {
    return (
      <div className="text-center">
        <CircularProgress color="primary" />
      </div>
    )
  } else {
    if (error !== undefined) {
      return <Alert severity="error">{error!['message'] || error}</Alert>
    }

    return (
      <div className="Dashboard">
        {getCompletionStatus() === SurveysCompletionStatusEnum.NOT_DONE && (
          <div className="dashboard-intro">
            <Trans i18nKey="dashboard.intro1">
              <h2>[translate]</h2>
              <p>[translate]</p>
              <p>[translate]</p>
              <p>[translate]</p>
            </Trans>
          </div>
        )}

        <Card className={classes.root}>
          <Intro
            testLocation={
              testLocationSurveySubmitted || getPreferredTestLocation()
            }
            isInvitedForTest={hasInvitation(userInfo)}
            completionStatus={getCompletionStatus()}
            hasCancelledAppointment={hasCancelledAppointment(userInfo)}
            emailAddress={userInfo?.email || ''}
          />

          {
            //if they fininshed  surveys and didn't pick location
            !getPreferredTestLocation() &&
              getCompletionStatus() ===
                SurveysCompletionStatusEnum.ALL_DONE && (
                <TestLocationSurvey
                  surveyUpdatedCallbackFn={(location: TestLocationEnum) =>
                    setTestLocationSurveySubmitted(location)
                  }
                  token={token}
                ></TestLocationSurvey>
              )
          }
          {getCompletionStatus() === SurveysCompletionStatusEnum.NOT_DONE && (
            <div>{renderSurveyItems(savedSurveys?.surveys || [])}</div>
          )}
        </Card>
      </div>
    )
  }
}

export default Dashboard
