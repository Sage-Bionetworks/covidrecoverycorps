import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Card } from '@material-ui/core'
import {
  AppointmentParticipant,
  ColumbiaAppointmentAddress,
  GeocodedColumbiaAppointmentAddress,
} from '../../types/types'
import { ReactComponent as ColumbiaLogo } from '../../assets/columbia_logo.svg'
import { ReactComponent as SageLogo } from '../../assets/sage_logo.svg'
import { ReactComponent as MapMarker } from '../../assets/map_marker.svg'
import QRCode from 'qrcode.react'
import moment, { Moment } from 'moment'
import { UserService } from '../../services/user.service'
import i18next from 'i18next'
import { useTranslation, Trans } from 'react-i18next'
import 'moment/locale/es'

type AppointmentProps = {
  token?: string
}

type LocationObject = {
  address?: string
  addressObject: ColumbiaAppointmentAddress
  lat?: number
  lng?: number
}

type BookedAppointment = {
  start: Moment
  patient: {
    reference: string
    display: string
  }
  address?: LocationObject
}

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  appointmentContainerDiv: {
    margin: '0px 30px 0 30px',
  },
  bannerContainerDiv: {
    top: '0',
    right: '0',
    left: '0',
    position: 'relative',
    padding: '3.2rem',
    margin: '0 -30px 30px -30px',
    backgroundColor: '#FC9090',

    '& h2': {
      marginTop: '0',
    },
  },

  appointmentDateHeader: {
    color: '#FC9090',
    fontWeight: 'bold',
    marginTop: '30px',
  },
  appointmentInstructions: {
    marginTop: '30px',
  },
  logosDiv: {
    padding: '40px 30px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  logosDivSeparator: {
    width: '5px',
    borderRight: '2px #EEEEEE solid',
    margin: '0px 50px',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0px #EEEEEE solid',
      margin: '10px 5px',
    },
  },
  logo: {
    height: '50px',
    maxWidth: '200px',
  },
  qrCode: {
    margin: '3rem auto',
    textAlign: 'center',
  },
}))
export const Appointment: React.FunctionComponent<AppointmentProps> = ({
  token,
}: AppointmentProps) => {
  const classes = useStyles()
  const [appointment, setAppointment] = useState<BookedAppointment>()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const { t } = useTranslation()

  const getCodedLocation = (
    addressObject: ColumbiaAppointmentAddress,
  ): LocationObject => {
    let result: LocationObject = {
      addressObject,
    }
    result.address = `${addressObject.line.join(',')}, ${addressObject.city}, ${
      addressObject.state
    }  ${addressObject.postalCode}`

    return result
  }

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const appointmentsResponse = await UserService.getAppointments(token)
          if (isSubscribed && appointmentsResponse?.data?.items?.length > 0) {
            const appt = appointmentsResponse.data.items[0]
            if (appt.data.status === 'booked') {
              const patient = getInfoPiece(appt.data.participant, 'Patient')!
              const location = getInfoPiece(appt.data.participant, 'Location')
              const codedLocation = location?.address
                ? getCodedLocation(location?.address)
                : undefined

              const appointment: BookedAppointment = {
                start: moment(appt.data.start),
                patient,
                address: codedLocation,
              }
              setAppointment(appointment)
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

  const getInfoPiece = (
    participant: AppointmentParticipant[] | undefined,
    type: 'Patient' | 'Location',
  ) => {
    const result = participant?.find(item =>
      item.actor.reference.includes(`${type}/`),
    )
    return result?.actor
  }

  const renderAppointment = (appointment: BookedAppointment) => {
    const appointmentDateTime = appointment.start

    const reference = appointment.patient.reference.split('Patient/')[1]
    const friendlyAppointmentTimeStart = appointmentDateTime
      .locale(i18next.language)
      .format('h:mm a')
    const appointmentDateTimeEnd = appointment.start.clone().add(30, 'minutes')
    const friendlyAppointmentTimeEnd = appointmentDateTimeEnd
      .locale(i18next.language)
      .format('h:mm a')

    const isAppointmentMissed = appointmentDateTime.diff(moment(), 'd') < 0

    const appointmentHeader = (
      <h2 className="text-center">{t('appointment.title')}</h2>
    )

    const appointmentHeaderMissed = (
      <div className={classes.bannerContainerDiv}>
        <h2 className="text-center">{t('dashboard.intro.missedTitle')}</h2>
        <Trans i18nKey="dashboard.intro.missedText">
          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu"></a>
        </Trans>
      </div>
    )

    return (
      <Card className={classes.root} data-cy="page-appointment">
        <div className={classes.appointmentContainerDiv}>
          {isAppointmentMissed ? appointmentHeaderMissed : appointmentHeader}
          <p>{t('appointment.text1')}</p>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <div className={classes.appointmentDateHeader}>
                {t('appointment.text2')}
              </div>

              <div>
                {appointmentDateTime.locale(i18next.language).format('dddd')}
              </div>
              <div>
                <strong>
                  {appointmentDateTime
                    .locale(i18next.language)
                    .format('MMMM Do, YYYY')}
                </strong>
              </div>
              <div>
                <strong>
                  {friendlyAppointmentTimeStart} - {friendlyAppointmentTimeEnd}
                </strong>
              </div>
            </Grid>
          </Grid>
          {appointment.address?.address && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <div className={classes.appointmentDateHeader}>
                  {t('appointment.text3')}
                </div>
                {appointment.address.addressObject.line[0]
                  ? appointment.address.addressObject.line[0]
                  : ''}

                {appointment.address.addressObject.line[1] && (
                  <div>appointment.address.addressObject.line[1]</div>
                )}
                <div>
                  {`${appointment.address.addressObject.city}, ${appointment.address.addressObject.state} ${appointment.address.addressObject.postalCode}`}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    appointment.address.address,
                  )}`}
                  target="_blank"
                >
                  {t('appointment.text4')}
                </a>
              </Grid>
            </Grid>
          )}
          <div className={classes.appointmentInstructions}>
            <Trans i18nKey="appointment.text5">
              <p>[translation]</p>
              <p>[translation]</p>
            </Trans>
            <div className={classes.qrCode}>
              <QRCode value={reference || ''} />
            </div>
            <Trans i18nKey="appointment.text6">
              <p>[translation] </p>
              <p>
                [translation]
                <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
                  [translation]
                </a>
              </p>
            </Trans>
          </div>

          <div className={classes.logosDiv}>
            <ColumbiaLogo className={classes.logo} />
            <div className={classes.logosDivSeparator}></div>
            <SageLogo className={classes.logo} />
          </div>
        </div>
      </Card>
    )
  }

  return <div>{appointment && <div>{renderAppointment(appointment)}</div>}</div>
}

export default Appointment
