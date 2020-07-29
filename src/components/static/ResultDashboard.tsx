import React, { useState, useEffect } from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import {
  TestResult,
  TestResultString,
  LoggedInUserData,
} from '../../types/types'

import liResult from '../../assets/results/liResult.svg'
import liResultSurveys from '../../assets/results/liResultSurveys.svg'
import liResultNext from '../../assets/results/liResultNext.svg'

import TwoColumnTemplate from './TwoColumnTemplate'
import LeftNav, { LeftNavItem } from './LeftNav'
import Result from './Result'

import { UserService } from '../../services/user.service'

import { useTranslation, Trans } from 'react-i18next'
import PostLabHeader from '../surveys/PostLabHeader'
import SurveyWrapper from '../surveys/SurveyWrapper'

type ResultProps = {
  token?: string
}

export const useStyles = makeStyles(theme => ({
  root: {
    maxWith: '1080',
  },
}))
export const ResultDashboard: React.FunctionComponent<ResultProps> = ({
  token,
}: ResultProps) => {
  const classes = useStyles()

  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const { t } = useTranslation()

  const navItems: LeftNavItem[] = [
    {
      img: liResult,
      text: t('resultDashboard.li1'),
      callbackFn: () => setActiveItemIndex(0),
    },
 {
      img: liResultNext,
      text: t('resultDashboard.li2'),
      callbackFn: () => setActiveItemIndex(1),
    },
    {
      img: liResultSurveys,
      text: t('resultDashboard.li3'),
      callbackFn: () => setActiveItemIndex(2),
    },
  ]

  const getNav = (): JSX.Element => {
    return (
      <>
        <LeftNav items={navItems} activeIndex={0} />
        {/*ALINA TO DO <Button style={{ margin: '0 30px' }}>Invite a friend</Button>*/}
      </>
    )
  }

  const getMain = (): JSX.Element => {
    switch (activeItemIndex) {
      case 0: 
      return <Result token={token} />
      default:
        return (<SurveyWrapper
        formTitle="Post Lab"
        token={token || ''}
        surveyName={'POST_LAB'}
        formClass="crc"
        cardClass="inherit"
      >
           <PostLabHeader></PostLabHeader></SurveyWrapper>)

    }

   
  }

  return (
    <div className={classes.root}>
      <TwoColumnTemplate nav={getNav()} main={getMain()}></TwoColumnTemplate>
    </div>
  )
}

export default ResultDashboard
