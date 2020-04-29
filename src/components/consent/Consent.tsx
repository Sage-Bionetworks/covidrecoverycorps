import React, { useState, ChangeEvent } from 'react'
import { faCaretUp, faFileExcel } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConsentInfo from './ConsentInfo'

import { FormControl, FormCheck } from 'react-bootstrap'
import useForm from '../useForm'
import { getAge, getMomentDate, callEndpoint } from '../../helpers/utility'
import moment from 'moment'
import { ENDPOINT, SHARE_SCOPE, SUBPOP_GUID } from '../../types/types'
import { Redirect } from 'react-router'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import { Checkbox, FormControlLabel } from '@material-ui/core'

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

  const stateSchema = {
    agree: { value: '', error: '' },

    fullName: { value: '', error: '' },
  }

  const validationStateSchema = {
    agree: {
      required: true,
    },

    fullName: {
      required: true,
    },
  }

  async function onSubmitForm(state: any) {
    let isValid = true
    const age = getAge(
      state.birthyear?.value,
      state.birthmonth?.value,
      state.birthday?.value
    )
    if (age < 18) {
      isValid = false
      return
    }

    const data = {
      name: state.fullName.value,

      scope: SHARE_SCOPE,
      signedOn: moment().toLocaleString(),
    }
    console.log('about to call end point')
    const result = await callEndpoint(
      `${ENDPOINT}/v3/subpopulations/${SUBPOP_GUID}/consents/signature`,
      'POST',
      data,
      token
    )
    // alert(JSON.stringify(result, null, 2))
    setIsConsentDone(true)
    if (setConsentFn) {
      //setConsentFn(result.ok)
    }
    // return result
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  )

  const checkboxChange = () => {
    handleOnChange({
      target: { name: 'agree', value: !state.agree.value },
    })
  }

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
      {!isInfoDone && !isConsentDone && (
        <div>
          <p>
            If you understand and agree to the benefits &amp; risk of
            participating in this study. Please sign below.
          </p>
          <p>I know and agree that:</p>
          <MarkdownSynapse ownerId="syn21985841" wikiId="602371" />
          Please check the box below if you agree to take part:
          <form className="Consent__form" onSubmit={handleOnSubmit}>
            <div className="form-group">
              <FormControlLabel
                control={
                  <Checkbox
                    value={state.agree.value}
                    onChange={(val) => checkboxChange()}
                  />
                }
                label="I have read this consent form (or someone read it to me).
            I understand the information in this form. All of my
            questions have been answered. I freely and willingly
            choose to take part in NY Strong."
              />
            </div>
            <p>{moment().format('MMMM Do, YYYY')}</p>
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

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
      {isConsentDone && (
        <>
          <button className="btn">Next</button>
        </>
      )}
    </div>
  )
}

export default Consent
