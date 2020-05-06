import React, { useState, useEffect, ChangeEvent } from 'react'

import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ConsentInfo from './ConsentInfo'

import useForm from '../useForm'
import moment from 'moment'


import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'

import ConsentCopy from './ConsentCopy'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import { Redirect } from 'react-router-dom'
import FloatingToolbar from '../widgets/FloatingToolbar'
import { ConsentService } from '../../services/consent.service'
import ConfirmationModal from '../widgets/ConfirmationModal'

export type ConsentProps = {
  token: string
  setConsentFn?: Function
  name: string
}

export const Consent: React.FunctionComponent<ConsentProps> = ({
  token,
  setConsentFn,
  name,
}: ConsentProps) => {
  const [isInfoDone, setIsInfoDone] = useState(false)
  const [isConsentDone, setIsConsentDone] = useState(false)
  const [doHIPAAConsent, setDoHIPAAConsent] = useState<boolean | undefined>(
    undefined
  )
  const [isLearnMore, setIsLearnMore] = useState([false, false])
  const [isShowingCancelConfirmation, setIsShowingCancelConfirmation] = useState(false)
  const [isConsentCanceled, setIsConsentCancelled] = useState(false)

  // indicate that the user consented during this session (used in Dashboard.tsx)
  useEffect(() => {
    sessionStorage.setItem('consented', isConsentDone.toString());
  }, [isConsentDone]);

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

  async function onSubmitForm(state: any) {
    try {
      setError('')
      const result = await ConsentService.signGeneralConsent(
        state.fullName.value,
        state.shareScope.value,
        token
      )
      setIsConsentDone(true)
    } catch (e) {
      setError(e.message)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  )

  const checkboxChange = (_name: string, checked: boolean) => {
    handleOnChange({
      target: { name: _name, value: checked },
    })
  }

  const updateIsLearnMore = (index: number, value: boolean) => {
    setIsLearnMore((prev) =>
      prev.map((item, _index) => (index === index ? value : item))
    )
  }

  const renderHIPAAStep = (): JSX.Element => {
    const element = (
      <div>
        <h2> Do you want to share your electronic health records with us?</h2>
        <p>Sharing your EHR (electronic health records) is optional </p>

        <div
          className="learnLessToggle"
          style={{
            display: isLearnMore[1] ? 'flex' : 'none',
          }}
        >
          <p>
            some text about learning some text about learning some text about
            learning
            <br /> more about <br />
            reserch sharing
          </p>
          <button onClick={() => updateIsLearnMore(1, false)}>
            <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
          </button>
        </div>
        <div
          onClick={() => updateIsLearnMore(1, true)}
          className="learnMoreToggle"
          style={{
            display: isLearnMore[1] ? 'none' : 'flex',
          }}
        >
          Review what it means
          <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
        </div>

        <ToggleButtonGroup
          value={doHIPAAConsent}
          exclusive
          className="verticalToggle"
          style={{ marginTop: '20px', marginBottom: '20px' }}
          onChange={(_event: any, val: boolean) => setDoHIPAAConsent(val)}
          aria-label="are you over 18"
        >
          ><ToggleButton value={true}>Yes</ToggleButton>
          <ToggleButton value={false}>No</ToggleButton>
        </ToggleButtonGroup>

        <Button
          className="pull-right"
          type="button"
          disabled={doHIPAAConsent === undefined}
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
    if (doHIPAAConsent) {
      return <Redirect to="consentehr"></Redirect>
    }
    if (doHIPAAConsent === false) {
      return <Redirect to="dashboard"></Redirect>
    }
  }

  if (isConsentCanceled) {
    return <Redirect to="home"></Redirect>
  }
  return (
    <div className="Consent">
      {!isInfoDone && (
        <ConsentInfo
          name={name}
          onDone={() => setIsInfoDone(true)}
        ></ConsentInfo>
      )}
      {isInfoDone && !isConsentDone && (
        <>
          <div>
            <FloatingToolbar>Consent Signature</FloatingToolbar>
          </div>

          <ConsentCopy screen={'CONSENT_SIGNATURE1'}></ConsentCopy>
          <p>I understand and agree to the following:</p>
          <div style={{ marginLeft: '4rem', marginBottom: '4rem', marginTop: '4rem'  }}>
            <ConsentCopy screen={'CONSENT_SIGNATURE2'}></ConsentCopy>
           </div>

      
            <div
              style={{
                marginTop: '2rem',
              }}
            >
              <ConsentCopy screen={'CONSENT_SHARING'}></ConsentCopy>
            </div>
          <div
            onClick={() => updateIsLearnMore(0, true)}
            className="learnMoreToggle"
            style={{
              display: isLearnMore[0] ? 'none' : 'block',
              marginBottom: '4rem',
            }}
          >
            <div>
              <span style={{ paddingRight: "10px" }}>Learn More</span>
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </div>
          </div>
          <div
            className="learnLessToggle"
            style={{
              display: isLearnMore[0] ? 'flex' : 'none',
              marginBottom: '4rem',
            }}
          >
            <div>
              <p>
                You will have the opportunity to share your data with qualified researchers outside of the COVID Recovery Corps. All qualified researchers must be approved by the COVID Recovery Corps study team and will only use de-identified data. This de-identified data does not contain identifiers like name, date of birth, or zip code. These researchers may be from outside the United States and may work for a non-profit institution, commercial drug or medical device companies, or be a private citizen.
              </p>
              <p>
                Sharing your data with qualified researchers is optional and you can change your mind at any time by updating your data sharing options in your profile. But once we share your data we cannot get it back. If you decide to end data sharing, we will not share your future data.
              </p>
            </div>
            <button onClick={() => updateIsLearnMore(0, false)}>
              <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
            </button>
          </div>
            <form className="Consent__form" onSubmit={handleOnSubmit} >
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
                  <p>By default, you are sharing your data with this study only.</p>
                </div>
              </div>
              <p style={{marginTop: "4rem", marginBottom: "4rem"}}>Please check the box below if you agree to take part:</p>
              <div className="form-group checkbox--indented" style={{marginLeft:"0px"}}>
                <Checkbox
                  color="primary"
                  style={{ paddingTop: '3px' }}
                  value={state.agree.value}
                  onChange={(val, checked) => checkboxChange('agree', checked)}
                />
                <p>
                  I have <b>read</b> this consent form (or someone read it to
                  me). I understand the information in this form. All of my
                  questions have been answered. I{' '}
                  <strong>freely and willingly</strong> choose to take part in
                  COVID Recovery Corps study."
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
                (key) =>
                  state[key].error && (
                    <Alert severity="error">{state[key].error}</Alert>
                  )
              )}
              <div className="buttons--action">
                <Button
                  onClick={() => setIsShowingCancelConfirmation(true)}
                  variant="outlined"
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  type="submit"
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
      {isConsentDone && renderHIPAAStep()}
      {isShowingCancelConfirmation && (
          <ConfirmationModal
            show={true}
            topSecondaryCopy={'Sometimes people press things on accident, so we wanted to check...'}
            mainCopy={<div>Are you sure, you want to <strong>cancel</strong> your <strong>consent form</strong>?</div>}
            onCancel={() => 
              // hide cancel confirmation
              setIsShowingCancelConfirmation(false)
            }
            onOK={() =>
              // redirect back to home
              setIsConsentCancelled(true)
            }
            confirmCopy={'Yes, please cancel'}
            cancelCopy={'No, take me back'}
          ></ConfirmationModal>
        )}
    </div>
  )
}

export default Consent
