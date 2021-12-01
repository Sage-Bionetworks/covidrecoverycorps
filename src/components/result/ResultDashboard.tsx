import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
  withRouter,
} from 'react-router-dom'
import { playfairDisplayFont } from '../../App'
import liResultIndeterminate from '../../assets/results/liResultIndeterminate.svg'
import liResultNegative from '../../assets/results/liResultNegative.svg'
import liResultNext from '../../assets/results/liResultNext.svg'
import liResultPositive from '../../assets/results/liResultPositive.svg'
import liResultSurvey from '../../assets/results/liResultSurvey.svg'
import { SurveyService } from '../../services/survey.service'
import { UserService } from '../../services/user.service'
import {
  LoggedInUserData,
  SavedSurvey,
  TestResult,
  TestResultString,
} from '../../types/types'
import Dashboard from '../dashboard/Dashboard'
import LeftNav, { LeftNavItem } from '../static/LeftNav'
import TwoColumnTemplate from '../static/TwoColumnTemplate'
import ShareModal from '../widgets/ShareModal'
import MonthlySurvey from './MonthlySurvey'
import Result, { RESULT_COLOR } from './Result'
import SurveyResults from './SurveyResults'

type ResultProps = {
  token: string
}

export const useStyles = makeStyles(theme => ({
  root: {
    maxWith: '1080px',
    marginTop: '48px',
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

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: playfairDisplayFont,
    fontSize: '24px',
    lineHeight: '30px',
    fontWeight: 'bold',
  },
  headerDescriptionText: {
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
    maxWidth: '640px',
  },
  followUpSurveryContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  followUpSurveyText: {
    maxWidth: '500px',
    fontFamily: playfairDisplayFont,
    fontSize: '24px',
    lineHeight: '30px',
    marginBottom: theme.spacing(2.75),
  },
}))

export const ResultDashboard: React.FunctionComponent<
  ResultProps & RouteComponentProps
