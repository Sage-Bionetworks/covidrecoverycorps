import React, { useState, useEffect } from 'react'

import { FormControl } from 'react-bootstrap'
import useForm from '../useForm'
import { IneligibilityReason } from '../types'
import { getMomentDate, getAge } from '../utility'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import moment from 'moment'
import Button from '@material-ui/core/Button/Button'

type EligibilityProps = {
  setEligibilityFn: Function
}

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn
}: EligibilityProps) => {
  const stateSchema = {
    birthyear: { value: '', error: '' },
    birthmonth: { value: '', error: '' },
    birthday: { value: '', error: '' },
    cons: { value: '', error: '' },
    zipcode: { value: '', error: '' }
  }

  const validationStateSchema = {
    birthyear: {
      required: true,
      validator: {
        regEx: /^\d{4}$/,
        fn: (value: string) => {
          return Number(value) > 1900 && Number(value) < 2020
        },
        error: 'Invalid Birth Year'
      }
    },
    birthday: {
      required: true,
      validator: {
        regEx: /^\d{1,2}$/,
        error: 'Invalid Birth Day',
        fn: (value: string) => {
          return Number(value) > 0 && Number(value) < 32
        }
      }
    },
    birthmonth: {
      required: true,
      validator: {
        regEx: /^\d{1,2}$/,
        error: 'Invalid Birth Month',
        fn: (value: string) => {
          return Number(value) > 0 && Number(value) < 13
        }
      }
    },

    cons: {
      required: true
    },
    zipcode: {
      required: true,
      validator: {
        error: 'Invalid Zipcode',
        regEx: /^\d{5}$/

        /*fn: (value: string) => {
          const res = ['78704', '98103'].includes(value)
          console.log(res)
          return res
        },*/
      }
    }
  }

  function onSubmitForm(state: any) {
    let isValid = true
    let reason: IneligibilityReason = 'NONE'
    const age = getAge(
      state.birthyear?.value,
      state.birthmonth?.value,
      state.birthday?.value
    )

    if (age < 18) {
      isValid = false
      reason = 'AGE' as IneligibilityReason
    }

    if (state.cons.value !== 'yes') {
      isValid = false
      reason = 'CONCENT' as IneligibilityReason
    }
    if (!['78704', '98103'].includes(state.zipcode.value)) {
      isValid = false
      reason = 'LOCATION' as IneligibilityReason
    }

    setEligibilityFn(isValid, reason)
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  )
  const errorStyle = {
    color: 'red',
    fontSize: '13px'
  }

  const handleConsentChange = (val: any) => {
    handleOnChange({
      target: { name: 'cons', value: val }
    })
  }
  const isValid = (state: any, disable: boolean) => {
    if (disable) {
      return false
    }
    let date = getMomentDate(
      state.birthyear?.value,
      state.birthmonth?.value,
      state.birthday?.value
    )

    const dateValid = moment(date).isValid()
    if (!dateValid) {
      state.birthyear.error = 'Date is invalid'
    } else {
      state.birthyear.error = ''
    }

    return dateValid
  }
  return (
    <div id="Questions">
      <h1>Am I eligible? </h1>
      <form className="demoForm" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="birthyear">What is your date of birth</label>

          <div className="input-group">
            <input
              type="number"
              className="form-control"
              name="birthmonth"
              onChange={handleOnChange}
              value={state.birthmonth.value}
              placeholder="Month"
            />
            <span className="input-group-addon">/</span>
            <input
              type="number"
              className="form-control"
              name="birthday"
              onChange={handleOnChange}
              value={state.birthday.value}
              placeholder="Day"
            />
            <span className="input-group-addon">/</span>
            <input
              type="number"
              className="form-control"
              name="birthyear"
              onChange={handleOnChange}
              value={state.birthyear.value}
              placeholder="Year"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cons">Are you able to consent for yourself</label>
          <ToggleButtonGroup
            value={state.cons.value}
            exclusive
            className="verticalToggle"
            onChange={(_event: any, val: string) =>
              handleOnChange({
                target: { name: 'cons', value: val }
              })
            }
            aria-label="can consent"
          >
            ><ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">Zip Code</label>
          <FormControl
            name="zipcode"
            placeholder="zipcode"
            aria-label="zipcode"
            onChange={handleOnChange}
          />
        </div>

        <Button
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          disabled={!isValid(state, disable)}
        >
          Submit
        </Button>
      </form>
      {Object.keys(state).map(
        key => state[key].error && <p style={errorStyle}>{state[key].error}</p>
      )}
    </div>
  )
}

export default Eligibility
