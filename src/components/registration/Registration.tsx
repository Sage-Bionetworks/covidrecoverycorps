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
import { Tabs, Tab } from '@material-ui/core'

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

const signupIntro = {
  PHONE: (
    <>
      <h2>Don't have email?</h2>
      <p>
        At this time, we are only able to invite participants to lab draws with
        an email account.
      </p>
      <p>
        We are working on this issue. We hope to support scheduling appointments
        with your phone number in the near future.
      </p>
      <p>
        You can still join the COVID Recovery Corps and provide important
        information to our researchers by filling out surveys with your phone
        number.
      </p>
    </>
  ),
  EMAIL: (
    <>
      <h2>Getting Started</h2>
      <p>
        {' '}
        To access the consent and surveys, you will need to create an account.
      </p>
      <p> You will use your email to log into your account in the future.</p>
    </>
  ),
}

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
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
        error: 'Invalid Phone',
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
    //alert(JSON.stringify(result, null, 2))
    return result
  }

  async function onSubmitForm(state: any) {
    //alert(JSON.stringify(state, null, 2))

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
                  Email
                </label>
                <div className="input--padded">
                  <TextField
                    name="email"
                    type="email"
                    value={state.email.value}
                    aria-label="email"
                    onChange={handleOnChange}
                    variant="outlined"
                    label="Email"
                    fullWidth
                    autoComplete="email address"
                    placeholder="email address"
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
                    Create account
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
                  window.scrollTo(0,0)
                }}
              >
                I don't have an email account
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
                Phone
              </label>
              <div className="input--padded">
                <TextField
                  name="phone"
                  type="phone"
                  value={state.phone.value}
                  placeholder="Phone"
                  aria-label="phone"
                  label="phone"
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
                  Create account
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
                I want to sign up with email
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default Registration
