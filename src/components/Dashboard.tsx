import React, { useState, useEffect } from 'react'

import {
  faCircle,
  faClock,
  faCheckCircle,
  faDotCircle,
  IconDefinition,

} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { Typography } from '@material-ui/core'


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

const surveys: UISurvey[] = [
  {
    type: 'CONTACT',
    title: 'Survey1',
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
    description: 'Tell us about your recent COVID-19 Experience',
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

  const renderSurveyItems = (savedSurveys: SavedSurvey[]) => {
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
      return !!savedSurvey?.updatedDate && !isDone(survey)
    }

    const getIcon = (survey: UISurvey): IconDefinition => {
      const iconDef = isDone(survey) ? faCheckCircle : faCircle
      return isInProgress(survey) ? faDotCircle : iconDef
    }

    const renderSurveyInfo = (survey: UISurvey): JSX.Element => {
      const innerElement = (
        <div>
          <strong>{survey.title}</strong>
          <br />
          {survey.description}
        </div>
      )

      if (isDone(survey)) {
        return innerElement
      } else {
        return (
          <a className="btn btn-link" href={survey.link}>
            {innerElement}
          </a>
        )
      }
    }

    const items = surveys.map((survey: UISurvey) => (
      <li className="item-wrap" key={survey.title}>
        <div className="item">
          <FontAwesomeIcon icon={getIcon(survey)} />
          <div className="btn-container">
            {renderSurveyInfo(survey)}
            <div className="time">
              <FontAwesomeIcon icon={faClock} />
              <span>{survey.time}mins.</span>
            </div>
          </div>
        </div>
      </li>
    ))
    return <ul className="items">{items}</ul>
  }
  return (
    <div className="Dashboard">
      {isFromConsent &&
        <Typography variant="h2">Yay, the legal is done!</Typography>
      }
      <p>
        Our scientists could really use the information from Surveys 1 &amp; 2.
        &mdash; we need text about needing 1&amp;2 if they want to be invited.
        If you have the time, anything from 3 &amp; 4 would be phenomenal value
        to the research.
      </p>
      <div>{renderSurveyItems(savedSurveys?.surveys || [])}</div>
      <hr/>

    </div>
  )
}

export default Dashboard
