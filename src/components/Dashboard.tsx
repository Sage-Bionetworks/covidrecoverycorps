import React, { useState, useEffect } from 'react'
import testTubeImg from '../assets/dashboard/icon_testtubes.svg'
import saveProgressIconImg from '../assets/dashboard/icon_savedprogress.svg'
import clockIconImg from '../assets/dashboard/icon_timer.svg'
import completeIconImg from '../assets/dashboard/icon_complete.svg'
import emptyIconImg from '../assets/dashboard/icon_empty.svg'
import iconThankYou from '../assets/dashboard/icon_thankyou.svg'
import iconWooHoo from '../assets/dashboard/icon_whoohoo.svg'
import { makeStyles } from '@material-ui/core/styles'

import { CircularProgress, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'

import { SurveyService } from '../services/survey.service'
import { SavedSurveysObject, SurveyType, SavedSurvey, ReportData } from '../types/types'
import _ from 'lodash'
import { UserService } from '../services/user.service'
import Alert from '@material-ui/lab/Alert/Alert'
import moment from 'moment'

type DashboardProps = {
  token: string
}
type UISurvey = {
  type: SurveyType
  title: string
  link: string
  description: string
  time: string
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
  },
  appointmentContainerDiv: {
    margin: '0px 30px 70px 30px'
  },
  appointmentDateHeader: {
    color: '#FC9090',
    fontWeight: 'bold',
    marginTop: '30px'
  },
  appointmentInstructions: {
    marginTop: '30px'
  }
})

