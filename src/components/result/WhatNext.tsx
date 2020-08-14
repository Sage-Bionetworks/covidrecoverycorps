import React, { FunctionComponent, useState, useEffect } from 'react'
import { makeStyles, Button, CircularProgress } from '@material-ui/core'
import { playfairDisplayFont } from '../../App'
import { useTranslation, Trans } from 'react-i18next'
import iconCheckMark from '../../assets/dashboard/icon_whoohoo.svg'
import SurveyWrapper from '../surveys/SurveyWrapper'
import PostLabHeader from '../surveys/PostLabHeader'
import { SurveyService } from '../../services/survey.service'
import {
  SavedSurveysObject,
  SurveyPostLabType,
  SurveyType,
  SavedSurvey,
} from '../../types/types'
import _ from 'lodash'

export const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'unset',
    maxWidth: 'unset',
  },


  loader: {
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
  },
  list: {
    '& ul': {
      paddingBottom: '20px',
      borderBottom: '1px solid #EEEEEE',
      [theme.breakpoints.up('md')]: {
        marginLeft: '50px',
        paddingBottom: '30px',
      },
    },

    '& li': {
      color: '#4C697E;',
      margin: '10px 0',
    },
  },
  heading: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    '& h4': {
      fontFamily: playfairDisplayFont,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '1.8rem',
      color: '#222222',
    },
    '& img': {
      width: '50px',
      verticalAlign: 'bottom',
      [theme.breakpoints.down('md')]: {
        margin: '20px 0',
      },
      [theme.breakpoints.up('md')]: {
        margin: '0 40px 0 0',
      },
    },
  },
}))

type ResultProps = {
token?: string
  unfinishedSurveys: string[]
  onSurveyFinishedFn: Function
}

const WhatNext: FunctionComponent<ResultProps> = ({unfinishedSurveys, token, onSurveyFinishedFn }: ResultProps) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const postLabSurveys: SurveyPostLabType[] = ['POST_LAB']
  const [pageState, setPageState] = useState<
    'INTRO' | 'SURVEY' | 'SURVEY_DONE'
  >('INTRO')

 

  const surveyDoneEl = (
    <div style={{ textAlign: 'center', margin: '0 auto' }}>
      <img src={iconCheckMark}></img>
      <h3>{t('resultDashboard.thankYou')}</h3>
    </div>
  )

  const getNextIntro = () => {
    
  

    return (
      <>
        <h2>{t('resultNext.title')}</h2>
        {unfinishedSurveys.length > 0 && <>
        <h3>{t('resultNext.subtitle1')}</h3>
        <p>{t('resultNext.text1')}</p>
        <div className="text-center" style={{ margin: '30px auto' }}>
          <Button variant="contained" color="primary" onClick={()=> setPageState('SURVEY')}>
            {t('resultNext.surveyCTA')}
          </Button>
        </div>
        </>}
        <h3>{t('resultNext.subtitle2')}</h3>
        <p>{t('resultNext.text2')}</p>
      </>
    )
  }
  

  const postLabSurvey = (
    <SurveyWrapper
      formTitle="Post Lab"
      token={token || ''}
      surveyName={'POST_LAB'}
      formClass="crc"
      cardClass="inherit"
      onDoneCallback={() =>{setPageState('SURVEY_DONE'); onSurveyFinishedFn('POST_LAB')}}
    >
      <PostLabHeader></PostLabHeader>
    </SurveyWrapper>
  )

  switch (pageState) {
    case 'SURVEY_DONE':
      return surveyDoneEl

    case 'SURVEY':
      return postLabSurvey
    default:
      return getNextIntro()
  }
}

export default WhatNext
