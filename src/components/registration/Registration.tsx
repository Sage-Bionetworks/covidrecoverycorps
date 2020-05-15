import React from 'react'
import BlueSeparator from '../static/BlueSeparator'

import useForm from '../useForm'
import {
  STUDY_ID,
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
      <h1>Don't have email?</h1>
      <p>
        At this time, we are only able to invite participants to lab draws with
        an email account.</p>
        <p>We are working on this issue. We hope to support
        scheduling appointments with your phone number in the near future.</p>
        <p>You can still provide important information to our researchers by filling
        out surveys.
      </p>
    </>
  ),
  EMAIL: (
    <>
      <h1>Getting Started</h1>
      <p>
        {' '}
        To access the consent and surveys, you will need to create an account.</p>
       <p> You will use your email to log into your account in the future.
      </p>
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
      registrationData
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
      study: STUDY_ID,
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
    //send signinRequest
    const phoneOrEmail = data.email || data.phone?.number || ''
    const result = await submitRegistration(data)
    if (result.status === 201) {
      const sentSigninRequest = await sendSignInRequest(
        loginType,
        phoneOrEmail,
        endPoint[loginType]
      )

      onSuccessFn(
        loginType,
        sentSigninRequest.status,
        sentSigninRequest.data,
        phoneOrEmail
      )
    } else {
      onErrorFn(result.status)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  )

  return (
    <div>
      {signupIntro[state.registrationType.value as LoginType]}
      <BlueSeparator></BlueSeparator>
      <form className="demoForm" onSubmit={handleOnSubmit}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="tabbedField">
            {state.registrationType.value === 'EMAIL' && (
              <div>
                <label htmlFor="email" className="block--dark">
                  EMAIL
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
                  >
                    Create account
                  </Button><br/>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleOnChange({
                        target: { name: 'registrationType', value: 'PHONE' },
                      })
                      handleOnChange({
                        target: { name: 'email', value: '' },
                      })
                    }}
                  >
                    I don't have email address
                  </Button>
                </div>
              </div>
            )}

            {state.registrationType.value === 'PHONE' && (
              <div>
                <label htmlFor="phone" className="block--dark">
                  Phone
                </label>
                <div className="input--padded">
                  <TextField
                    name="phone"
                    type="phone"
                    value={state.phone.value}
                    placeholder="phone"
                    aria-label="phone"
                    label="phone"
                    variant="outlined"
                    fullWidth
                    onChange={handleOnChange}
                  />
                </div>
                {Object.keys(state).map(
                  (key) =>
                    state[key].error && (
                      <p
                        className="error"
                        style={{ marginLeft: '2rem', fontSize: '1.4rem' }}
                      >
                        {state[key].error}
                      </p>
                    )
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
                  </Button><br/>
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
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Registration
