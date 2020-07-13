import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Card } from '@material-ui/core'
import {
  AppointmentParticipant,
  ColumbiaAppointmentAddress,
  GoogleAPIKey,
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
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'

//agendel TODO: remove once we get correct data from Columbia
const fakeGeocodingResponse = {
  results: [
    {
      address_components: [
        { long_name: '330', short_name: '330', types: ['subpremise'] },
        { long_name: '2901', short_name: '2901', types: ['street_number'] },
        { long_name: '3rd Avenue', short_name: '3rd Ave', types: ['route'] },
        {
          long_name: 'Downtown Seattle',
          short_name: 'Downtown Seattle',
          types: ['neighborhood', 'political'],
        },
        {
          long_name: 'Seattle',
          short_name: 'Seattle',
          types: ['locality', 'political'],
        },
        {
          long_name: 'King County',
          short_name: 'King County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Washington',
          short_name: 'WA',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
        { long_name: '98121', short_name: '98121', types: ['postal_code'] },
      ],
      formatted_address: '2901 3rd Ave #330, Seattle, WA 98121, USA',
      geometry: {
        bounds: {
          northeast: { lat: 47.6184148, lng: -122.3510372 },
          southwest: { lat: 47.617759, lng: -122.3525807 },
        },
        location: { lat: 47.6180007, lng: -122.3516149 },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: { lat: 47.6194358802915, lng: -122.3504599697085 },
          southwest: { lat: 47.6167379197085, lng: -122.3531579302915 },
        },
      },
      place_id:
        'EikyOTAxIDNyZCBBdmUgIzMzMCwgU2VhdHRsZSwgV0EgOTgxMjEsIFVTQSIfGh0KFgoUChIJidPohE8VkFQRVpUgA1LwJYcSAzMzMA',
      types: ['subpremise'],
    },
  ],
  status: 'OK',
}

const MarkerComponent = ({ text }: any) => (
  <div>
    <MapMarker />
    <div style={{ width: '100px', fontSize: '1.2rem', textAlign: 'center' }}>
      {text}
    </div>
  </div>
)

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

Geocode.setApiKey(GoogleAPIKey)
Geocode.enableDebug()

// set response language. Defaults to english.
Geocode.setLanguage(i18next.language)

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
  appointmentContainerDiv: {
    margin: '0px 30px 0 30px',
  },
  mapContainerDiv: {
    height: '400px',
    margin: '0 -30px 0 -30px',
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
    geocodedAddressObject?: GeocodedColumbiaAppointmentAddress,
  ): LocationObject => {
    let result: LocationObject = {
      addressObject,
    }
    const geocodedResult =
      geocodedAddressObject?.status === 'OK' &&
      geocodedAddressObject?.results?.length > 0
        ? geocodedAddressObject?.results[0]
        : null

    if (!geocodedResult) {
      //if no geocoded result -- just return what we get from Columbia
      const address = `${addressObject.line.join(',')}, ${
        addressObject.city
      }, ${addressObject.state}  ${addressObject.postalCode}`
      result.address = address

      return result
    }

    const { lat, lng } = geocodedResult.geometry.location
    result = {
      lat,
      lng,
      addressObject,
      address: geocodedResult.formatted_address,
    }

    return result
  }

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
              const patient = getInfoPiece(appt.data.participant, 'Patient')!
              const location = getInfoPiece(appt.data.participant, 'Location')
              const codedLocation = location?.address
                ? await getCodedLocation(location?.address, location?.geocoding)
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
    const appointmentDateTimeEnd = appointment.start.add(30, 'minutes')
    const friendlyAppointmentTimeEnd = appointmentDateTimeEnd
      .locale(i18next.language)
      .format('h:mm a')

    return (
      <Card className={classes.root}>
        <div className={classes.appointmentContainerDiv}>
          <h2 className="text-center">{t('appointment.title')}</h2>
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
          {appointment.address?.lat !== undefined && (
            <div className={classes.mapContainerDiv}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: GoogleAPIKey }}
                defaultCenter={{
                  lat: appointment.address!.lat!,
                  lng: appointment.address.lng!,
                }}
                defaultZoom={11}
              >
                <MarkerComponent
                  lat={appointment.address!.lat!}
                  lng={appointment.address!.lng}
                  text={appointment.address.addressObject.line[0]}
                />
              </GoogleMapReact>
            </div>
          )}
        </div>
      </Card>
    )
  }

  return <div>{appointment && <div>{renderAppointment(appointment)}</div>}</div>
}

export default Appointment
