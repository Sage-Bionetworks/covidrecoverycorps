import React, { useState } from 'react'

import useForm from '../useForm'
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
  const [checks, setChecks] = useState({
    over18: false,
    cons: false,
    hadCovid: false,
    inUSA: false,
  })

  return (
    <div id="Questions">
      <h2 className="text-center">{t('eligibility.title')}</h2>
      <p>{t('eligibility.text1')}</p>
      <BlueSeparator></BlueSeparator>

      <div className="form-group  checkbox--nopad">
        <div className="form-group checkbox" style={{}}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value={checks.over18}
                onChange={() =>
                  setChecks(prev => ({ ...prev, over18: !prev.over18 }))
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
                value={checks.cons}
                onChange={() =>
                  setChecks(prev => ({ ...prev, cons: !prev.cons }))
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
                value={checks.hadCovid}
                onChange={() =>
                  setChecks(prev => ({ ...prev, hadCovid: !prev.hadCovid }))
                }
              />
            }
            label={t('eligibility.text4')}
          />
        </div>

        <div className="form-group checkbox">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value={checks.inUSA}
                onChange={() =>
                  setChecks(prev => ({ ...prev, inUSA: !prev.inUSA }))
                }
              />
            }
            label={t('eligibility.text5a')}
          />
        </div>
      </div>

      <div className="text-center">
        <Button
          color="primary"
          variant="contained"
          size="medium"
          type="submit"
          disabled={Object.values(checks).some(value => value !== true)}
          className="wideButton"
          onClick={() => setEligibilityFn()}
        >
          {t('common.submit')}
        </Button>
      </div>
    </div>
  )
}

export default Eligibility
