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
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'

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
  const [code, setCode] = useState('')

  async function handleOnSubmit(clickEvent: React.FormEvent<HTMLElement>) {
    clickEvent.preventDefault()
    const _code = code.replace('-', '').trim()
    const postData = {
      study: STUDY_ID,
      phone: makePhone(phoneOrEmail),
      token: code,
    }
    // 
    console.log(code)
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
              <TextField
                id="outlined-basic"
                variant="outlined"
                autoComplete="code"
                placeholder="code"
                label="Please enter your code"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.currentTarget.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={!code || code.replace('-', '').length < 6}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
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
