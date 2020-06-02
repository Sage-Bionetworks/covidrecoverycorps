import React, { useState, useEffect } from 'react'
import testTubeImg from '../assets/dashboard/icon_testtubes.svg'
import saveProgressIconImg from '../assets/dashboard/icon_savedprogress.svg'
import pencilIconImg from '../assets/dashboard/icon_editingpencil.svg'
import clockIconImg from '../assets/dashboard/icon_timer.svg'
import completeIconImg from '../assets/dashboard/icon_complete.svg'
import emptyIconImg from '../assets/dashboard/icon_empty.svg'
import { makeStyles } from '@material-ui/core/styles'

import { Typography, CircularProgress } from '@material-ui/core'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'
import { SurveyService } from '../services/survey.service'
import { SavedSurveysObject, SurveyType, SavedSurvey } from '../types/types'
import _ from 'lodash'
import PatientCorpsInfo from './PatientCorpsInfo'
import { UserService } from '../services/user.service'
import Alert from '@material-ui/lab/Alert/Alert'

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

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const urlParams = new URLSearchParams(window.location.search)
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isContactInfoDone, setIsContactInfoDone] = useState(false)
  const [isFromConsent, setIsFromConsent] = useState(
    //get url param
    urlParams.get('consented'),
  )

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
  }, [token])

  const renderSurveyItems = (savedSurveys: SavedSurvey[], isTier1: boolean) => {
    const getSavedSurvey = (survey: UISurvey): SavedSurvey | undefined => {
      return savedSurveys.find(savedSurvey => survey.type === savedSurvey.type)
    }
    const isDone = (survey: UISurvey): boolean => {
      const savedSurvey = getSavedSurvey(survey)
      return !!savedSurvey?.completedDate
    }
    const isInProgress = (survey: UISurvey): boolean => {
      const savedSurvey = getSavedSurvey(survey)

      return !!savedSurvey?.updatedDate && !isDone(survey)
    }

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
      if (isInProgress(survey)) {
        return <img src={saveProgressIconImg}></img>
      } else {
        const image = isDone(survey) ? (
          <img src={completeIconImg} alt="done"></img>
        ) : (
          <img src={emptyIconImg} alt="to do"></img>
        )
        return image
      }
    }

    const isSurveyDisabled = (survey: UISurvey): boolean => {
      if (survey.type === 'CONTACT') {
        return isContactInfoDone
      } else {
        return isDone(survey) || !isContactInfoDone
      }
    }

    const getClassNameForSurveyItem = (survey: UISurvey): string => {
      return isSurveyDisabled(survey) ? 'item-wrap disabled' : 'item-wrap'
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

      if (isSurveyDisabled(survey)) {
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
      <li className={getClassNameForSurveyItem(survey)} key={survey.title}>
        <div className="item">{renderSurveyInfo(survey, isTier1)}</div>
      </li>
    ))
    return <ul className="items">{items}</ul>
  }
  return (
    <div className="Dashboard">
      <div className="dashboard-intro">
        {/* isFromConsent && (
          <Typography variant="h2">Yay, the legal is done!</Typography>
        )*/}

        <p>
          The information you provide will help researchers learn more about
          COVID-19.
        </p>
        <p>
          {' '}
          To be invited for a lab test, you will need to complete your Profile
          and Surveys 1-2. Surveys 3 and 4 are optional but still provide
          important information. Please consider completing them if you have the
          time.{' '}
        </p>
      </div>

      <Card className={classes.root}>
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading && (
          <div className="text-center">
            <CircularProgress color="primary" />
          </div>
        )}
        <div>{renderSurveyItems(savedSurveys?.surveys || [], true)}</div>
        <div className="separator">
          <img src={testTubeImg}></img>
          <div className="small">
            {' '}
            Minimum surveys required for lab invites{' '}
          </div>
        </div>
        <div>{renderSurveyItems(savedSurveys?.surveys || [], false)}</div>
      </Card>
    </div>
  )
}

export default Dashboard
