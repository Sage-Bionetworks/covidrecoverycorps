import React, { useState } from 'react'
import {
  EmailSigninParams,
  LoggedInUserData,
  Phone,
  SignInData,
  SignInDataPhone,
  SignInDataEmail,
  LoginType,
  Response,
  SESSION_NAME,
  ENDPOINT,
} from '../types/types'
import { callEndpoint, makePhone, setSession } from '../helpers/utility'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Button from '@material-ui/core/Button'
import SignInWithCode from './SignInWithCode'
import TextField from '@material-ui/core/TextField/TextField'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

export interface OwnLoginProps {
  redirectUrl?: string // will redirect here after a successful login. if unset, reload the current page url.
  callbackFn?: Function // Callback is invoked after login
  //sessionName: string

  email?: string
  token?: string
  searchParams?: EmailSigninParams
}

export type LoginProps = OwnLoginProps & RouteComponentProps

const SESSION_TIMEOUT = 'sessionTimeout'
const STUDY_ID = 'czi-coronavirus'
const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'
const EMAIL_SIGN_IN_ENDPOINT = '/v3/auth/email/signIn'

function setSessionToken(sessionToken: string) {
  localStorage.setItem(SESSION_NAME, sessionToken)
  localStorage.setItem(SESSION_TIMEOUT, new Date().getTime() + '')
  return sessionToken || ''
}

export const Login: React.FunctionComponent<LoginProps> = ({
  searchParams,
  callbackFn,
  history,
}: LoginProps) => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [error, setError] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [loginType, setLoginType] = useState<LoginType>()
  const [isLoading, setIsLoading] = useState(true)
  const [isConsented, setIsConsented] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //detect if they are bck on the page

  const handleLoggedIn = (loggedIn: Response<LoggedInUserData>) => {
    const consented = loggedIn.status !== 412
    if (loggedIn.ok || !consented) {
      setSession(loggedIn.data.sessionToken, loggedIn.data.firstName, consented)
      if(callbackFn) {
        callbackFn (loggedIn.data.sessionToken, loggedIn.data.firstName)
      }
      if (consented) {
        history.push('/dashboard')
      } else {
        history.push('/consent')
      }
    
    } else {
      setError('Error ' + loggedIn.status)
    }
  }
  React.useEffect(() => {
    let isSubscribed = true
    const signInWithEmail = async (email: string, token: string) => {
      const postData = {
        study: STUDY_ID,
        email: email,
        token: token,
      }
      try {
        setError('')
        const loggedIn = await callEndpoint<LoggedInUserData>(
          `${ENDPOINT}${EMAIL_SIGN_IN_ENDPOINT}`,
          'POST',
          postData
        )
        if (isSubscribed) {
          handleLoggedIn(loggedIn)
          /*const consented = (loggedIn.status !== 412)
          if (loggedIn.ok || !consented) {
          
            setSession(
              loggedIn.data.sessionToken,
              loggedIn.data.firstName,
              consented
            )
            if(consented) {
            history.push("/dashboard");
            } else {
              history.push("/consent")
            }
            handleLoggedIn(loggedIn)
          } else {
            setError('Error ' + loggedIn.status)
          }*/
        }
      } catch (e) {
        alert(JSON.stringify(e, null, 2))
      } finally {
        setIsLoading(false)
      }
    }

    if (searchParams?.email) {
      const email = decodeURIComponent(searchParams.email)
      const token = decodeURIComponent(searchParams.token)
      signInWithEmail(email, token)
    } else {
      setIsLoading(false)
    }
    return () => {
      isSubscribed = false
    }
  }, [searchParams])

  /**
   * Handle user login on click
   *
   * @param {*} clickEvent Userclick event
   */

  const sendSignInRequest = async (
    _loginType: 'PHONE' | 'EMAIL',
    phoneOrEmail: string,
    endpoint: string
  ): Promise<any> => {
    let postData: SignInData
    setLoginType(_loginType)
    if (_loginType === 'PHONE') {
      postData = {
        study: STUDY_ID,
        phone: makePhone(phoneOrEmail),
      } as SignInDataPhone
    } else {
      postData = {
        study: STUDY_ID,
        email: email,
      } as SignInDataEmail
    }

    try {
      setError('')
      return callEndpoint<LoggedInUserData>(endpoint, 'POST', postData)
    } catch (e) {
      throw e
    }
  }

  const handleLogin = async (
    clickEvent: React.FormEvent<HTMLElement>
  ): Promise<any> => {
    let result
    clickEvent.preventDefault() // avoid page refresh

    try {
      if (phone) {
        result = await sendSignInRequest(
          'PHONE',
          phone,
          `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`
        )
      } else if (email) {
        result = await sendSignInRequest(
          'EMAIL',
          email,
          `${ENDPOINT}${EMAIL_SIGN_IN_TRIGGER_ENDPOINT}`
        )
      }
      setIsLinkSent(true)
    } catch (e) {
      setError(e)
      console.log('error ', result)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <span className="spinner"></span>
        </div>
      )}
      {!isLoading && (
        <div>
          {error}

          {(!isLinkSent || error) && (
            <div>
              <form onSubmit={handleLogin} className="form-group">
                <div className="form-group">
                  <label htmlFor="registrationType">
                    How do you want to log in?
                  </label>

                  <ToggleButtonGroup
                    value={loginType}
                    exclusive
                    className="verticalToggle"
                    onChange={(_event: any, val: LoginType) =>
                      setLoginType(val)
                    }
                    aria-label="login"
                  >
                    {loginType !== 'PHONE' && (
                      <ToggleButton value={'PHONE'}>Phone</ToggleButton>
                    )}
                    {loginType !== 'EMAIL' && (
                      <ToggleButton value={'EMAIL'}>Email</ToggleButton>
                    )}
                  </ToggleButtonGroup>

                  {loginType === 'EMAIL' && (
                    <div className="reg">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Email"
                        fullWidth
                        autoComplete="email address"
                        placeholder="email address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                    </div>
                  )}

                  {loginType === 'PHONE' && (
                    <div className="reg">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoComplete="phone"
                        placeholder="phone"
                        label="Phone"
                        fullWidth
                        name="phone"
                        type="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.currentTarget.value)}
                      />
                    </div>
                  )}
                </div>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!loginType}
                  onSubmit={handleLogin}
                >
                  Sign in
                </Button>
              </form>
            </div>
          )}

          {isLinkSent && (
            <SignInWithCode
              loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
                handleLoggedIn(result)
              }
              phoneOrEmail={loginType === 'PHONE' ? phone : email}
              loginType={loginType!}
            ></SignInWithCode>
          )}
        </div>
      )}
    </>
  )
}

export default Login
