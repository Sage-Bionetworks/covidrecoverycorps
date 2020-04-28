import React, { useState, useEffect } from 'react'

import { faCircle, faClock } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useForm from './useForm'
import SurveyWrapper from './SurveyWrapper'

import { FormControlLabel , Switch, Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


type DashboardProps = {
  // token: string | null
}
type Survey = {
  title: string
  description: string
  time: number
}

const surveys = [
  {
    title: 'Survey 1',
    description: 'Tell us about yourself',
    time: 2,
    link: '/survey1'
  },
  {
    title: 'Survey 2',
    description: 'Tell us about your recent COVID-19 Experience',
    time: 5,
    link: '/survey2'
  },
  {
    title: 'Survey 3',
    description: 'Medical History',
    time: 15,
    link: '/survey3'
  },
  {
    title: 'Survey 4',
    description: 'More COVID-19 Experience',
    time: 15,
    link: '/survey4'
  },
]



export const Dashboard: React.FunctionComponent<DashboardProps> = ({}: //token,
DashboardProps) => {

 
  const renderSurveyItems = () => {
    const items = surveys.map(survey => (
      <li className="item-wrap">
        <div className="item">
          <FontAwesomeIcon icon={faCircle} />
          <div className="btn-container">
          <a className="btn btn-link" href={survey.link}>
            {' '}
            <strong>{survey.title}</strong>
            <br />
            {survey.description}
          </a>
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
   <Typography  variant="h2">Yay, the legal is done!</Typography>


<p>
      
        Our scientists could really use the information from Surveys 1 &amp; 2.
        &mdash; we need text about needing 1&amp;2 if they want to be invited. If you
        have the time, anything from 3 &amp; 4 would be phenomenal value to the
        research.
        </p>
      <div>{renderSurveyItems()}</div>

    </div>
  )
}

export default Dashboard
