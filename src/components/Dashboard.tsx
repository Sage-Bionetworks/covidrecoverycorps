import React, { useState, useEffect } from 'react'
import testTubeImg from '../assets/icon_testtube.svg'
import saveProgressIconImg from '../assets/icon_savedprogress.svg'
import pencilImg from '../assets/icon_pencil.svg'
import { makeStyles } from '@material-ui/core/styles'

import {
  faCircle,
  faClock,
  faCheckCircle,
  faDotCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'
import { SurveyService } from '../services/survey.service'
import { SavedSurveysObject, SurveyType, SavedSurvey } from '../types/types'
import _ from 'lodash'
import PatientCorpsInfo from './PatientCorpsInfo'

type DashboardProps = {
  token: string
}
type UISurvey = {
  type: SurveyType
  title: string
  link: string
  description: string
  time: number
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
  },
})

const surveys: UISurvey[] = [
  {
    type: 'CONTACT',
    title: 'Contact Information',
    description: 'Contact',
    time: 2,
    link: '/contactinfo',
  },
  {
    type: 'DEMOGRAPHIC',
    title: 'Survey 1',
    description: 'Tell us about yourself',
    time: 2,
    link: '/survey1',
  },
  {
    type: 'COVID_EXPERIENCE',
    title: 'Survey 2',
    description: 'Recent COVID-19 Experience',
    time: 5,
    link: '/survey2',
  },
  {
    type: 'HISTORY',
    title: 'Survey 3',
    description: 'Medical History',
    time: 15,
    link: '/survey3',
  },
  {
    type: 'MORE',
    title: 'Survey 4',
    description: 'More COVID-19 Experience',
    time: 15,
    link: '/survey4',
  },
]

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const urlParams = new URLSearchParams(window.location.search)
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const [isFromConsent, setIsFromConsent] = useState(
    //get url param
    urlParams.get('consented')
  )

  const classes = useStyles()

  useEffect(() => {
    const getSurveys = async () => {
      try {
        const response = await SurveyService.getUserSurveys(token)
        setSavedSurveys(_.first(response.data.items)?.data)
      } catch (e) {
        alert(e)
      }
    }
    if (token) {
      getSurveys()
    }
  }, [token])

  const renderSurveyItems = (savedSurveys: SavedSurvey[], isTier1: boolean) => {
    const getSavedSurvey = (survey: UISurvey): SavedSurvey | undefined => {
      return savedSurveys.find(
        (savedSurvey) => survey.type === savedSurvey.type
      )
    }
    const isDone = (survey: UISurvey): boolean => {
      const savedSurvey = getSavedSurvey(survey)
      return !!savedSurvey?.completedDate
    }
    const isInProgress = (survey: UISurvey): boolean => {
      const savedSurvey = getSavedSurvey(survey)
      const progress = <img src={testTubeImg}></img>
      return !!savedSurvey?.updatedDate && !isDone(survey)
    }

    const getIcon = (survey: UISurvey): JSX.Element => {
      const iconDef = isDone(survey) ? faCheckCircle : faCircle
      const notProgress = <FontAwesomeIcon icon={iconDef} />
      return notProgress
    }

    const getIconImage = (survey: UISurvey): JSX.Element => {
      if (survey.type === 'CONTACT') {
        return <img src={pencilImg}></img>
      }
      return isInProgress(survey) ? (
        <img src={saveProgressIconImg}></img>
      ) : (
        getIcon(survey)
      )
    }

    const renderSurveyInfo = (
      survey: UISurvey,
      isTier1: boolean
    ): JSX.Element => {
      const innerElement = (
        <>
          <div className="graphics">
            <div className="circle">{getIconImage(survey)}</div>
            {isTier1 && <div className="rect"></div>}
          </div>
          <div>
            <strong>{survey.title}</strong>
            <br />
            {survey.description}
          </div>
          <div className="time">
            <FontAwesomeIcon icon={faClock} />
            <span>{survey.time}&nbsp;min</span>
          </div>
        </>
      )

      if (isDone(survey)) {
        return <div className="btn-container done">{innerElement}</div>
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
      <li className="item-wrap" key={survey.title}>
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
          To be invited for a lab test, you will need to complete surveys 1-3. Surveys 4 and 5 are optional but still provide us this with important information. Please consider completing them if you have the time.
        </p>
      </div>

      <Card className={classes.root}>
     
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
