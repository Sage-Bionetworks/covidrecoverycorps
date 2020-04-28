import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { ToggleButton, FormControl, FormGroup } from 'react-bootstrap'
import { faCircle, faClock } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useForm from './useForm'
import SurveyWrapper from './SurveyWrapper'

import { FormControlLabel , Switch} from '@material-ui/core'
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
  },
  {
    title: 'Survey 2',
    description: 'Tell us about your recent COVID-19 Experience',
    time: 5,
  },
  {
    title: 'Survey 3',
    description: 'Medical History',
    time: 15,
  },
  {
    title: 'Survey 4',
    description: 'More COVID-19 Experience',
    time: 15,
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
          <button className="btn btn-link">
            {' '}
            <strong>{survey.title}</strong>
            <br />
            {survey.description}
          </button>
          <div className="time">
          <FontAwesomeIcon icon={faClock} /><br/>
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
   

<FormGroup>
  <FormControlLabel
    control={<Switch  checked={true} onChange={()=>{}} />}
    label="Small"
  />
  <FormControlLabel
    control={<Switch checked={true} onChange={()=>{}} />}
    label="Normal"
  />
</FormGroup>


<div >
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper >xs=12</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper >xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper >xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper >xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper >xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper >xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper >xs=3</Paper>
        </Grid>
      </Grid>
    </div>
      <div>
        Our scientists could really use the information from Surveys 1 &amp; 2.
        &mdash; we need text about needing 1&amp;2 if they want to be invited. If you
        have the time, anything from 3 &amp; 4 would be phenomenal value to the
        research.
      </div>
      <div>{renderSurveyItems()}</div>
      <SurveyWrapper formTitle='hello'></SurveyWrapper>
    </div>
  )
}

export default Dashboard