> = ({ token }: ResultProps) => {
  const location = useLocation()

  const classes = useStyles()
  const [isShowingShareDialog, setIsShowingShareDialog] = useState(false)
  const [hasFinishedIntroSurveys, setHasFinishedIntroSurveys] = useState<
    boolean | undefined
  >(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [userData, setUserData] = useState<LoggedInUserData | undefined>(
    undefined,
  )
  const [result, setResult] = useState<TestResult | undefined>()
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [activePage, setActivePage] = useState('')

  const [latestMonthlySurvey, setLatestMonthlySurvey] = useState<{
    survey?: SavedSurvey
    isCompleted: boolean
  }>({ isCompleted: true })
  const { t } = useTranslation()

  const setMonthlySurvey = async (token: string, showLoader = false) => {
    if (token) {
      setIsLoading(true)
      try {
        const monthlySurvey = await SurveyService.getLatestMonthlySurvey(token)
        setLatestMonthlySurvey(monthlySurvey)
      } catch (e) {
        setError(e)
      } finally {
        if (showLoader) {
          setIsLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token) {
        setIsLoading(true)
        try {
          const userInfoResponse = await UserService.getUserInfo(token)
          const ResultsResponse = await UserService.getTestResult(token)

          const isCompleted = await SurveyService.isInitialSurveysCompleted(
            token,
            userInfoResponse.data,
          )

          if (isSubscribed) {
            await setMonthlySurvey(token)
            setUserData(userInfoResponse.data)
            console.log('seeeint', isCompleted)
            setHasFinishedIntroSurveys(isCompleted)
            if (ResultsResponse?.data?.items?.length > 0) {
              const result = ResultsResponse.data.items[0]
              setResult(result)
            }
          }
        } catch (e) {
          if (isSubscribed) {
            setError(e)
          }
        } finally {
          if (isSubscribed) {
            setIsLoading(false)
          }
        }
      }
    }
    getInfo()
    return () => {
      isSubscribed = false
    }
  }, [token, location])

  useEffect(() => {
    if (location.pathname.replace(/\//i, '') === 'dashboard') {
      if (!hasFinishedIntroSurveys) {
        setActivePage('/dashboard/initial')
      } else if (!latestMonthlySurvey.isCompleted) {
        setActivePage('/dashboard/followup')
      } else {
        setActivePage('/dashboard/results')
      }
    } else {
      setActivePage('')
    }
  }, [location, latestMonthlySurvey, hasFinishedIntroSurveys])

  const triggerToggle = () => {
    setMonthlySurvey(token, true)
  }

  const getNav = (activeIndex: number): JSX.Element => {
    // nav items without result
    let navItems: LeftNavItem[] = []
    if (!hasFinishedIntroSurveys) {
      navItems.push({
        id: '/dashboard/initial',
        element: <img src={liResultNext}></img>,
        text: t('resultDashboard.li5'),
      })
    }

    let resultValue = 'INDETERMINATE' as TestResultString

    //if they have test results -- no initial survey but display result
    if (result) {
      resultValue = result.data.valueString.toUpperCase() as TestResultString

      navItems = [
        {
          id: '/dashboard/result',
          img: liResultNegative,
          text: t('resultDashboard.li1'),
          // callbackFn: () => setActiveItemIndex(0),
        },
      ]
      if (resultValue === 'INDETERMINATE') {
        navItems[0].img = liResultIndeterminate
      }

      if (resultValue === 'POSITIVE') {
        navItems[0].img = liResultPositive
      }
    }

    if (
      (!latestMonthlySurvey.isCompleted ||
        latestMonthlySurvey?.survey?.data.vaccine?.reinfection === 'Yes') &&
      hasFinishedIntroSurveys
    ) {
      let img = (
        <div style={{ position: 'relative' }}>
          <img src={liResultNext}></img>
          {!latestMonthlySurvey.isCompleted && (
            <div className={classes.newNotification}>1</div>
          )}
        </div>
      )

      navItems.push({
        id: '/dashboard/followup',
        element: img,
        text: t('resultDashboard.li2'),
        //  callbackFn: () => setActiveItemIndex(1),
      })
    }

    navItems.push({
      id: '/dashboard/results',
      img: liResultSurvey,
      text: t('resultDashboard.li4'),
      //  callbackFn: () => setActiveItemIndex(2),
    })

    return (
      <div className="no-print">
        <LeftNav
          items={navItems}
          activeColor={RESULT_COLOR[resultValue]}
          activeIndex={activeIndex}
          isLink={true}
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
          >
            {t('resultDashboard.inviteCTA')}
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Box width="100%" mx="auto" textAlign="center">
        <CircularProgress />
      </Box>
    )
  }
  if (activePage && hasFinishedIntroSurveys !== undefined) {
    return <Redirect to={activePage} />
  }

  return (
    <div className={classes.root} data-cy="page-result">
      {!isLoading && (
        <Box>
          <TwoColumnTemplate
            nav={getNav(activeItemIndex)}
            main={
              <>
                {error && (
                  <Alert severity="error">{error!['message'] || error}</Alert>
                )}
                <Switch>
                  <Route path="/dashboard/results">
                    <SurveyResults />
                  </Route>
                  <Route path="/dashboard/result">
                    {!userData ? (
                      <div>...</div>
                    ) : (
                      <Result
                        userData={userData}
                        testResult={result}
                        changeTabCallbackFn={setActiveItemIndex}
                      />
                    )}
                  </Route>
                  <Route path="/dashboard/initial">
                    <Dashboard token={token} />
                  </Route>
                  <Route path="/dashboard/followup">
                    <MonthlySurvey
                      onSurveyStartedFn={() => {}}
                      token={token}
                      savedMonthlySurvey={latestMonthlySurvey.survey}
                      onSurveyFinishedFn={triggerToggle}
                    ></MonthlySurvey>
                  </Route>
                </Switch>
              </>
            }
          ></TwoColumnTemplate>
        </Box>
      )}
    </div>
  )
}

export default withRouter(ResultDashboard)
