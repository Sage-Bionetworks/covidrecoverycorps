import React, { useState, ChangeEvent } from 'react'

import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ConsentInfo from './ConsentInfo'

import useForm from '../useForm'
import { getAge, getMomentDate, callEndpoint } from '../../helpers/utility'
import moment from 'moment'
import {
  ENDPOINT,
  SHARE_SCOPE_PARTNERS,
  SHARE_SCOPE_ALL,
  SUBPOP_GUID,
} from '../../types/types'

import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import ConsentEHR from './ConsentEHR'
import ConsentCopy from './ConsentCopy'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import { Redirect } from 'react-router-dom'
import Nav from '../Nav'
import { SizeMe } from 'react-sizeme'

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
  const [doHIPAAConsent, setDoHIPAAConsent] = useState<boolean | undefined>(undefined)
  const [isLearnMore, setIsLearnMore] = useState([false, false])

  const [error, setError] = useState('')

  const stateSchema = {
    agree: { value: '', error: '' },
    shareAll: { value: '', error: '' },
    fullName: { value: '', error: '' },
    dob: { value: '', error: '' },
  }

  const validationStateSchema = {
    agree: {
      required: true,
    },
    shareAll: {},

    fullName: {
      required: true,
    },
  }

  async function onSubmitForm(state: any) {
    let isValid = true

    const data = {
      name: state.fullName.value,

      scope: state.shareAll ? SHARE_SCOPE_ALL : SHARE_SCOPE_PARTNERS,
      signedOn: moment().toLocaleString(),
    }
    try {
      setError('')
      const result = await callEndpoint(
        `${ENDPOINT}/v3/subpopulations/${SUBPOP_GUID}/consents/signature`,
        'POST',
        data,
        token
      )

      setIsConsentDone(true)
     // if (setConsentFn) {
        //setConsentFn(result.ok)
      //}
    } catch (e) {
      setError(e.message)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  )

  const checkboxChange = (_name: string) => {
    handleOnChange({
      target: { name: _name, value: !state[_name].value },
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
          Reviews what it means
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
    if (doHIPAAConsent===false) {
 
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
        <SizeMe >
      {({ size }) => (
        <div>
              <Nav width={size.width}>Consent Signature</Nav>
              </div>
      )}</SizeMe>
          <p>
            If you understand and agree to the benefits &amp; risk of
            participating in this study. Please sign below.
          </p>
          <div className="Consent__inset">
            <p>I know and agree that:</p>
            <div style={{marginLeft: "2rem"}}>
            <ConsentCopy screen="INTRO"></ConsentCopy></div>
           <p> Please check the box below if you agree to take part:</p>
            <form className="Consent__form" onSubmit={handleOnSubmit}>
              <div
                className="form-group checkbox--indented"
               
              >
                <Checkbox
                  color="primary"
                  style={{ paddingTop: '3px' }}
                  value={state.shareAll.value}
                  onChange={(val) => checkboxChange('shareAll')}
                />
                <div>
                  <p>
                    "Share my data with this study as well as other qualified
                    researchers <strong>for future research </strong> on COVID
                    related work "
                  </p>

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
                </div>
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
              <div
                className="form-group checkbox--indented"
               
              >
                <Checkbox
                  color="primary"
                  style={{ paddingTop: '3px' }}
                  value={state.agree.value}
                  onChange={(val) => checkboxChange('agree')}
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
              <div className="form-group" style={{marginTop: "4rem"}}>
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
              <div className="twoButtons"
              >
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
