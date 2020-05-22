import React, { useState, useEffect, ChangeEvent } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ConsentInfo from './ConsentInfo'
import useForm from '../useForm'
import moment from 'moment'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  CircularProgress,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import ConsentCopy from './ConsentCopy'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import { Redirect } from 'react-router-dom'
import FloatingToolbar from '../widgets/FloatingToolbar'
import { ConsentService } from '../../services/consent.service'
import ConfirmationModal from '../widgets/ConfirmationModal'
import LearnMore from '../widgets/LearnMore'
import { setSession, getSession } from '../../helpers/utility'
import ConsentSentConfirmation from './ConsentSentConfirmation'
import { UserService } from '../../services/user.service'

export type ConsentProps = {
  token: string
  setConsentFn?: Function
}

export const Consent: React.FunctionComponent<ConsentProps> = ({
  token,
}: ConsentProps) => {
  const [isInfoDone, setIsInfoDone] = useState(false)
  const [isConsentDone, setIsConsentDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isConsentConfirmationShown, setConsentConfirmationShown] = useState(
    false,
  )
  const [doHIPAAConsent, setDoHIPAAConsent] = useState<string | undefined>(
    undefined,
  )

  const [error, setError] = useState('')

  const stateSchema = {
    agree: { value: '', error: '' },
    shareScope: { value: '', error: '' },
    fullName: { value: '', error: '' },
    dob: { value: '', error: '' },
  }

  const validationStateSchema = {
    agree: {
      required: true,
    },
    shareScope: {
      required: true,
    },

    fullName: {
      required: true,
    },
  }

  //if the user is already consented -- do not take them through the flow
  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfo = await UserService.getUserInfo(token)
          if (userInfo.data.consented) {
            setDoHIPAAConsent('false')
            setIsConsentDone(true)
          }
        } catch (e) {
          setError(e)
        } finally {
          setIsLoading(false)
        }
      }
    }
    getInfo(token)
    return () => {
      isSubscribed = false
    }
  }, [token])

  async function onSubmitForm(state: any) {
    try {
      setError('')
      const result = await ConsentService.signGeneralConsent(
        state.fullName.value,
        state.shareScope.value,
        token,
      )
      setSession(token, getSession()?.name || '', true)
      setIsConsentDone(true)
    } catch (e) {
      setError(e.message)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  const checkboxChange = (_name: string, checked: boolean) => {
    handleOnChange({
      target: { name: _name, value: checked },
    })
  }

  const renderHIPAAStep = (): JSX.Element => {
    const element = (
      <div>
        <h2> Do you want to share your electronic health records with us?</h2>
        <p>
          Sharing your EHR (electronic health records) is{' '}
          <strong>optional</strong>.{' '}
        </p>

        <LearnMore learnMoreText="Review what it means">
          <div>
            <p>
              Your electronic health record (EHR) is a digital version of your
              medical health record (which may include information like your
              doctor’s notes from visits, diagnosis information and
              medications).{' '}
            </p>
            <p>
              If you say yes to sharing, we will see data about your health
              problems, test results, medical procedures, images (such as
              X-rays), and medicines you take.
            </p>
            <p>
              It may tell us about your mental health, genetic conditions, or
              use of alcohol or drugs. EHR may contain sexual or infection data,
              including HIV status. You can say no to sharing your health
              records and still take part in COVID Recovery Corps.
            </p>
            <p>
              There will be a separate form called a HIPAA Authorization for you
              to sign if you decide to give us access to your health records.
            </p>
          </div>
        </LearnMore>

        <div className="radiobuttons">
          <RadioGroup
            aria-label="start HIPAA consent"
            name="startHIPAAConsent"
            onChange={(_event: any, val: string) => setDoHIPAAConsent(val)}
          >
            <FormControlLabel
              value={'true'}
              control={<Radio color="primary" />}
              label="Yes, share"
            />

            <FormControlLabel
              value={'false'}
              control={<Radio color="primary" />}
              label="No, don't share"
            />
          </RadioGroup>
        </div>

        <Button
          className="pull-right"
          type="button"
          fullWidth
          disabled={doHIPAAConsent === undefined}
          style={{ margin: '30px 0' }}
          variant="contained"
          color="primary"
          onClick={() => setIsConsentDone(true)}
        >
          Submit
        </Button>
      </div>
    )
    return element
  }

  if (isConsentDone) {
    if (doHIPAAConsent === 'true') {
      return <Redirect to="consentehr"></Redirect>
    }
    if (doHIPAAConsent === 'false') {
      return <Redirect to="dashboard?consented=true"></Redirect>
    }
  }

  return (
    <Card>
      <CardContent>
        {isLoading && (
          <div className="text-center">
            <CircularProgress color="primary" />
          </div>
        )}
        {!isLoading && (
          <div className="Consent">
            {!isInfoDone && (
              <ConsentInfo onDone={() => setIsInfoDone(true)}></ConsentInfo>
            )}
            {isInfoDone && !isConsentDone && (
              <>
                <div>
                  <FloatingToolbar
                    closeLinkDestination="/home?alert=CANCELLED_CONSENT"
                    closeLinkText=""
                    closeConfirmationText="Are you sure you want to leave the consent process?"
                  >
                    Consent Signature
                  </FloatingToolbar>
                </div>

                <ConsentCopy screen={'CONSENT_SIGNATURE1'}></ConsentCopy>
                <p>I understand and agree to the following:</p>
                <div
                  className="margin-top-std"
                  style={{ marginLeft: '4rem', marginBottom: '4rem' }}
                >
                  <ConsentCopy screen={'CONSENT_SIGNATURE2'}></ConsentCopy>
                </div>

                <div
                  style={{
                    marginTop: '2rem',
                  }}
                >
                  <ConsentCopy screen={'CONSENT_SHARING'}></ConsentCopy>
                </div>
                <LearnMore learnMoreText="Learn more">
                  <div>
                    <p>
                      You will have the opportunity to share your data with
                      qualified researchers outside of the COVID Recovery Corps.
                      All qualified researchers must be approved by the COVID
                      Recovery Corps study team and will only use de-identified
                      data. This de-identified data does not contain identifiers
                      like name, date of birth, or zip code. These researchers
                      may be from outside the United States and may work for a
                      non-profit institution, commercial drug or medical device
                      companies, or be a private citizen.
                    </p>
                    <p>
                      Sharing your data with qualified researchers is optional
                      and you can change your mind at any time by updating your
                      data sharing options in your profile. But once we share
                      your data we cannot get it back. If you decide to end data
                      sharing, we will not share your future data.
                    </p>
                  </div>
                </LearnMore>
                <form className="Consent__form" onSubmit={handleOnSubmit}>
                  <div className="radiobuttons">
                    <RadioGroup
                      aria-label="sharing"
                      name="shareScope"
                      value={state.shareScope.value}
                      onChange={handleOnChange}
                    >
                      <FormControlLabel
                        value={ConsentService.SHARE_SCOPE_ALL}
                        control={<Radio color="primary" />}
                        style={{ marginBottom: '4rem' }}
                        label="Yes, share my study data with qualified researchers for future COVID related work."
                      />

                      <FormControlLabel
                        value={ConsentService.SHARE_SCOPE_PARTNERS}
                        control={<Radio color="primary" />}
                        label="No, only use my study data for this (COVID Recovery Corps) study only."
                      />
                    </RadioGroup>
                    <div
                      style={{
                        marginTop: '2rem',
                        marginBottom: '4rem',
                      }}
                    >
                      <p>
                        By default, you are sharing your data with this study
                        only.
                      </p>
                    </div>
                  </div>
                  <p
                    className="margin-top-std"
                    style={{ marginBottom: '4rem' }}
                  >
                    Please check the box below if you agree to take part:
                  </p>
                  <div
                    className="form-group checkbox--indented"
                    style={{ marginLeft: '0px' }}
                  >
                    <Checkbox
                      color="primary"
                      style={{ paddingTop: '3px' }}
                      value={state.agree.value}
                      onChange={(val, checked) =>
                        checkboxChange('agree', checked)
                      }
                    />
                    <p>
                      <strong>
                        {' '}
                        I have read this consent form (or someone read it to
                        me). I understand the information in this form. All of
                        my questions have been answered. I freely and willingly
                        choose to take part in COVID Recovery Corps study.
                      </strong>
                    </p>
                  </div>
                  <p>{moment().format('MMMM Do, YYYY')}</p>
                  <div className="form-group" style={{ marginTop: '4rem' }}>
                    <TextField
                      label="Full Name of adult participant:"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleOnChange}
                      value={state.fullName.value}
                      name="fullName"
                      variant="outlined"
                    />
                  </div>
                  {error && <Alert severity="error">{error}</Alert>}
                  {Object.keys(state).map(
                    key =>
                      state[key].error && (
                        <Alert severity="error">{state[key].error}</Alert>
                      ),
                  )}
                  <div className="buttons--action">
                    <Button
                      type="submit"
                      fullWidth
                      disabled={disable}
                      variant="contained"
                      color="primary"
                    >
                      Agree
                    </Button>
                  </div>
                </form>
              </>
            )}
            {isConsentDone && !isConsentConfirmationShown && (
              <ConsentSentConfirmation
                type="CONSENT"
                doneCallbackFn={() => setConsentConfirmationShown(true)}
              ></ConsentSentConfirmation>
            )}
            {isConsentDone && isConsentConfirmationShown && renderHIPAAStep()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Consent
