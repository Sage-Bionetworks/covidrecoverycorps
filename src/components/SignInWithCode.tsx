import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { ToggleButton, FormControl } from 'react-bootstrap'
import useForm from './useForm'

import {
  STUDY_ID,
  ENDPOINT,
  EmailSigninParams,
  LoggedInUserData,
  Phone,
  SignInData,
  SignInDataPhone,
  SignInDataEmail,
  LoginType,
} from '../types/types'
import { callEndpoint, makePhone } from '../helpers/utility'
import Alert from '@material-ui/lab/Alert/Alert'

type SignInWithCodeProps = {
  loggedInByPhoneFn?: Function
  loginType: LoginType
  phoneOrEmail: string
}

const PHONE_SIGN_IN_ENDPOINT = '/v3/auth/phone/signIn'

export const SignInWithCode: React.FunctionComponent<SignInWithCodeProps> = ({
  loginType,
  loggedInByPhoneFn,
  phoneOrEmail,
}: SignInWithCodeProps) => {
  const [error, setError] = useState('')
  // const [phone, setPhone] = useState('')
  const stateSchema = {
    token1: { value: '', error: '' },

    token2: { value: '', error: '' },
  }

  const validationStateSchema = {
    //https://www.w3resource.com/javascript/form/email-validation.php
    token1: {
      required: true,
    },
    token2: {
      required: true,
    },
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  async function onSubmitForm(state: any) {
    alert(JSON.stringify(state, null, 2))

    const phoneCode = state.token1.value + state.token2.value
    // const signInWithPhoneCode = async (
    //  clickEvent: React.FormEvent<HTMLElement>,
    // ): Promise<any> => {
    const postData = {
      study: STUDY_ID,
      phone: makePhone(phoneOrEmail),
      token: phoneCode,
    }
    // clickEvent.preventDefault()
    console.log(phoneCode)
    const endpoint = `${ENDPOINT}${PHONE_SIGN_IN_ENDPOINT}`
    try {
      setError('')
      const loggedIn = await callEndpoint(endpoint, 'POST', postData)

      loggedInByPhoneFn!(loggedIn)
    } catch (e) {
      setError(e)
    }
  }

  return (
    <>
      {error}
      {loginType === 'PHONE' && (
        <div>
                <p>We just sent you an SMS.</p> 
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="token1">Please enter your code</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={state.token1.value}
                  onChange={handleOnChange}
                  name="token1"
                />
                <span className="input-group-addon">-</span>

                <input
                  type="text"
                  className="form-control"
                  value={state.token2.value}
                  onChange={handleOnChange}
                  name="token2"
                />
              </div>
            </div>
      
      
            <button type="submit"     className="btn btn-primary">Login</button>
          </form>
        </div>
      )}

      {loginType === 'EMAIL' && (
        <Alert severity="info">
           <p>We just sent a magic link to: {phoneOrEmail}</p>
          <p>Please check your email and click on the link provided</p>
          </Alert>
      )}
    </>
  )
}

export default SignInWithCode
