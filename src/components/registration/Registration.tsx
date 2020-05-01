import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

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

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
  const stateSchema = {
    firstName: { value: '', error: '' },

    lastName: { value: '', error: '' },
    email: { value: '', error: '' },
    phone: { value: '', error: '' },
    registrationType: { value: '', error: '' },
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

    firstName: {
      required: true,
    },
    lastName: {
      required: true,
    },
  }

  const submitRegistration = async (registrationData: RegistrationData) => {
    const result = await callEndpoint(
      `${ENDPOINT}/v3/auth/signUp`,
      'POST',
      registrationData
    )
    alert(JSON.stringify(result, null, 2))
    return result
  }

  async function onSubmitForm(state: any) {
    alert(JSON.stringify(state, null, 2))

    //register
    const data: RegistrationData = {
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      email: state.email.value,
      phone: state.phone.value ? makePhone(state.phone.value) : undefined,
      clientData: {},
      study: STUDY_ID,
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
      console.log('registered')
      const sentSigninRequest = await sendSignInRequest(
        loginType,
        phoneOrEmail,
        endPoint[loginType]
      )
      console.log('sent request')
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
  const errorStyle = {
    color: 'red',
    fontSize: '13px',
  }

  return (
    <>
      <div id="Questions">
        <h1>We could use your help! </h1>
        <p>
          We are looking to build our community in New York first. Looks like
          you fit the bill. Now, let’s get you set up.
        </p>
        <hr></hr>
        <form className="demoForm" onSubmit={handleOnSubmit}>
          <div className="form-group">
       
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              label="What is your first name"
              value={state.firstName.value}
              onChange={handleOnChange}
              name="firstName"
            />
          </div>
          <div className="form-group">
      
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              value={state.lastName.value}
              onChange={handleOnChange}
              label="What is your last name"
              name="lastName"
            />
          </div>

          <hr></hr>

          <div className="form-group">
            <label htmlFor="registrationType">
              How do you want to create your account?
            </label>
            
            <ToggleButtonGroup
              aria-label="registration type"
              className="verticalToggle"
              exclusive
              value={state.registrationType.value}
              onChange={(_event: any, val: string) =>
                handleOnChange({
                  target: { name: 'registrationType', value: val },
                })
              }
            >
              {state.registrationType.value !== 'PHONE' && (
                <ToggleButton value={'PHONE'}>Phone</ToggleButton>
              )}
              {state.registrationType.value !== 'EMAIL' && (
                <ToggleButton value={'EMAIL'}>Email</ToggleButton>
              )}
            </ToggleButtonGroup>

            {state.registrationType.value === 'EMAIL' && (
              <div className="reg">
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
            )}

            {state.registrationType.value === 'PHONE' && (
              <div className="reg">
                <label htmlFor="phone">Phone</label>
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
            )}
          </div>
          <div className="text-center">
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              disabled={disable || (!state.email.value && !state.phone.value)}
            >
              Submit
            </Button>
          </div>
        </form>
        {Object.keys(state).map(
          (key) =>
            state[key].error && <p style={errorStyle}>{state[key].error}</p>
        )}
      </div>
    </>
  )
}

export default Registration
