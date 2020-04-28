import React, { useState, ChangeEvent } from 'react'
import { faCaretUp, faFileExcel } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConsentInfo from './ConsentInfo'

import { FormControl, FormCheck } from 'react-bootstrap'
import useForm from '../useForm'
import { getAge, getMomentDate, callEndpoint } from '../utility'
import moment from 'moment'
import { ENDPOINT, SHARE_SCOPE, SUBPOP_GUID } from '../types'
import { Redirect } from 'react-router'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import Button from '@material-ui/core/Button/Button'

export type ConsentProps = {
  token: string
  setConsentFn?: Function
  name: string
}

export const Consent: React.FunctionComponent<ConsentProps> = ({
  token,
  setConsentFn,
  name
}: ConsentProps) => {
  const [isInfoDone, setIsInfoDone] = useState(false)
  const [isConsentDone, setIsConsentDone] = useState(false)

  const stateSchema = {
    agree: { value: '', error: '' },
    birthyear: { value: '', error: '' },
    birthmonth: { value: '', error: '' },
    birthday: { value: '', error: '' },
    fullName: { value: '', error: '' }
  }

  const validationStateSchema = {
    agree: {
      required: true
    },
    birthyear: {
      required: true,
      validator: {
        regEx: /^\d{4}$/,
        fn: (value: string) => {
          return Number(value) > 1900 && Number(value) < 2020
        },
        error: 'Invalid Birth Year'
      }
    },
    birthday: {
      required: true,
      validator: {
        regEx: /^\d{1,2}$/,
        error: 'Invalid Birth Day',
        fn: (value: string) => {
          return Number(value) > 0 && Number(value) < 32
        }
      }
    },
    birthmonth: {
      required: true,
      validator: {
        regEx: /^\d{1,2}$/,
        error: 'Invalid Birth Month',
        fn: (value: string) => {
          return Number(value) > 0 && Number(value) < 13
        }
      }
    },

    fullName: {
      required: true
    }
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
    const birthday = getMomentDate(
      state.birthyear?.value,
      state.birthmonth?.value,
      state.birthday?.value
    )!.format('YYYY-MM-DD')
    const data = {
      name: state.fullName.value,
      birthdate: birthday,
      scope: SHARE_SCOPE,
      signedOn: moment().toLocaleString()
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

  const isValid = (state: any, disable: boolean) => {
    if (disable) {
      return false
    }
    let date = getMomentDate(
      state.birthyear?.value,
      state.birthmonth?.value,
      state.birthday?.value
    )

    const dateValid = moment(date).isValid()
    if (!dateValid) {
      state.birthyear.error = 'Date is invalid'
    } else {
      state.birthyear.error = ''
    }

    return dateValid
  }

  const checkboxChange = () => {
    handleOnChange({
      target: { name: 'agree', value: !state.agree.value }
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
      {isInfoDone && !isConsentDone && (
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
              <div className="checkbox">
                <label>
                  <span>
                    <input
                      type="checkbox"
                      id="none"
                      onChange={val => checkboxChange()}
                      value={state.agree.value}
                    />
                    <span>
                      I have read this consent form (or someone read it to me).
                      I understand the information in this form. All of my
                      questions have been answered. I freely and willingly
                      choose to take part in NY Strong."
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="birthyear">What is your date of birth</label>

              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="birthmonth"
                  onChange={handleOnChange}
                  value={state.birthmonth.value}
                  placeholder="Month"
                />
                <span className="input-group-addon">/</span>
                <input
                  type="number"
                  className="form-control"
                  name="birthday"
                  onChange={handleOnChange}
                  value={state.birthday.value}
                  placeholder="Day"
                />
                <span className="input-group-addon">/</span>
                <input
                  type="number"
                  className="form-control"
                  name="birthyear"
                  onChange={handleOnChange}
                  value={state.birthyear.value}
                  placeholder="Year"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <FormControl
                name="fullName"
                className="form-control"
                type="text"
                placeholder="Please enter your full legal name"
                aria-label="fullName"
                onChange={handleOnChange}
                value={state.fullName.value}
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between',}}>
            <Button onClick={()=> alert('todo')} variant="contained" color="default">
              Disagree
            </Button>
            <Button type="submit" disabled={!isValid(state, disable)} variant="contained" color="primary">
              Agree
            </Button>
           </div>
          </form>
          {Object.keys(state).map(
            key =>
              state[key].error && <p className="error">{state[key].error}</p>
          )}
        </div>
      )}
      {isConsentDone && (
        <>
          <h1> Want a copy of your consent?</h1>

          <p>Good to keep for the records. </p>

          <button className="btn btn-primary">Donwload a .pdf copy</button>

          <button className="btn">Next</button>
        </>
      )}
    </div>
  )
}

export default Consent
