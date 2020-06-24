import React, { useState, useEffect } from 'react'
import testTubeImg from '../../assets/dashboard/icon_testtubes.svg'
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
  ReportData,
  TestLocationEnum,
  SurveysCompletionStatusEnum,
  LoggedInUserData,
} from '../../types/types'
import _ from 'lodash'
import { UserService } from '../../services/user.service'
import Alert from '@material-ui/lab/Alert/Alert'
import Intro from './Intro'
import TestLocationSurvey from '../surveys/TestLocationSurvey'
import i18next from 'i18next'

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
    description:i18next.t('dashboard.text4'),
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

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<LoggedInUserData | undefined>(
    undefined,
  )

  const [
    testLocationSurveySubmitted,
    setTestLocationSurveySubmitted,
  ] = useState<TestLocationEnum | undefined>(undefined)

  const classes = useStyles()

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfo = await UserService.getUserInfo(token)
          setUserInfo(userInfo.data)
          const response = await SurveyService.getUserSurveys(token)
          setSavedSurveys(_.first(response.data.items)?.data)
        } catch (e) {
          setError(e)
        } finally {
          setIsLoading(false)
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

  const isScheduledForTest = (): boolean => {
    if (!userInfo) {
      return false
    } else {
      return userInfo?.dataGroups.indexOf('tests_requested') > -1
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
    return getSavedSurvey('TEST_LOCATION')?.data.location
  }

  const isDone = (surveyType: SurveyType): boolean => {
    const savedSurvey = getSavedSurvey(surveyType)
    return !!savedSurvey?.completedDate
  }
  const isInProgress = (surveyType: SurveyType): boolean => {
    const savedSurvey = getSavedSurvey(surveyType)

    return !!savedSurvey?.updatedDate && !isDone(surveyType)
  }

  const renderSurveyItems = (savedSurveys: SavedSurvey[], isTier1: boolean) => {
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

    const renderSurveyInfo = (
      survey: UISurvey,
      isTier1: boolean,
    ): JSX.Element => {
      const innerElement = (
        <>
          <div className="graphics">
            <div className="circle">{getIconImage(survey)}</div>
            {isTier1 && <div className="rect"></div>}
          </div>
          <div>
            <div className="title">{survey.title}</div>

            <div className="description">{survey.description}</div>
          </div>

          <div className="time">
            <img src={clockIconImg}></img>
            <span>{survey.time}&nbsp;min</span>
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

    const _surveys = isTier1 ? surveys.slice(0, 3) : surveys.slice(3)

    const items = _surveys.map((survey: UISurvey, index) => (
      <li className={getClassNameForSurveyItem(survey.type)} key={survey.title}>
        <div className="item">{renderSurveyInfo(survey, isTier1)}</div>
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

    const doneMain =
      isContactInfoDone() &&
      completedSurveyNames.includes('DEMOGRAPHIC') &&
      completedSurveyNames.includes('COVID_EXPERIENCE')
    const doneAll =
      doneMain &&
      completedSurveyNames.includes('HISTORY') &&
      completedSurveyNames.includes('MORE')

    if (doneAll) {
      return SurveysCompletionStatusEnum.ALL_DONE
    } else {
      return doneMain
        ? SurveysCompletionStatusEnum.MAIN_DONE
        : SurveysCompletionStatusEnum.NOT_DONE
    }
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="primary" />
      </div>
    )
  }
  if (error !== undefined) {
    return <Alert severity="error">{error!['message'] || error}</Alert>
  }

  return (
    <div className="Dashboard">
      {getCompletionStatus() === SurveysCompletionStatusEnum.NOT_DONE && (
        <div className="dashboard-intro">
          <p>
            The information you provide will help researchers learn more about
            COVID-19.
          </p>
          <p>
            {' '}
            To be invited for a lab test, you will need to complete your Profile
            and Surveys 1-2. Surveys 3 and 4 are optional but still provide
            important information. Please consider completing them if you have
            the time.{' '}
          </p>
        </div>
      )}
      <Card className={classes.root}>
        <Intro
          testLocation={
            testLocationSurveySubmitted || getPreferredTestLocation()
          }
          completionStatus={getCompletionStatus()}
          isScheduledForTest={isScheduledForTest()}
          isTestLocationSurveyDone={isDone('TEST_LOCATION')}
        />
        {
          //if they fininshed main surveys and didn't pick location
          !isDone('TEST_LOCATION') &&
            getCompletionStatus() !== SurveysCompletionStatusEnum.NOT_DONE && (
              <TestLocationSurvey
                surveyUpdatedCallbackFn={(location: TestLocationEnum) =>
                  setTestLocationSurveySubmitted(location)
                }
                token={token}
              ></TestLocationSurvey>
            )
        }
        {(isDone('TEST_LOCATION') ||
          getCompletionStatus() === SurveysCompletionStatusEnum.NOT_DONE) && (
          <>
            <div>{renderSurveyItems(savedSurveys?.surveys || [], true)}</div>
            <div className="separator">
              <img src={testTubeImg}></img>
              <div className="small">
                {' '}
                Minimum surveys required for lab invites{' '}
              </div>
            </div>
            <div>{renderSurveyItems(savedSurveys?.surveys || [], false)}</div>
          </>
        )}
      </Card>
    </div>
  )
}

export default Dashboard
