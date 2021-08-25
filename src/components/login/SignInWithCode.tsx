import React, { useState, useEffect } from 'react'

import { APP_ID, ENDPOINT, LoginType } from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'
import Alert from '@material-ui/lab/Alert/Alert'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import BlueSeparator from '../static/BlueSeparator'
import { useTranslation, Trans } from 'react-i18next'

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

  const { t } = useTranslation()

  async function handleOnSubmit(clickEvent: React.FormEvent<HTMLElement>) {
    clickEvent.preventDefault()

    const postData = {
      appId: APP_ID,
      phone: makePhone(phoneOrEmail),
      token: code,
    }
    //
    const endpoint = `${ENDPOINT}${PHONE_SIGN_IN_ENDPOINT}`
    try {
      setError('')
      const loggedIn = await callEndpoint(endpoint, 'POST', postData)

      loggedInByPhoneFn!(loggedIn)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      {error}
      {loginType === 'PHONE' && (
        <div>
          <div className="text-center margin-top-std">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M70.7712 4.25562H29.229C27.1577 4.25805 25.172 5.08194 23.7074 6.54654C22.2428 8.01114 21.4189 9.99686 21.4165 12.0681V87.9319C21.4189 90.0031 22.2428 91.9888 23.7074 93.4534C25.172 94.918 27.1577 95.7419 29.229 95.7444H70.7712C72.8424 95.7419 74.8282 94.918 76.2928 93.4534C77.7574 91.9888 78.5812 90.0031 78.5837 87.9319V12.0681C78.5812 9.99686 77.7574 8.01114 76.2928 6.54654C74.8282 5.08194 72.8424 4.25805 70.7712 4.25562V4.25562ZM29.229 7.38062H70.7712C72.014 7.38198 73.2055 7.87628 74.0842 8.75506C74.963 9.63384 75.4573 10.8253 75.4587 12.0681V80.3391H24.5415V12.0681C24.5429 10.8253 25.0372 9.63384 25.9159 8.75506C26.7947 7.87628 27.9862 7.38198 29.229 7.38062V7.38062ZM70.7712 92.6194H29.229C27.9862 92.618 26.7947 92.1237 25.9159 91.2449C25.0372 90.3661 24.5429 89.1747 24.5415 87.9319V83.4641H75.4587V87.9319C75.4573 89.1747 74.963 90.3661 74.0842 91.2449C73.2055 92.1237 72.014 92.618 70.7712 92.6194V92.6194ZM51.4376 86.9522C51.5178 87.1403 51.5602 87.3424 51.5626 87.5469C51.568 87.7518 51.5252 87.9552 51.4376 88.1406C51.3579 88.3297 51.2469 88.504 51.1095 88.6562C50.8114 88.9439 50.4143 89.1061 50.0001 89.1094C49.7959 89.1069 49.5942 89.0644 49.4064 88.9844C49.2127 88.9138 49.0368 88.8017 48.891 88.6559C48.7453 88.5102 48.6332 88.3343 48.5626 88.1406C48.4806 87.9532 48.4382 87.7508 48.4382 87.5462C48.4382 87.3417 48.4806 87.1393 48.5626 86.9519C48.6348 86.759 48.7465 86.5833 48.8907 86.4362C48.9649 86.3694 49.0432 86.3073 49.1251 86.2501C49.2124 86.1911 49.3069 86.1434 49.4064 86.1083C49.4998 86.061 49.6003 86.0294 49.704 86.0145C49.955 85.9652 50.2143 85.9779 50.4594 86.0514C50.7044 86.1249 50.9278 86.257 51.1103 86.4364C51.2539 86.5838 51.3654 86.7594 51.4376 86.9522ZM43.7921 12.2009C43.7921 11.7865 43.9567 11.3891 44.2498 11.0961C44.5428 10.803 44.9402 10.6384 45.3546 10.6384H54.6456C55.06 10.6384 55.4574 10.803 55.7504 11.0961C56.0434 11.3891 56.2081 11.7865 56.2081 12.2009C56.2081 12.6153 56.0434 13.0128 55.7504 13.3058C55.4574 13.5988 55.06 13.7634 54.6456 13.7634H45.3546C44.9402 13.7634 44.5428 13.5988 44.2498 13.3058C43.9567 13.0128 43.7921 12.6153 43.7921 12.2009V12.2009Z"
                fill="black"
              />
            </svg>
            <p className="margin-top-std">{t('signIn.text1')}</p>
            <p>{phoneOrEmail}</p>
            <BlueSeparator></BlueSeparator>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="smsCode">{t('signIn.text2')}</label>
              <TextField
                name="code"
                type="code"
                value={code}
                placeholder={t('signIn.phone')}
                aria-label={t('signIn.phone')}
                label={t('signIn.text3')}
                variant="outlined"
                fullWidth
                onChange={e => setCode(e.currentTarget.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={!code || code.replace('-', '').length < 6}
              variant="contained"
              color="primary"
              fullWidth
            >
              {t('common.logIn')}
            </Button>
          </form>
        </div>
      )}

      {loginType === 'EMAIL' && (
        <div className="text-center margin-top-std">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 21C11.5615 21 8 24.7333 8 29.2188V70.75C8 75.2354 11.5615 79 16 79H84C88.4387 79 92 75.2354 92 70.75V29.2188C92 24.7333 88.4387 21 84 21H16ZM16 25H84C84.5867 25 85.1544 25.1432 85.6563 25.375L52.5938 55.9688C51.0662 57.3819 49.0304 57.3821 47.5 55.9688L14.375 25.375C14.8705 25.1505 15.4231 25 16 25ZM12.0626 28.6875L35.5313 50.375L12.5 72.7812C12.1961 72.1809 12 71.5005 12 70.75V29.2188C12 29.035 12.0426 28.8636 12.0626 28.6875ZM87.9376 28.7185C87.9556 28.8847 87.9996 29.0454 87.9996 29.2185V70.7497C87.9996 71.4845 87.8231 72.1582 87.5309 72.7498L64.5622 50.3435L87.9376 28.7185ZM61.6563 53.0309L72.8906 64.0154L84.125 74.9998C84.083 74.9998 84.042 74.9998 84 74.9998H16C15.968 74.9998 15.938 75.0005 15.906 74.9998L38.4685 53.0622L44.781 58.9059C47.7485 61.6467 52.3454 61.6505 55.3123 58.9059L61.6563 53.0309Z"
              fill="black"
            />
          </svg>
          <p className="margin-top-std">{t('signIn.text4')}</p>
          <p>{phoneOrEmail}</p>
          <BlueSeparator></BlueSeparator>
        </div>
      )}
    </>
  )
}

export default SignInWithCode
