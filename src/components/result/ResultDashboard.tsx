import React, { useState, useEffect } from 'react'
import { makeStyles, Button, CircularProgress } from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import {
  TestResult,
  TestResultString,
  LoggedInUserData,
  SavedSurveysObject,
  SurveyPostLabType,
  SurveyType,
} from '../../types/types'

import liResultPositive from '../../assets/results/liResultPositive.svg'
import liResultNegative from '../../assets/results/liResultNegative.svg'
import liResultIndeterminate from '../../assets/results/liResultIndeterminate.svg'
import iconCheckMark from '../../assets/dashboard/icon_whoohoo.svg'
import liResultNext from '../../assets/results/liResultNext.svg'
import TwoColumnTemplate from '../static/TwoColumnTemplate'
import LeftNav, { LeftNavItem } from '../static/LeftNav'
import Result, { RESULT_COLOR } from './Result'
import WhatNext from './WhatNext'
import { UserService } from '../../services/user.service'
import { useTranslation, Trans } from 'react-i18next'
import ShareModal from '../widgets/ShareModal'
import Alert from '@material-ui/lab/Alert/Alert'
import { SurveyService } from '../../services/survey.service'
import _ from 'lodash'

type ResultProps = {
  token: string
}

export const useStyles = makeStyles(theme => ({
  root: {
    maxWith: '1080',
  },

  loader: {
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
  },
  newNotification: {
    position: 'absolute',
    top: '-.6rem',
    right: '-1rem',
    width: '2.2rem',
    height: '2.2rem',
    color: '#fff',
    textAlign: 'center',
    fontSize: '1.2rem',
    backgroundColor: '#FC9090',
    borderRadius: '50%',
    lineHeight: '2.2rem',
    fontWeight: 'bold',
  },
}))
export const ResultDashboard: React.FunctionComponent<ResultProps> = ({
  token,
}: ResultProps) => {
  const classes = useStyles()
  const [isShowingShareDialog, setIsShowingShareDialog] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [userData, setUserData] = useState<LoggedInUserData | undefined>(
    undefined,
  )
  const [result, setResult] = useState<TestResult | undefined>()
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const[unfinishedSurveysNum, setUnfinishedSurveysNum]= useState<number | undefined>(undefined)
  const { t } = useTranslation()

  const postLabSurveys: SurveyPostLabType[] = ['POST_LAB']
  const isSurveyDone = (surveyType: SurveyType): boolean => {
    if (!savedSurveys) {
      return false
    }

    const savedSurvey =  savedSurveys.surveys.find(
      savedSurvey => surveyType === savedSurvey.type,
    )

    return !!savedSurvey?.completedDate
  }

  const getUnfinishedSurveys = () => {
    const surveysToDo = []
    for (const survey of postLabSurveys) {
      if (!isSurveyDone(survey)) {
        surveysToDo.push(survey)
      }
    }

    return surveysToDo
  }


  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token) {
        setIsLoading(true)
        try {
          const userInfoResponse = await UserService.getUserInfo(token)
          const ResultsResponse = await UserService.getTestResult(token)
          if (isSubscribed){
          setUserData(userInfoResponse.data)
          if (ResultsResponse?.data?.items?.length > 0) {
            const result = ResultsResponse.data.items[0]
            setResult(result)
          }
          const surveys = await SurveyService.getUserSurveys(token)
          setSavedSurveys(_.first(surveys.data.items)?.data)
        }
        } catch (e) {
          if (isSubscribed) {setError(e)}
        } finally {
         if (isSubscribed) {setIsLoading(false)}
        }
      }
    }
    getInfo()
    return () => {
      isSubscribed = false
    }
  }, [token])

  const getNav = (activeIndex: number): JSX.Element => {
    if (!result) {
      return <></>
    }
    const resultValue = result.data.valueString.toUpperCase() as TestResultString

    const navItems: LeftNavItem[] = [
      {
        img: liResultNegative,
        text: t('resultDashboard.li1'),
        callbackFn: () => setActiveItemIndex(0),
      },
    ]
    if (resultValue === 'INDETERMINATE') {
      navItems[0].img = liResultIndeterminate
    }

   if (resultValue === 'POSITIVE') {
      navItems[0].img = liResultPositive

      let img = <img src={liResultNext}></img>
        if (getUnfinishedSurveys()?.length) {
          img = <div style={{position:'relative'}}>{img}<div className={classes.newNotification}>{getUnfinishedSurveys().length}</div></div>
        }
    
      navItems.push({
        element: img,
        text: t('resultDashboard.li2'),
        callbackFn: () => setActiveItemIndex(1),
      })
    }

    return (
      <div className="no-print">
        <LeftNav
          items={navItems}
          activeColor={RESULT_COLOR[resultValue]}
          activeIndex={activeIndex}
          changeIndexCallbackFn={setActiveItemIndex}
        />
        <ShareModal
          show={isShowingShareDialog}
          onClose={() => {
            setIsShowingShareDialog(false)
          }}
        ></ShareModal>
        <div className="text-center">
          <Button
            style={{ margin: '30px auto 0 auto', fontSize: '14px' }}
            variant="outlined"
            color="primary"
            onClick={() => {
              setIsShowingShareDialog(true)
            }}
          > {t('resultDashboard.inviteCTA')}
          </Button>
        </div>
      </div>
    )
  }

  const getMain = (): JSX.Element => {
    if (error) {
      return <Alert severity="error">{error!['message'] || error}</Alert>
    }
    if (userData) {
      return !activeItemIndex ? (
        <Result
          userData={userData!}
          testResult={result}
          changeTabCallbackFn={setActiveItemIndex}
        />
      ) : (
        <WhatNext token={token} unfinishedSurveys={getUnfinishedSurveys()} onSurveyFinishedFn={()=> setUnfinishedSurveysNum(_prev =>  (_prev !== undefined)? (_prev - 1) : undefined) }></WhatNext>
      )
    }

    return (
      <div className={classes.loader}>
        <CircularProgress color="primary" />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <TwoColumnTemplate
        nav={getNav(activeItemIndex)}
        main={getMain()}
      ></TwoColumnTemplate>
    </div>
  )
}

export default ResultDashboard
