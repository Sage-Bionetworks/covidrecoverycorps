import React, { useState, useEffect } from 'react'

import useForm from '../useForm'
import { zipcodes }  from '../../data/zips.json'
import { IneligibilityReason } from '../../types/types'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import Button from '@material-ui/core/Button/Button'

import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import BlueSeparator from '../static/BlueSeparator'

type EligibilityProps = {
  setEligibilityFn: Function
}

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn,
}: EligibilityProps) => {
  const stateSchema = {
    over18: { value: '', error: '' },
    cons: { value: '', error: '' },
    hadCovid: { value: '', error: '' },
    zipcode: { value: '', error: '' },
  }

  const validationStateSchema = {
    over18: {
      required: true,
    },

    cons: {
      required: true,
    },
    hadCovid: {
      required: true,
    },
    zipcode: {
      required: true,
      validator: {
        error: 'Invalid Zipcode',
        regEx: /^\d{5}$/,
      },
    },
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
    if (!zipcodes.includes(state.zipcode.value)) {
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
      <h1>Eligibility</h1>
      <p>
        To be eligible to take part in the COVID Recovery Corps Study, you must fulfill the following:
      </p>
      <BlueSeparator></BlueSeparator>
      <form onSubmit={handleOnSubmit}>
      <div className="form-group">
          <div className="form-group checkbox" style={{}}>
            <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      value={state.over18.value}
                      onChange={(evt) =>
                        handleOnChange({
                          target: { name: 'over18', value: evt.target.checked? "yes":"no" },
                        })
                      }
                    />
                  }
                  label="I am 18 years of age or older"
                />
          </div>
         
          <div className="form-group checkbox">
            <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value={state.cons.value}
                    onChange={(evtd) =>
                      handleOnChange({
                        target: { name: 'cons', value: evtd.target.checked? "yes":"no"},
                      })
                    }
                  />
                }
                label="I am able to provide consent for myself"
              />
          </div>
       
          <div className="form-group checkbox">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value={state.hadCovid.value}
                  onChange={(evt) =>
                    handleOnChange({
                      target: { name: 'hadCovid', value: evt.target.checked? "yes":"no" },
                    })
                  }
                />
              }
              label="I think I’ve had COVID-19"
            />
          </div>
        
          </div>
        
        <div className="form-group">
          <div>
            <label>Please enter your zip code</label>
          </div>

          <TextField
            variant="outlined"
            name="zipcode"
            placeholder="zipcode"
            aria-label="zipcode"
            label="Zip code"
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
            fullWidth
          >
            Submit
          </Button>
        </div>
      </form>
      {Object.keys(state).map(
        (key) =>
          state[key].error && <Alert severity="error">{state[key].error}</Alert>
      )}
    </div>
  )
}

export default Eligibility
