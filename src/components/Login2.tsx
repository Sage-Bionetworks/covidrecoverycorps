import React, { useState } from 'react'
import {EmailSigninParams, LoggedInUserData, Phone, SignInData, SignInDataPhone, SignInDataEmail} from '../types/types'
import {callEndpoint, makePhone} from '../helpers/utility'


type LoginProps = {
  // redirectUrl?: string // will redirect here after a successful login. if unset, reload the current page url.
  callback: Function // Callback is invoked after login
  //sessionName: string
  endpoint: string
  registerLink: string
  email?: string
  token?: string
  searchParams?: EmailSigninParams
}


const SESSION_TIMEOUT = 'sessionTimeout'
const STUDY_ID = 'czi-coronavirus'
const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = 'auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = 'auth/phone'
const PHONE_SIGN_IN_ENDPOINT = 'auth/phone/signIn'
const EMAIL_SIGN_IN_ENDPOINT = 'auth/email/signIn'

//const CLINIC_PREFIX = 'AHPD';
//onst HOST = 'https://ws.sagebridge.org';

function setSessionToken(sessionToken: string, session: string) {
  localStorage.setItem(session, sessionToken)
  localStorage.setItem(SESSION_TIMEOUT, new Date().getTime() + '')
  return sessionToken || ''
}


export const Login: React.FunctionComponent<LoginProps> = ({
  endpoint,
  registerLink,
  searchParams,
  callback,
}: LoginProps) => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [error, setError] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [loginType, setLoginType] = useState<'PHONE' | 'EMAIL'>()

  //detect if they are bck on the page
  React.useEffect(() => {
    const signInWithEmail = async (email: string, token: string) => {
      const postData = {
        study: STUDY_ID,
        email: email,
        token: token,
      }
      try {
        setError('')
       const loggedIn =  await callEndpoint<LoggedInUserData>(`${endpoint}${EMAIL_SIGN_IN_ENDPOINT}`, 'POST', postData)
       if(loggedIn.ok || loggedIn.status===412){
        callback(loggedIn)
       } else {
         setError('Error '+ loggedIn.status)
       }
      } catch (e) {
        console.log(e)
      }
    }

    if (searchParams?.email) {
      const email = decodeURIComponent(searchParams.email)
      const token = decodeURIComponent(searchParams.token)
      signInWithEmail(email, token)
    }
  }, [])

  /**
   * Handle user login on click
   *
   * @param {*} clickEvent Userclick event
   */



  const sendSignInRequest = async (
    _loginType: 'PHONE' | 'EMAIL',
    phoneOrEmail: string,
    endpoint: string,
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

  const signInWithPhoneCode = async (
    clickEvent: React.FormEvent<HTMLElement>,
  ): Promise<any> => {
    const postData = {
      study: STUDY_ID,
      phone: makePhone(phone),
      token: phoneCode,
    }
    clickEvent.preventDefault()
    console.log(phoneCode)
    const _endpoint = `${endpoint}${PHONE_SIGN_IN_ENDPOINT}`
    try {
      setError('')
      const loggedIn = await callEndpoint(_endpoint, 'POST', postData)
      callback(loggedIn)
    } catch (e) {
      setError(e)
    }
  }

  const handleLogin = async (
    clickEvent: React.FormEvent<HTMLElement>,
  ): Promise<any> => {
    let result
    clickEvent.preventDefault() // avoid page refresh

    try {
      if (phone) {
        result = await sendSignInRequest(
          'PHONE',
          phone,
          `${endpoint}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
        )
      } else if (email) {
        result = await sendSignInRequest(
          'EMAIL',
          email,
          `${endpoint}${EMAIL_SIGN_IN_TRIGGER_ENDPOINT}`,
        )
      }
      setIsLinkSent(true)
    } catch (e) {
      setError(e)
      console.log('error ', result)
    }
  }

  return (
    <div>
     {error}
 
      {(!isLinkSent || error) && (
        <div
          id="loginPage"
          className="container loginContainer SRC-syn-border-spacing"
        >
        
          <a href={registerLink} className="SRC-primary-text-color">
            Register
          </a>
          <div className="SRC-center-text SRC-deemphasized-text SRC-marginBottomTen">
            or
          </div>

          <div className="SRC-centerAndJustifyContent SRC-marginBottomTen">
            Please enter your phone or email address
          </div>
          <form onSubmit={handleLogin} className="form-group">
            <input
              autoComplete="email address"
              placeholder="email address"
              className="form-control SRC-marginBottomTop"
              id="exampleEmail"
              name="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
            <input
              autoComplete="phone"
              placeholder="phone"
              className="form-control SRC-marginBottomTop"
              id="examplephone"
              name="phone"
              type="phone"
              value={phone}
              onChange={e => setPhone(e.currentTarget.value)}
            />

            <button
              onSubmit={handleLogin}
              type="submit"
              className="btn SRC-primary-background-color SRC-hoverWhiteText
              SRC-whiteText m-1 SRC-google-button SRC-marginBottomTen"
            >
              Sign in
            </button>
          </form>
        </div>
      )}

      {isLinkSent && loginType === 'PHONE' && (
        <div>
          Phone code has been sent to you
          <form onSubmit={signInWithPhoneCode} className="form-group">
            <input
              name="phoneCode"
              placeholder="phone code"
              onChange={e => setPhoneCode(e.currentTarget.value)}
            ></input>
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {isLinkSent && loginType === 'EMAIL' && (
        <div>
          We have sent you an email. Please check it and click on the link
        </div>
      )}
    </div>
  )
}

export default Login
