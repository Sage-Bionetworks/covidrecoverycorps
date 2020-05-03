import React, { useState, ChangeEvent } from 'react'

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
          <p>I know and agree that:</p>
          <div style={{ marginLeft: '4rem' }}>
            <ConsentCopy screen={'CONSENT_SIGNATURE2'}></ConsentCopy>
            <div className="Consent__inset"></div>

            <p>&nbsp;</p>
            <div
              style={{
                marginTop: '2rem',
                marginLeft: '-8rem',
                marginBottom: '4rem',
              }}
            >
              <ConsentCopy screen={'CONSENT_SHARING'}></ConsentCopy>
            </div>

            <form className="Consent__form" onSubmit={handleOnSubmit}>
              <FormControl component="fieldset">
                <FormLabel component="legend">PLEASE SELECT ONE</FormLabel>
                <RadioGroup
                  aria-label="sharing"
                  name="shareScope"
                  value={state.shareScope.value}
                  onChange={handleOnChange}
                >
                  <FormControlLabel
                    value={ConsentService.SHARE_SCOPE_ALL}
                    control={<Radio color="primary" />}
                    label="Yes, share with my study data with qualified researchers for future COVID related work."
                  />
                  <FormControlLabel
                    value={ConsentService.SHARE_SCOPE_PARTNERS}
                    control={<Radio color="primary" />}
                    label="No, only use my study data for this study only."
                  />
                </RadioGroup>
              </FormControl>

              <p></p>

              <div
                onClick={() => updateIsLearnMore(0, true)}
                className="learnMoreToggle"
                style={{
                  display: isLearnMore[0] ? 'none' : 'flex',
                }}
              >
                Learn More
                <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
              </div>

              <div
                className="learnLessToggle"
                style={{
                  display: isLearnMore[0] ? 'flex' : 'none',
                }}
              >
                <p>
                  some text about learning some text about learning some text
                  about learning
                  <br /> more about <br />
                  reserch sharing
                </p>
                <button onClick={() => updateIsLearnMore(0, false)}>
                  <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
                </button>
              </div>
              <div className="form-group checkbox--indented">
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
                  NY Strong."
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
                  onClick={() => alert('todo')}
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
          </div>
        </>
      )}
      {isConsentDone && renderHIPAAStep()}
    </div>
  )
}

export default Consent
