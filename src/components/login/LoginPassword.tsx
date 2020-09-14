import React, { useState } from 'react'
import { APP_ID, LoggedInUserData, Response, ENDPOINT } from '../../types/types'
import { callEndpoint } from '../../helpers/utility'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField/TextField'
import { RouteComponentProps } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert/Alert'
import { Card, CardContent, CircularProgress } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useSessionDataDispatch, useSessionDataState } from '../../AuthContext'

type LoginPostData = {
  appId: string
  email: string
  password?: string
}

const PASSWORD_SIGN_IN_ENDPOINT = '/v3/auth/signIn'

export const LoginPassword: React.FunctionComponent<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
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

  const signIn = async (clickEvent: React.FormEvent<HTMLElement>) => {
    const postData: LoginPostData = {
      appId: APP_ID,
      email: email,
      password: password,
    }

    clickEvent.preventDefault() // avoid page refresh

    setIsLoading(true)

    try {
      const endpoint = `${ENDPOINT}${PASSWORD_SIGN_IN_ENDPOINT}`
      setError('')
      setIsLoading(true)
      const loggedIn = await callEndpoint<LoggedInUserData>(
        endpoint,
        'POST',
        postData,
      )

      handleLoggedIn(loggedIn)
    } catch (e) {
      //alert(JSON.stringify(e, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <div>
            <h2 className="text-center">{t('common.logIn')}</h2>
            <form>
              <div>
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

                <div className="input--padded">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    autoComplete="password"
                    placeholder="password"
                    label="password"
                    fullWidth
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                  />
                </div>
                <div className="text-center">
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={!email || !password}
                    onClick={signIn}
                    className="wideButton"
                    data-cy="submit"
                  >
                    {t('common.logIn')}
                  </Button>
                </div>
              </div>

              {error && <Alert severity="error">{error}</Alert>}
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default LoginPassword