const surveys: UISurvey[] = [
  {
    type: 'CONTACT',
    title: 'profile',
    description: 'Contact Information',
    time: '2',
    link: '/contactinfo',
  },
  {
    type: 'DEMOGRAPHIC',
    title: 'Survey 1',
    description: 'Tell us about yourself',
    time: '2',
    link: '/survey1',
  },
  {
    type: 'COVID_EXPERIENCE',
    title: 'Survey 2',
    description: 'Recent COVID Experience',
    time: '5',
    link: '/survey2',
  },
  {
    type: 'HISTORY',
    title: 'Survey 3',
    description: 'Medical History',
    time: '5-10',
    link: '/survey3',
  },
  {
    type: 'MORE',
    title: 'Survey 4',
    description: 'More COVID Experience',
    time: '5-10',
    link: '/survey4',
  },
]

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  token,
}: DashboardProps) => {
  const [savedSurveys, setSavedSurveys] = useState<SavedSurveysObject>()
  const [error, setError] = useState()

  const [isLoading, setIsLoading] = useState(false)
  const [isContactInfoDone, setIsContactInfoDone] = useState(false)
  const [appointment, setAppointment] = useState<ReportData>()

  const classes = useStyles()

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfo = await UserService.getUserInfo(token)
          setIsContactInfoDone(!!userInfo.data.attributes?.gender)
          const response = await SurveyService.getUserSurveys(token)
          setSavedSurveys(_.first(response.data.items)?.data)
          const appointmentsResponse = await UserService.getAppointments(token)
          if (appointmentsResponse && appointmentsResponse.data && appointmentsResponse.data.items.length > 0) {
            const appt = appointmentsResponse.data.items[0]
            if (appt.data.status == 'booked')
              setAppointment(appt)
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

  const renderAppointment = (appointment: ReportData) => {
    const appointmentDateTime = moment(appointment.data.start)
    const friendlyAppointmentTimeStart = appointmentDateTime.format('h:mm a')
    const appointmentDateTimeEnd = moment(appointment.data.start).add(30, 'minutes')
    const friendlyAppointmentTimeEnd = appointmentDateTimeEnd.format('h:mm a')

    return (
      <Card className={classes.root}>
        <div className={classes.appointmentContainerDiv}>
          <h2 className="text-center">Appointment confirmation</h2>
          <p>Your lab appointment to get your blood drawn has been confirmed for:</p>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <div className={classes.appointmentDateHeader}>DATE</div>
              <div>{appointmentDateTime.format('dddd')}</div>
              <div><strong>{appointmentDateTime.format('MMMM Do, YYYY')}</strong></div>
              <div><strong>{friendlyAppointmentTimeStart} - {friendlyAppointmentTimeEnd}</strong></div>
            </Grid>
          </Grid>
                
          <div className={classes.appointmentInstructions}>
            <p>You will stop at the main information desk in the lobby and will be directed to the proper location.</p>
            <p>If you have a fever, cough, sore throat, shortness of breath, diarrhea, or body aches, you should not come to have your blood drawn.</p>
            <p>
              If you need to reschedule your appointment or need assistance, call 212-305-5700 or email <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">COVIDRecoveryCorps@cumc.columbia.edu</a>
            </p>
          </div>
        </div>
      </Card>
    )
  }

  const renderSurveyItems = (savedSurveys: SavedSurvey[], isTier1: boolean) => {
    const getSavedSurvey = (survey: UISurvey): SavedSurvey | undefined => {
      return savedSurveys.find(savedSurvey => survey.type === savedSurvey.type)
    }
    const isDone = (survey: UISurvey): boolean => {
      const savedSurvey = getSavedSurvey(survey)
      return !!savedSurvey?.completedDate
    }
    const isInProgress = (survey: UISurvey): boolean => {
      const savedSurvey = getSavedSurvey(survey)

      return !!savedSurvey?.updatedDate && !isDone(survey)
    }

    const getIconImageForContact = (): JSX.Element => {
      return isContactInfoDone ? (
        <img src={completeIconImg} alt="done"></img>
      ) : (
        <img src={emptyIconImg} alt="to do"></img>
      )
    }

    const getIconImage = (survey: UISurvey): JSX.Element => {
      if (survey.type === 'CONTACT') {
        return getIconImageForContact()
      }
      if (isInProgress(survey)) {
        return <img src={saveProgressIconImg}></img>
      } else {
        const image = isDone(survey) ? (
          <img src={completeIconImg} alt="done"></img>
        ) : (
          <img src={emptyIconImg} alt="to do"></img>
        )
        return image
      }
    }

    const isSurveyDisabled = (survey: UISurvey): boolean => {
      if (survey.type === 'CONTACT') {
        return isContactInfoDone
      } else {
        return isDone(survey) || !isContactInfoDone
      }
    }

    const getClassNameForSurveyItem = (survey: UISurvey): string => {
      return isSurveyDisabled(survey) ? 'item-wrap disabled' : 'item-wrap'
    }

    const renderSurveyInfo = (
      survey: UISurvey,
      isTier1: boolean,
    ): JSX.Element => {
      const innerElement = (
        <>
          <div className="graphics">
            <div className="circle">{getIconImage(survey)}</div>
            {isTier1 && <div className="rect"></div>}
          </div>
          <div>
            <div className="title">{survey.title}</div>

            <div className="description">{survey.description}</div>
          </div>

          <div className="time">
            <img src={clockIconImg}></img>
            <span>{survey.time}&nbsp;min</span>
          </div>
        </>
      )

      if (isSurveyDisabled(survey)) {
        return <div className="btn-container">{innerElement}</div>
      } else {
        return (
          <a className="btn-container" href={survey.link}>
            {innerElement}
          </a>
        )
      }
    }

    const _surveys = isTier1 ? surveys.slice(0, 3) : surveys.slice(3)

    const items = _surveys.map((survey: UISurvey, index) => (
      <li className={getClassNameForSurveyItem(survey)} key={survey.title}>
        <div className="item">{renderSurveyInfo(survey, isTier1)}</div>
      </li>
    ))
    return <ul className="items">{items}</ul>
  }

  const getIntro = (savedSurveys: SavedSurvey[]): JSX.Element => {
    const completedSurveyNames = savedSurveys
      .filter(survey => survey && survey.completedDate)
      .map(survey => survey?.type)

    const doneMain =
      isContactInfoDone &&
      completedSurveyNames.includes('DEMOGRAPHIC') &&
      completedSurveyNames.includes('COVID_EXPERIENCE')
    const doneAll =
      doneMain &&
      completedSurveyNames.includes('HISTORY') &&
      completedSurveyNames.includes('MORE')
    const doneMainEl = (
      <>
        <img src={iconWooHoo} alt="woo hoo!"></img>
        <h2>Whoo hoo!</h2>
        <p>
          We’ve added you to the waiting list for an antibody test. If you are
          selected, you will receive an email.
        </p>
        <p>
          {' '}
          Please consider completing the rest of the surveys if you have time.
        </p>
      </>
    )

    const doneAllEl = (
      <>
        <img src={iconThankYou} alt="thank you!"></img>
        <h2>
          Thank you for your contribution to the COVID Recovery Corps Study!
        </h2>{' '}
      </>
    )
    if (!doneAll && !doneMain) {
      return <></>
    }
    return (
      <div className="finished-status">{doneAll ? doneAllEl : doneMainEl}</div>
    )
  }
  return (
    <div className="Dashboard">
			{!appointment && (
			<>
        <div className="dashboard-intro">
          <p>
            The information you provide will help researchers learn more about
            COVID-19.
          </p>
          <p>
            {' '}
            To be invited for a lab test, you will need to complete your Profile
            and Surveys 1-2. Surveys 3 and 4 are optional but still provide
            important information. Please consider completing them if you have the
            time.{' '}
          </p>
        </div>

        <Card className={classes.root}>
          {error && <Alert severity="error">{error}</Alert>}
          {isLoading && (
            <div className="text-center">
              <CircularProgress color="primary" />
            </div>
          )}
          {getIntro(savedSurveys?.surveys || [])}
          <div>{renderSurveyItems(savedSurveys?.surveys || [], true)}</div>
          <div className="separator">
            <img src={testTubeImg}></img>
            <div className="small">
              {' '}
              Minimum surveys required for lab invites{' '}
            </div>
          </div>
          <div>{renderSurveyItems(savedSurveys?.surveys || [], false)}</div>
        </Card>
			</>)}
			{appointment && (
        <div>{renderAppointment(appointment)}</div>
      )}
    </div>
  )
}

export default Dashboard
