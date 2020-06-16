import React from 'react'
import BlueSeparator from '../static/BlueSeparator'

import useForm from '../useForm'
import {
  APP_ID,
  ENDPOINT,
  RegistrationData,
  LoginType,
} from '../../types/types'
import {
  callEndpoint,
  makePhone,
  sendSignInRequest,
} from '../../helpers/utility'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import { useTranslation, Trans } from 'react-i18next'

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

const signupIntro = {
  PHONE: (
    <Trans i18nKey="registration.intro1">
      <h2>[translate]</h2>
      <p>[translate]</p>
      <p>[translate]</p>
      <p>[translate]</p>
    </Trans>
  ),
  EMAIL: (
    <Trans i18nKey="registration.intro2">
      <h2>[translate]</h2>
      <p>[translate] </p>
      <p> [translate]</p>
    </Trans>
  ),
}

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
  const { t } = useTranslation()
  const stateSchema = {
    email: { value: '', error: '' },
    phone: { value: '', error: '' },
    registrationType: { value: 'EMAIL', error: '' },
  }

  const validationStateSchema = {
    //https://www.w3resource.com/javascript/form/email-validation.php
    email: {},
    phone: {
      validator: {
        regEx: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        error: t('registration.text5'),
      },
    },
    registrationType: {},
  }

  const submitRegistration = async (registrationData: RegistrationData) => {
    const result = await callEndpoint(
      `${ENDPOINT}/v3/auth/signUp`,
      'POST',
      registrationData,
    )
    return result
  }

  async function onSubmitForm(state: any) {
    //register
    const data: RegistrationData = {
      email: state.email.value,
      phone: state.phone.value ? makePhone(state.phone.value) : undefined,
      clientData: {},
      appId: APP_ID,
      substudyIds: ['columbia'],
    }
    let loginType: LoginType = 'EMAIL'
    const endPoint = {
      PHONE: `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
      EMAIL: `${ENDPOINT}${EMAIL_SIGN_IN_TRIGGER_ENDPOINT}`,
    }
    if (state.registrationType === 'EMAIL') {
      delete data.phone
      loginType = 'EMAIL'
    }
    if (!data.email) {
      delete data.email
      loginType = 'PHONE'
    }

    const hostname: string = window.location.hostname
    if (hostname.includes('localhost') || hostname.includes('staging')) {
      // issue 145: current hostname includes 'localhost' or 'staging', mark this as a test user account
      data.dataGroups = ['test_user']
    }

    //send signinRequest
    const phoneOrEmail = data.email || data.phone?.number || ''
    const result = await submitRegistration(data)
    if (result.status === 201) {
      const sentSigninRequest = await sendSignInRequest(
        loginType,
        phoneOrEmail,
        endPoint[loginType],
      )

      onSuccessFn(
        loginType,
        sentSigninRequest.status,
        sentSigninRequest.data,
        phoneOrEmail,
      )
    } else {
      onErrorFn(result.status)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  return (
    <div>
      {signupIntro[state.registrationType.value as LoginType]}
      <BlueSeparator></BlueSeparator>

      {state.registrationType.value === 'EMAIL' && (
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div className="tabbedField">
              <div>
                <label htmlFor="email" className="block--dark">
                  {t('common.email')}
                </label>
                <div className="input--padded">
                  <TextField
                    name="email"
                    type="email"
                    value={state.email.value}
                    aria-label={t('common.email')}
                    onChange={handleOnChange}
                    variant="outlined"
                    label={t('common.email')}
                    fullWidth
                    autoComplete={t('common.emailAddress')}
                    placeholder={t('common.emailAddress')}
                  />
                </div>

                <div className="text-center">
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={!state.email.value}
                    className="wideButton"
                  >
                    {t('registration.text1')}
                  </Button>
                  <br />
                </div>
              </div>
            </div>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => {
                  handleOnChange({
                    target: { name: 'registrationType', value: 'PHONE' },
                  })
                  handleOnChange({
                    target: { name: 'email', value: '' },
                  })
                  window.scrollTo(0, 0)
                }}
              >
                {t('registration.text2')}
              </Button>
            </div>
          </div>
        </form>
      )}

      {state.registrationType.value === 'PHONE' && (
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div className="tabbedField">
              <label htmlFor="phone" className="block--dark">
                {t('common.phone')}
              </label>
              <div className="input--padded">
                <TextField
                  name="phone"
                  type="phone"
                  value={state.phone.value}
                  placeholder={t('common.phone')}
                  aria-label={t('common.phone')}
                  label={t('common.phone')}
                  variant="outlined"
                  fullWidth
                  onChange={handleOnChange}
                />
              </div>
              {Object.keys(state).map(
                key =>
                  state[key].error && (
                    <p
                      className="error"
                      style={{ marginLeft: '2rem', fontSize: '1.4rem' }}
                    >
                      {state[key].error}
                    </p>
                  ),
              )}
              <div className="text-center">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!state.phone.value}
                >
                  {t('registration.text3')}
                </Button>
              </div>
            </div>

            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => {
                  handleOnChange({
                    target: { name: 'registrationType', value: 'EMAIL' },
                  })
                  handleOnChange({
                    target: { name: 'phone', value: '' },
                  })
                }}
              >
                {t('registration.text4')}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default Registration
