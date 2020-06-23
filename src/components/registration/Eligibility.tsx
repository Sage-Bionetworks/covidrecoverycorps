import React from 'react'

import useForm from '../useForm'
import { zipcodes } from '../../data/zips.json'
import { IneligibilityReason } from '../../types/types'
import Button from '@material-ui/core/Button/Button'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import BlueSeparator from '../static/BlueSeparator'
import { useTranslation } from 'react-i18next'

type EligibilityProps = {
  setEligibilityFn: Function
}

export const Eligibility: React.FunctionComponent<EligibilityProps> = ({
  setEligibilityFn,
}: EligibilityProps) => {
  const { t } = useTranslation()

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
        error: t('eligibility.error18'),
        regEx: /yes/,
      },
    },

    cons: {
      required: true,
      validator: {
        error: t('eligibility.errorCons'),
        regEx: /yes/,
      },
    },
    hadCovid: {
      required: true,
      validator: {
        error: t('eligibility.errorCovid'),
        regEx: /yes/,
      },
    },
    zipcode: {
      required: true,
      validator: {
        error: t('eligibility.errorZip'),
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
      <h2 className="text-center">{t('eligibility.title')}</h2>
      <p>{t('eligibility.text1')}</p>
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
              label={t('eligibility.text2')}
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
              label={t('eligibility.text3')}
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
              label={t('eligibility.text4')}
            />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label>{t('eligibility.text5')}</label>
          </div>
          {/* <div>
            <em>Note, we are only able to enroll participants who live within a 25 mile radius of the Columbia University Medical Center.</em>
          </div> */}

          <TextField
            variant="outlined"
            name="zipcode"
            placeholder={t('eligibility.zipCode')}
            aria-label={t('eligibility.zipCode')}
            label={t('eligibility.zipCode')}
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
            {t('common.submit')}
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
