import React, { FunctionComponent, useState } from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { playfairDisplayFont } from '../../App'
import { useTranslation, Trans } from 'react-i18next'
import iconCheckMark from '../../assets/dashboard/icon_whoohoo.svg'
import SurveyWrapper from '../surveys/SurveyWrapper'
import PostLabHeader from '../surveys/PostLabHeader'

export const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'unset',
    maxWidth: 'unset',
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
}

const WhatNext: FunctionComponent<ResultProps> = ({ token }: ResultProps) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [activeItemIndex, setActiveItemIndex] = useState(0)

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
        <h3>{t('resultNext.subtitle1')}</h3>
        <p>{t('resultNext.text1')}</p>
        <div className="text-center" style={{ margin: '30px auto' }}>
          <Button variant="contained" color="primary">
            {t('resultNext.surveyCTA')}
          </Button>
        </div>
        <h3>{t('resultNext.subtitle2')}</h3>
        <p>{t('resultNext.text2')}</p>
      </>
    )
  }

  return (
    <SurveyWrapper
      formTitle="Post Lab"
      token={token || ''}
      surveyName={'POST_LAB'}
      formClass="crc"
      cardClass="inherit"
      onDoneCallback={() => setActiveItemIndex(10)}
    >
      <PostLabHeader></PostLabHeader>
    </SurveyWrapper>
  )
  return <div className={classes.root}>{getNextIntro()}</div>
  return surveyDoneEl
}

export default WhatNext
