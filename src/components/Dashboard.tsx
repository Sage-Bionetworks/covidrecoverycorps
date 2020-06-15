import React, { useState, useEffect } from 'react'
import testTubeImg from '../assets/dashboard/icon_testtubes.svg'
import saveProgressIconImg from '../assets/dashboard/icon_savedprogress.svg'
import clockIconImg from '../assets/dashboard/icon_timer.svg'
import completeIconImg from '../assets/dashboard/icon_complete.svg'
import emptyIconImg from '../assets/dashboard/icon_empty.svg'
import iconThankYou from '../assets/dashboard/icon_thankyou.svg'
import iconWooHoo from '../assets/dashboard/icon_whoohoo.svg'
import { makeStyles } from '@material-ui/core/styles'

import { CircularProgress, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'

import { SurveyService } from '../services/survey.service'
import {
  SavedSurveysObject,
  SurveyType,
  SavedSurvey,
  ReportData,
  TestLocationEnum,
} from '../types/types'
import _ from 'lodash'
import { UserService } from '../services/user.service'
import Alert from '@material-ui/lab/Alert/Alert'
import TestLocationSurvey from './surveys/TestLocationSurvey'

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
    title: 'profile',
    description: 'Contact Information',
    time: '2',
    link: '/contactinfo',
  },
  {
    type: 'DEMOGRAPHIC',
    title: 'Survey 1',
    description: 'Tell us about yourself',
    time: '2',
    link: '/survey1',
  },
  {
    type: 'COVID_EXPERIENCE',
    title: 'Survey 2',
    description: 'Recent COVID Experience',
    time: '5',
    link: '/survey2',
  },
  {
    type: 'HISTORY',
    title: 'Survey 3',
    description: 'Medical History',
    time: '5-10',
    link: '/survey3',
  },
  {
    type: 'MORE',
    title: 'Survey 4',
    description: 'More COVID Experience',
    time: '5-10',
    link: '/survey4',
  },
]

type CompletionStatus = 'NOT_DONE' | 'MAIN_DONE' | 'ALL_DONE'

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const [error, setError] = useState()

  const [isLoading, setIsLoading] = useState(false)
  const [isContactInfoDone, setIsContactInfoDone] = useState(false)

  const [
    isTestLocationSurveySubmitted,
    setIsTestLocationSurveySubmitted,
  ] = useState<TestLocationEnum | undefined>(undefined)

  const classes = useStyles()

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfo = await UserService.getUserInfo(token)
          setIsContactInfoDone(!!userInfo.data.attributes?.gender)
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
  }, [token, isTestLocationSurveySubmitted])

  /* POSSIBLE SCENARIOS:
- minimum surveys not completed
- minimum surveys completed 
  - test location not completed -- > show test location question
  - test location completed 
- all suverys completed
*/

  const getSavedSurvey = (surveyType: SurveyType): SavedSurvey | undefined => {
    if (!savedSurveys) {
      return undefined
    }
    return savedSurveys.surveys.find(
      savedSurvey => surveyType === savedSurvey.type,
    )
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
      return isContactInfoDone ? (
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
        return isContactInfoDone
      } else {
        return isDone(surveyType) || !isContactInfoDone
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

  const getCompletionStatus = (): CompletionStatus => {
    if (!savedSurveys) {
      return 'NOT_DONE'
    }
    const completedSurveyNames = (savedSurveys.surveys || [])
      .filter(survey => survey && survey.completedDate)
      .map(survey => survey?.type)

    const doneMain =
      isContactInfoDone &&
      completedSurveyNames.includes('DEMOGRAPHIC') &&
      completedSurveyNames.includes('COVID_EXPERIENCE')
    const doneAll =
      doneMain &&
      completedSurveyNames.includes('HISTORY') &&
      completedSurveyNames.includes('MORE')

    if (doneAll) {
      return 'ALL_DONE'
    } else {
      return doneMain ? 'MAIN_DONE' : 'NOT_DONE'
    }
  }
  const getIntro = (): JSX.Element => {
    const doneMainEl = (
      <>
        <img src={iconWooHoo} alt="woo hoo!"></img>
        <h2>Whoo hoo!</h2>
        {(isTestLocationSurveySubmitted === TestLocationEnum.LAB ||
          isTestLocationSurveySubmitted === TestLocationEnum.HOME) && (
          <p>
            We’ve added you to the waiting list for an antibody test. If you are
            selected, you will receive an email.
          </p>
        )}
        <p>
          {' '}
          Please consider completing the rest of the surveys if you have time.
        </p>
      </>
    )

    const doneMainNoLocationSurveyEl = (
      <>
        <img src={iconWooHoo} alt="woo hoo!"></img>
        <h2>Whoo hoo!</h2>
        <p>
          You’ve completed the minimum surveys to qualify for an antibody test!
        </p>
        <p>
          {' '}
          Although we cannot guarantee testing for everyone, we will do our best
          to accomodate based on availability.
        </p>
      </>
    )

    const doneAllEl = (
      <>
        <img src={iconThankYou} alt="thank you!"></img>
        <h2>
          Thank you for your contribution to the COVID Recovery Corps Study!
        </h2>{' '}
      </>
    )
    const completionStatus = getCompletionStatus()
    if (completionStatus === 'NOT_DONE') {
      return <></>
    }

    if (completionStatus === 'MAIN_DONE') {
      return (
        <div className="finished-status text-center">
          {isDone('TEST_LOCATION') ? doneMainEl : doneMainNoLocationSurveyEl}
        </div>
      )
    }

    return <div className="finished-status text-center">{doneAllEl}</div>
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="primary" />
      </div>
    )
  }
  return (
    <div className="Dashboard">
      {getCompletionStatus() === 'NOT_DONE' && (
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
        {error && <Alert severity="error">{error}</Alert>}

        {getIntro()}
        {
          //if they fininshed main surveys and didn't pick location
          !isDone('TEST_LOCATION') && getCompletionStatus() !== 'NOT_DONE' && (
            <div
              className="finished-status"
              style={{ marginBottom: '2.4rem', clear: 'both' }}
            >
              <p>
                <strong>
                  Would you prefer to go to a lab draw or wait until home test
                  kits are available?{' '}
                </strong>
              </p>
              <TestLocationSurvey
                surveyUpdatedCallbackFn={(location: TestLocationEnum) =>
                  setIsTestLocationSurveySubmitted(location)
                }
                token={token}
              ></TestLocationSurvey>{' '}
            </div>
          )
        }
        {(isDone('TEST_LOCATION') || getCompletionStatus() == 'NOT_DONE') && (
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
