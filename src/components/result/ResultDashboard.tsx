import React, { useState, useEffect } from 'react'
import { makeStyles, Button, CircularProgress } from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import {
  TestResult,
  TestResultString,
  LoggedInUserData,
} from '../../types/types'

import liResultPositive from '../../assets/results/liResultPositive.svg'
import liResultNegative from '../../assets/results/liResultNegative.svg'
import liResultIndeterminate from '../../assets/results/liResultIndeterminate.svg'
import liResultNext from '../../assets/results/liResultNext.svg'
import TwoColumnTemplate from '../static/TwoColumnTemplate'
import LeftNav, { LeftNavItem } from '../static/LeftNav'
import Result, { RESULT_COLOR } from './Result'
import WhatNext from './WhatNext'
import { UserService } from '../../services/user.service'
import { useTranslation, Trans } from 'react-i18next'
import ShareModal from '../widgets/ShareModal'
import Alert from '@material-ui/lab/Alert/Alert'

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
  const { t } = useTranslation()

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfoResponse = await UserService.getUserInfo(token)
          setUserData(userInfoResponse.data)
          const ResultsResponse = await UserService.getTestResult(token)
          if (ResultsResponse?.data?.items?.length > 0) {
            const result = ResultsResponse.data.items[0]
            setResult(result)
          }
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

    if (resultValue === 'POSITIVE') {
      navItems[0].img = liResultPositive
      navItems.push({
        img: liResultNext,
        text: t('resultDashboard.li2'),
        callbackFn: () => setActiveItemIndex(1),
      })
    }

    return (
      <>
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
      </>
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
        <WhatNext></WhatNext>
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
