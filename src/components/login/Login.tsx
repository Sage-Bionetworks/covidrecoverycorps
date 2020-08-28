import React, { useState } from 'react'
import {
  APP_ID,
  EmailSigninParams,
  LoggedInUserData,
  SignInData,
  SignInDataPhone,
  SignInDataEmail,
  LoginType,
  Response,
  ENDPOINT,
} from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'

import Button from '@material-ui/core/Button'
import SignInWithCode from './SignInWithCode'
import TextField from '@material-ui/core/TextField/TextField'

import { RouteComponentProps } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert/Alert'
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  CircularProgress,
} from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { useSessionDataDispatch, useSessionDataState } from '../../AuthContext'

export interface OwnLoginProps {
  redirectUrl?: string // will redirect here after a successful login. if unset, reload the current page url.
  searchParams?: EmailSigninParams
}

export type LoginProps = OwnLoginProps & RouteComponentProps

type LoginPostData = {
  appId: string
  email: string
  password?: string
  token?: string
}

const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'
const EMAIL_SIGN_IN_ENDPOINT = '/v3/auth/email/signIn'
const PASSWORD_SIGN_IN_ENDPOINT = '/v3/auth/signIn'

export const Login: React.FunctionComponent<LoginProps> = ({
  searchParams,
  history,
}: LoginProps) => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [loginType, setLoginType] = useState<LoginType>('EMAIL')
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  const sessionData = useSessionDataState()
  const sessionUpdateFn = useSessionDataDispatch()

  //detect if they are bck on the page

  const redirect = (isConsented: boolean) => {
    if (isConsented) {
      history.push('/dashboard')
    } else {
      history.push('/consent')
    }
  }

  const handleLoggedIn = async (loggedIn: Response<LoggedInUserData>) => {
    const consented = loggedIn.status !== 412
    if (loggedIn.ok || !consented) {
      console.log('handleLogin')
      sessionUpdateFn({
        type: 'LOGIN',
        payload: {
          ...sessionData,
          token: loggedIn.data.sessionToken,
          name: loggedIn.data.firstName,
          consented: loggedIn.data.consented,
          userDataGroup: loggedIn.data.dataGroups,
        },
      })
      redirect(loggedIn.data.consented)
    } else {
      setError('Error ' + loggedIn.status)
    }
  }

  React.useEffect(() => {
    let isSubscribed = true

    const signIn = async (postData: LoginPostData) => {
      setIsLoading(true)

      try {
        const endpoint = `${ENDPOINT}${
          postData.password ? PASSWORD_SIGN_IN_ENDPOINT : EMAIL_SIGN_IN_ENDPOINT
        }`
        setError('')
        setIsLoading(true)
        const loggedIn = await callEndpoint<LoggedInUserData>(
          endpoint,
          'POST',
          postData,
        )
        if (isSubscribed) {
          handleLoggedIn(loggedIn)
        }
      } catch (e) {
        //alert(JSON.stringify(e, null, 2))
      } finally {
        setIsLoading(false)
      }
    }
    if (sessionData.token) {
      redirect(sessionData.consented || false)
    } else {
      if (searchParams?.email) {
        const email = decodeURIComponent(searchParams.email)
        const token = searchParams.token
          ? decodeURIComponent(searchParams.token)
          : undefined
        const password = searchParams.password
          ? decodeURIComponent(searchParams.password)
          : undefined

        let postData: LoginPostData = {
          appId: APP_ID,
          email: email,
        }
        if (token) {
          // signInWithEmail(email, token)
          postData = { ...postData, token }
        }

        if (password) {
          //signInWithPassword(email, password)
          postData = { ...postData, password }
        }

        signIn(postData)
      }
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
    endpoint: string,
  ): Promise<any> => {
    let postData: SignInData
    setLoginType(_loginType)
    if (_loginType === 'PHONE') {
      postData = {
        appId: APP_ID,
        phone: makePhone(phoneOrEmail),
      } as SignInDataPhone
    } else {
      postData = {
        appId: APP_ID,
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
    clickEvent: React.FormEvent<HTMLElement>,
  ): Promise<any> => {
    let result
    clickEvent.preventDefault() // avoid page refresh

    try {
      setIsLoading(true)
      setError('')
      if (loginType === 'PHONE' && phone) {
        result = await sendSignInRequest(
          'PHONE',
          phone,
          `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
        )
      } else if (loginType === 'EMAIL' && email) {
        result = await sendSignInRequest(
          'EMAIL',
          email,
          `${ENDPOINT}${EMAIL_SIGN_IN_TRIGGER_ENDPOINT}`,
        )
      }
      setIsLinkSent(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <CircularProgress color="primary" />
        </div>
      )}
      {!isLoading && (
        <Card>
          <CardContent>
            {(!isLinkSent || error) && (
              <div>
                <h2 className="text-center">{t('common.logIn')}</h2>

                <form onSubmit={handleLogin}>
                  <div>
                    <div className="tabbedField">
                      <Tabs
                        value={loginType}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        onChange={(_e, value) => setLoginType(value)}
                        aria-label="disabled tabs example"
                      >
                        <Tab label={t('common.email')} value="EMAIL" />

                        {
                          // temporarily disabling phone login
                          false && (
                            <Tab label={t('common.phone')} value="PHONE" />
                          )
                        }
                      </Tabs>

                      {loginType === 'EMAIL' && (
                        <div className="input--padded">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label={t('common.emailAddress')}
                            fullWidth
                            autoComplete={t('common.emailAddress')}
                            placeholder={t('common.emailAddress')}
                            name="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.currentTarget.value)}
                          />
                        </div>
                      )}

                      {loginType === 'PHONE' && (
                        <div className="input--padded">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            autoComplete="phone"
                            placeholder={t('common.phone')}
                            label={t('common.phone')}
                            fullWidth
                            name="phone"
                            type="phone"
                            value={phone}
                            onChange={e => setPhone(e.currentTarget.value)}
                          />
                        </div>
                      )}
                      <div className="text-center">
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          type="submit"
                          disabled={!loginType}
                          onSubmit={handleLogin}
                          className="wideButton"
                        >
                          {t('common.logIn')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {error && <Alert severity="error">{error}</Alert>}
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
            {!isLinkSent && (
              <div style={{ margin: '0px auto', textAlign: 'center' }}>
                <Button
                  variant="text"
                  onClick={() => (window.location.href = 'eligibility')}
                >
                  {t('common.signUpForAccount')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default Login
