import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';

import useForm from '../useForm'
import { IneligibilityReason } from '../types'
import { getMomentDate, getAge } from '../utility'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import moment from 'moment'
import Button from '@material-ui/core/Button/Button'
import { FormControl } from 'react-bootstrap';

type EligibilityProps = {
  setEligibilityFn: Function
}

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn
}: EligibilityProps) => {
  const stateSchema = {
    over18: { value: '', error: '' },
    cons: { value: '', error: '' },
    zipcode: { value: '', error: '' }
  }

  const validationStateSchema = {
    over18: {
      required: true
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
   
    if (state.over18.value !== 'yes') {
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
 
  return (
    <div id="Questions">
      <h1>Am I eligible? </h1>
      <form className="demoForm" onSubmit={handleOnSubmit}>
      
      <div className="form-group">
          <label htmlFor="over18">Are you over 18?</label>
          <ToggleButtonGroup
            value={state.over18.value}
            exclusive
            className="verticalToggle"
            onChange={(_event: any, val: string) =>
              handleOnChange({
                target: { name: 'over18', value: val }
              })
            }
            aria-label="are you over 18"
          >
            ><ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
          </ToggleButtonGroup>
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
          disabled={disable}
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
