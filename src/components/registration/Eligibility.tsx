import React from 'react'

import useForm from '../useForm'
import { zipcodes } from '../../data/zips.json'
import { IneligibilityReason } from '../../types/types'
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
      validator: {
        error: 'To be eligible to take part in the COVID Recovery Corps study, you must be over 18.',
        regEx: /yes/,
      },
    },

    cons: {
      required: true,
      validator: {
        error: 'To be eligible to take part in the COVID Recovery Corps study, you must be able to provide consent for yourself.',
        regEx: /yes/,
      },
    },
    hadCovid: {
      required: true,
      validator: {
        error: 'To be eligible to take part in the COVID Recovery Corps study, you must think that you\'ve had COVID-19.',
        regEx: /yes/,
      },
    },
    zipcode: {
      required: true,
      validator: {
        error: 'Invalid zip code.',
        regEx: /^\d{5}$/,
      },
    },
  }

  function onSubmitForm(state: any) {
    let isValid = true
    let reason: IneligibilityReason = 'NONE'
    
    if (!zipcodes.includes(state.zipcode.value)) {
      isValid = false
      reason = 'LOCATION' as IneligibilityReason
    }

    setEligibilityFn(isValid, reason)
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  return (
    <div id="Questions">
      <h2 className="text-center">Eligibility</h2>
      <p>
        Currently we are looking for residents within a 25 mile radius of the Columbia University Medical Center.
        To be eligible to take part in the COVID Recovery Corps study, you must fulfill the following:
      </p>
      <BlueSeparator></BlueSeparator>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group  checkbox--nopad">
          <div className="form-group checkbox" style={{}}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value={state.over18.value}
                  onChange={evt =>
                    handleOnChange({
                      target: {
                        name: 'over18',
                        value: evt.target.checked ? 'yes' : 'no',
                      },
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
                  onChange={evtd =>
                    handleOnChange({
                      target: {
                        name: 'cons',
                        value: evtd.target.checked ? 'yes' : 'no',
                      },
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
                  onChange={evt =>
                    handleOnChange({
                      target: {
                        name: 'hadCovid',
                        value: evt.target.checked ? 'yes' : 'no',
                      },
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
          {/* <div>
            <em>Note, we are only able to enroll participants who live within a 25 mile radius of the Columbia University Medical Center.</em>
          </div> */}
          
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
            className="wideButton"
          >
            Submit
          </Button>
        </div>
      </form>
      {Object.keys(state).map(
        key =>
          state[key].error && (
            <Alert severity="error">{state[key].error}</Alert>
          ),
      )}
    </div>
  )
}

export default Eligibility
