import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Card } from '@material-ui/core'
import { ReportData } from '../../types/types'
import moment from 'moment'
import { UserService } from '../../services/user.service'

type AppointmentProps = {
  token?: string
}

export const useStyles = makeStyles(theme => ({
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
  },
}))
export const Appointment: React.FunctionComponent<AppointmentProps> = ({
  token,
}: AppointmentProps) => {
  const classes = useStyles()
  const [appointment, setAppointment] = useState<ReportData>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const appointmentsResponse = await UserService.getAppointments(token)
          if (appointmentsResponse?.data?.items?.length > 0) {
            const appt = appointmentsResponse.data.items[0]
            if (appt.data.status === 'booked') {
              setAppointment(appt)
            }
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

  return (
    <div>
      {appointment && (
          <div>{renderAppointment(appointment)}</div>
      )}
    </div>
  )
}

export default Appointment
