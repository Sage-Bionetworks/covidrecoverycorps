import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import ParticipantsByIncomeGraph from '../../assets/dashboard/survey-results/participants_by_income_levels_bar_graph.svg'
import InitialSymptomsBarGraph from '../../assets/dashboard/survey-results/initial_infection_symptoms_chart.svg'
import FemaleInfectionSymptomsGraph from '../../assets/dashboard/survey-results/female_infection_symptoms.svg'
import MaleInfectionSymptomsGraph from '../../assets/dashboard/survey-results/male_infection_symptoms.svg'
import ShortVsLongInfectionGraph from '../../assets/dashboard/survey-results/initial_vs_long_infection_graph.svg'
import ColorfulClipboard from '../../assets/dashboard/survey-results/clipboard.svg'
import DiagnosisFollowUpChart from '../../assets/dashboard/survey-results/diagnosis_follow_up_chart.svg'
import { playfairDisplayFont, openSansFont } from '../../App'

type ResultProps = {
  token: string
  hasFinishedIntroSurveys?: boolean
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
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '100px',
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
  newMedicalDiagnosisContainer: {
    fontFamily: openSansFont,
    fontStyle: '18px',
    lineHeight: '24px',
    maxWidth: '600px',
    marginBottom: theme.spacing(10),
  },
  medicalDiagnosisContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    alignItems: 'center',
    paddingTop: theme.spacing(4),
  },
}))

const BottomSurveyResults: React.FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Box className={classes.bottomContainer}>
      <Box className={classes.container} mb={6}>
        <Box className={classes.headerText} mb={3.75}>
          Participants by Income Levels
        </Box>
        <img src={ParticipantsByIncomeGraph}></img>
      </Box>
      <Box className={classes.container} mb={8}>
        <Box className={classes.headerText} mb={1.4}>
          Top 15 Initial Infection Symptoms Reported from 901 respondants
        </Box>
        <Box className={classes.headerDescriptionText}>
          These are the most common symptoms that our community experienced when
          they first became ill, during their initial COVID-19 infection.
        </Box>
        <img src={InitialSymptomsBarGraph}></img>
      </Box>
      <Box className={classes.container} mb={4}>
        <Box className={classes.headerText} mb={1.5}>
          Top 15 Initial Infection Symptoms by Sex
        </Box>
        <Box display="flex">
          <img
            src={FemaleInfectionSymptomsGraph}
            style={{ marginRight: '12px' }}
          ></img>
          <img src={MaleInfectionSymptomsGraph}></img>
        </Box>
      </Box>
      <Box
        style={{
          backgroundColor: 'white',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          borderTop: '1px dotted black',
          alignItems: 'center',
        }}
      >
        <Box className={classes.container} mb={4}>
          <Box className={classes.followUpSurveryContainer}>
            <img src={ColorfulClipboard} style={{ marginRight: '16px' }}></img>
            <Box className={classes.followUpSurveyText}>
              <strong>Follow up Survey results </strong>
              <Box mt={2}>
                <strong>230 people</strong> completed our follow up survey to
                understand how they are doing after their initial COVID-19
                infection.
              </Box>
              <Box mt={2}>
                <strong>180/230 people</strong> indicated they were still
                dealing with Long COVID. The graph below shows the symptoms this
                group experienced during their initial COVID-19 infection
                compared to the symptoms they are still dealing with in Long
                COVID.
              </Box>
            </Box>
          </Box>
          <strong className={classes.headerText}>
            Initial Infection Symptoms vs. Long COVID Symptoms (180 people)
          </strong>
          <img src={ShortVsLongInfectionGraph}></img>
        </Box>
      </Box>
      <Box className={classes.medicalDiagnosisContainer}>
        <Box maxWidth="600px">
          <strong className={classes.headerText}>
            New Medical Diagnosis Reported on Follow Up Survey
          </strong>
          <Box
            className={classes.headerText}
            style={{ fontWeight: 'normal' }}
            mt={3}
            mb={3}
          >
            Most people with Long COVID do not have new medical diagnoses, even
            if they are still dealing with the symptoms of Long COVID.
          </Box>
          <Box className={classes.newMedicalDiagnosisContainer}>
            However, some people have had additional medical diagnoses on top of
            their Long COVID symptoms. We’re still working to understand these
            new diagnoses. Some of the questions we still have are:
            <ul style={{ marginBottom: '12px', marginTop: '12px' }}>
              <li style={{ marginBottom: '10px' }}>
                Are these new diagnoses due to the COVID-19 infection, or would
                they have happened no matter what?
              </li>
              <li>
                Was the timing of these diagnoses changed because of COVID-19?
                In other words, were these diagnoses made earlier because the
                individual was going to doctors who caught the diagnoses?
              </li>
            </ul>
            Overall, we’re still not sure if these new diagnoses were caused by
            a COVID-19 infection or how COVID-19 might have contributed to these
            diagnoses.
          </Box>
        </Box>
        <Box className={classes.headerText} mb={3}>
          New Diagnoses at Follow Up (180 people)
        </Box>
        <img src={DiagnosisFollowUpChart}></img>
        <Box mt={4} maxWidth="600px">
          * Other diagnoses include reflux, asthma or reactive airway disease,
          post-traumatic stress disorder, anemia, and POTS (Postural orthostatic
          tachycardia syndrome)
        </Box>
      </Box>
    </Box>
  )
}

