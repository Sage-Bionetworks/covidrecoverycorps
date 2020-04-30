import React, { useState, ChangeEvent } from 'react'

import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ConsentInfo from './ConsentInfo'


import useForm from '../useForm'
import { getAge, getMomentDate, callEndpoint } from '../../helpers/utility'
import moment from 'moment'
import { ENDPOINT, SHARE_SCOPE_PARTNERS,SHARE_SCOPE_ALL, SUBPOP_GUID } from '../../types/types'
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
  const [isLearnMore, setIsLearnMore] = useState(false)

  const stateSchema = {
    agree: { value: '', error: '' },
    shareAll: { value: '', error: '' },
    fullName: { value: '', error: '' },
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

      scope: state.shareAll? SHARE_SCOPE_ALL : SHARE_SCOPE_PARTNERS,
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

  const checkboxChange = (_name: string) => {
    handleOnChange({
      target: { name: _name, value: !state[_name].value },
    })
  }

  if (isConsentDone) {
    return (
    <Redirect to='Dashboard'></Redirect>
    )
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
              <FormControlLabel
                control={
                  <Checkbox
                    value={state.shareAll.value}
                    onChange={(val) => checkboxChange('shareAll')}
                  />
                }
                label="Share my data with this study as well as other qualified researchers <strong>for future research </strong> on COVID related work "
              />
              <div style={{display: isLearnMore? 'block' : 'none', borderBottom: '1px solid #ddd'}}>
                some text about learning more about reserch sharing
                <Button 
                style={{float:'right'}}
                onClick={()=> setIsLearnMore(false)}><FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon></Button>
            
              </div>
              <div style={{display: isLearnMore? 'none' : 'block', borderBottom: '1px solid #ddd'}}>
              Learn More 
              <Button    style={{float:'right'}} onClick={()=> setIsLearnMore(true)}><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></Button>
              </div>

            </div>
            <div className="form-group">
              <FormControlLabel
                control={
                  <Checkbox
                    value={state.agree.value}
                    onChange={(val) => checkboxChange('agree')}
                  />
                }
                label="I have read this consent form (or someone read it to me). I understand the information in this form. All of my questions have been answered. I freely and willingly choose to take part in NY Strong."
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
      {/*isConsentDone && (
        <>
          <button className="btn">Next</button>
        </>
      )*/}
    </div>
  )
}

export default Consent
