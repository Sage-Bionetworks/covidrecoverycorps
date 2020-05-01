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
  const [isLearnMore, setIsLearnMore] = useState(false)
  const [error, setError]= useState('')

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
  try{
    setError('')
    const result = await callEndpoint(
      `${ENDPOINT}/v3/subpopulations/${SUBPOP_GUID}/consents/signature`,
      'POST',
      data,
      token
    )

    setIsConsentDone(true)
    if (setConsentFn) {
      //setConsentFn(result.ok)
    }}
    catch(e) {

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


  /*if (isConsentDone) {
    return <Redirect to="Dashboard"></Redirect>
  }*/

  return (
    <div className="Consent">
     
      {!isInfoDone && (
        <div className="Consent__info">
          <ConsentInfo
            name={name}
            onDone={() => setIsInfoDone(true)}
          ></ConsentInfo>
        </div>
      )}
      {isInfoDone && !isConsentDone && (
        <div>
          <p>
            If you understand and agree to the benefits &amp; risk of
            participating in this study. Please sign below.
          </p>
          <p>I know and agree that:</p>
         <ConsentCopy  screen="INTRO" ></ConsentCopy>
          Please check the box below if you agree to take part:
          <form className="Consent__form" onSubmit={handleOnSubmit}>
            <div
              className="form-group"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                paddingTop: '16px',
              }}
            >
              <Checkbox
                color="primary"
                style={{ paddingTop: '3px' }}
                value={state.shareAll.value}
                onChange={(val) => checkboxChange('shareAll')}
              />

              <p>
                "Share my data with this study as well as other qualified
                researchers <strong>for future research </strong> on COVID
                related work "
              </p>
            </div>

            <div
              style={{
                display: isLearnMore ? 'flex' : 'none',
                borderBottom: '1px solid #ddd',

                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <p>
                some text about learning
                <br /> more about <br />
                reserch sharing
              </p>
              <Button
                style={{ float: 'right' }}
                onClick={() => setIsLearnMore(false)}
              >
                <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
              </Button>
            </div>
            <div
              style={{
                display: isLearnMore ? 'none' : 'block',
                borderBottom: '1px solid #ddd',
              }}
            >
              Learn More
              <Button
                style={{ float: 'right' }}
                onClick={() => setIsLearnMore(true)}
              >
                <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
              </Button>
            </div>

            <div
              className="form-group"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                paddingTop: '16px',
                marginLeft: '-40px',
              }}
            >
              <Checkbox
                color="primary"
                style={{ paddingTop: '3px' }}
                value={state.agree.value}
                onChange={(val) => checkboxChange('agree')}
              />
              <p>
                I have <b>read</b> this consent form (or someone read it to me).
                I understand the information in this form. All of my questions
                have been answered. I <strong>freely and willingly</strong>{' '}
                choose to take part in NY Strong."
              </p>
            </div>
            <p>{moment().format('MMMM Do, YYYY')}</p>
            <div className="form-group">
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
            <div style={{ display: 'flex', justifyContent: 'space-between' , paddingTop: "20px"}}>
              <Button
                onClick={() => alert('todo')}
                variant="contained"
                color="default"
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
          {Object.keys(state).map(
            (key) =>
              state[key].error && <p className="error">{state[key].error}</p>
          )}
        </div>
      )}
      {/*isConsentDone && (
        <>
          <h1>Thank you</h1>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() =>
             // window.history.pushState('', 'Dashboard', '/dashboard')
            }
          >
            Continue
          </Button>
        </>
      )*/}
      {isConsentDone && <ConsentEHR></ConsentEHR>}
    </div>
  )
}

export default Consent
