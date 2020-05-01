import React, { useState, useEffect } from 'react'


import useForm from '../useForm'
import { IneligibilityReason, ZIPCODES } from '../../types/types'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'


import Button from '@material-ui/core/Button/Button'

import { TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert/Alert';

type EligibilityProps = {
  setEligibilityFn: Function
}

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn
}: EligibilityProps) => {
  const stateSchema = {
    over18: { value: '', error: '' },
    cons: { value: '', error: '' },
    hadCovid: { value: '', error: '' },
    zipcode: { value: '', error: '' }
  }

  const validationStateSchema = {
    over18: {
      required: true
    },

    cons: {
      required: true
    },
    hadCovid: {
      required: true
    },
    zipcode: {
      required: true,
      validator: {
        error: 'Invalid Zipcode',
        regEx: /^\d{5}$/

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
    if (state.hadCovid.value !== 'yes') {
      isValid = false
      reason = 'COVID' as IneligibilityReason
    }
    if (!ZIPCODES.includes(state.zipcode.value)) {
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

 
  return (
    <div id="Questions">
      <h1>Am I eligible? </h1>
      <form  onSubmit={handleOnSubmit}>
      
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
            ><ToggleButton value="yes" color="primary">Yes</ToggleButton>
            <ToggleButton value="no" color="primary">No</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="form-group">
          <label htmlFor="hadCovid"> Do you think you’ve had COVID? </label>
          <ToggleButtonGroup
            value={state.hadCovid.value}
            exclusive
            className="verticalToggle"
            onChange={(_event: any, val: string) =>
              handleOnChange({
                target: { name: 'hadCovid', value: val }
              })
            }
            aria-label="Do you think you've head covid"
          >
            ><ToggleButton value="yes" color="primary">Yes</ToggleButton>
            <ToggleButton value="no" color="primary">No</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="form-group">
         
          <TextField variant="outlined"
            name="zipcode"
            placeholder="zipcode"
            aria-label="zipcode"
           label="zipcode"
            fullWidth
            onChange={handleOnChange}
          />
        </div>
<div className="text-center">
        <Button
          color="primary"
          variant="contained"
          size="medium"
            
          type="submit"
          disabled={disable}
        >
          Submit
        </Button>
        </div>
      </form>
      {Object.keys(state).map(
        key => state[key].error &&
       <Alert severity="error">{state[key].error}</Alert>
      )}
    </div>
  )
}

export default Eligibility