export const ResultDashboard: React.FunctionComponent<ResultProps> = ({
  token,
  hasFinishedIntroSurveys = true,
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
  const [activePage, setActivePage] = useState('')

  const [latestMonthlySurvey, setLatestMonthlySurvey] = useState<{
    survey?: SavedSurvey
    isCompleted: boolean
  }>({ isCompleted: true })
  const { t } = useTranslation()

  const setMonthlySurvey = async (token: string) => {
    if (token) {
      setIsLoading(true)
      try {
        const monthlySurvey = await SurveyService.getLatestMonthlySurvey(token)
        setLatestMonthlySurvey(monthlySurvey)
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
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
          if (isSubscribed) {
            await setMonthlySurvey(token)
            setUserData(userInfoResponse.data)
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
  }, [token])

  const triggerToggle = () => {
    setMonthlySurvey(token)
    setActivePage('MONTHLY_SURVEY')
  }

  const getNav = (activeIndex: number): JSX.Element => {
    // nav items without result
    let navItems: LeftNavItem[] = [
      {
        id: 'INITIAL_SURVEYS',
        element: <img src={liResultNext}></img>,
        text: t('resultDashboard.li5'),
      },
    ]

    let resultValue = 'INDETERMINATE' as TestResultString

    //if they have test results -- no initial survey but display result
    if (result) {
      resultValue = result.data.valueString.toUpperCase() as TestResultString

      navItems = [
        {
          id: 'TEST_RESULT',
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
        if (
          !latestMonthlySurvey.isCompleted ||
          latestMonthlySurvey?.survey?.data.vaccine?.reinfection === 'Yes'
        ) {
          let img = <img src={liResultNext}></img>

          img = (
            <div style={{ position: 'relative' }}>
              {img}
              {!latestMonthlySurvey.isCompleted && (
                <div className={classes.newNotification}>1</div>
              )}
            </div>
          )

          navItems.push({
            id: 'MONTHLY_SURVEY',
            element: img,
            text: t('resultDashboard.li2'),
            //  callbackFn: () => setActiveItemIndex(1),
          })
        }
      }

      navItems.push({
        id: 'SURVEY_RESULTS',
        img: liResultSurvey,
        text: t('resultDashboard.li4'),
        //  callbackFn: () => setActiveItemIndex(2),
      })
    }

    return (
      <div className="no-print">
        <LeftNav
          items={navItems}
          activeColor={RESULT_COLOR[resultValue]}
          activeIndex={activeIndex}
          changeIndexCallbackFn={(index: number, id: string) => {
            setActiveItemIndex(index)
            setActivePage(id)
          }}
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
            {' '}
            {t('resultDashboard.inviteCTA')}
          </Button>
        </div>
      </div>
    )
  }

  const getMain = (): JSX.Element => {
    // alert(hasFinishedIntroSurveys + 'finished')
    if (error) {
      return <Alert severity="error">{error!['message'] || error}</Alert>
    }
    console.log(userData, activeItemIndex)
    if (userData) {
      if (!activeItemIndex && result) {
        return (
          <Result
            userData={userData!}
            testResult={result}
            changeTabCallbackFn={setActiveItemIndex}
          />
        )
      }
      if (!hasFinishedIntroSurveys) {
        return <Dashboard token={token} />
      }
      if (activePage === 'SURVEY_RESULTS') {
        return <SurveyResults />
      }

      return (
        <MonthlySurvey
          onSurveyStartedFn={() => setActivePage('MONTHLY_SURVEY1')}
          token={token}
          savedMonthlySurvey={latestMonthlySurvey.survey}
          onSurveyFinishedFn={triggerToggle}
        ></MonthlySurvey>
      )
    }

    return (
      <div className={classes.loader}>
        <CircularProgress color="primary" />
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

  return (
    <div className={classes.root} data-cy="page-result">
      {!isLoading && activePage !== 'MONTHLY_SURVEY1' && (
        <Box>
          <TwoColumnTemplate
            nav={getNav(activeItemIndex)}
            main={getMain()}
          ></TwoColumnTemplate>
          {activePage === 'SURVEY_RESULTS' && <BottomSurveyResults />}
        </Box>
      )}
      {!isLoading && activePage === 'MONTHLY_SURVEY1' && (
        <MonthlySurvey
          token={token}
          savedMonthlySurvey={latestMonthlySurvey.survey}
          onSurveyFinishedFn={triggerToggle}
          onSurveyStartedFn={() => setActivePage('MONTHLY_SURVEY1')}
        ></MonthlySurvey>
      )}
      {/*!(result || isLoading) && (
        <Container maxWidth="xs">
          <MonthlySurvey
            token={token}
            savedMonthlySurvey={latestMonthlySurvey.survey}
            onSurveyFinishedFn={triggerToggle}
          ></MonthlySurvey>
        </Container>
      )*/}
    </div>
  )
}

export default ResultDashboard
