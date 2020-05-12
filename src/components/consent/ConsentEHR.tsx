import React, { useState, ChangeEvent } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faArrowLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'
import { Redirect } from 'react-router'

import Button from '@material-ui/core/Button/Button'
import { Typography, Checkbox, TextField } from '@material-ui/core'

import ConsentCopy from './ConsentCopy'
import { FloatingToolbar } from '../widgets/FloatingToolbar'
import { ConsentService } from '../../services/consent.service'

export type ConsentEHRProps = {
  setConsentEHRFn?: Function
  token: string
}

export const ConsentEHR: React.FunctionComponent<ConsentEHRProps> = ({
  setConsentEHRFn,
  token,
}: ConsentEHRProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isConsentEHRDone, setIsConsentEHRDone] = useState<boolean>(false)
  const [isHIPAAConsented, setIsHIPAAConsented] = useState<boolean | undefined>(
    undefined
  )
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const totalSteps = 12

  if (isConsentEHRDone) {
    return <Redirect to="/dashboard?consented=true"></Redirect>
  }

  const renderStep0 = () => {
    const element = (
      <>
        <ConsentCopy stepInfo={{ step: 0, isSummary: false }} isEHR={true} />
        <Button
          type="button"
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => setCurrentStep((_prev) => _prev + 1)}
        >
          Start HIPAA
        </Button>
      </>
    )
    return element
  }

  const getNavButtons = (step: number): JSX.Element => {
    const buttonDiv = (
      <>
        {currentStep > 0 && (
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp;
          </Button>
        )}
        {currentStep > 0 /*&& currentStep <= totalSteps */ && (
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {
              //  if (currentStep < totalSteps) {
              setCurrentStep((prev) => prev + 1)
              //  } else {
              //    onDone()
              //  }
            }}
          >
            &nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        )}
      </>
    )

    const result = <div className="ConsentInfo__navButtons">{buttonDiv}</div>
    return result
  }

  const renderInfoStep = () => {
    const element = (
      <>
        <ConsentCopy
          stepInfo={{ step: currentStep, isSummary: false }}
          isEHR={true}
        />

        {getNavButtons(currentStep)}
      </>
    )
    return element
  }

  const handleSubmit = async (
    clickEvent: React.FormEvent<HTMLElement>
  ): Promise<any> => {
    clickEvent.preventDefault() // avoid page refresh

    try {
      setError('')
      const result = await ConsentService.signEhrConsent(
        name,
        ConsentService.SHARE_SCOPE_PARTNERS,
        token
      )
      setIsConsentEHRDone(true)
      // if (setConsentFn) {
      //setConsentFn(result.ok)
      //}
    } catch (e) {
      setError(e.message)
    }
  }

  const renderSignatureStep = (): JSX.Element => {
    const element = (
      <div>
        <ConsentCopy screen="HIPAA_LAST_INTRO" isEHR={true}></ConsentCopy>
        <div className="Consent__inset">
          <p>I understand and agree to the following:</p>
          <ConsentCopy screen="HIPAA_LAST_TERMS" isEHR={true}></ConsentCopy>
          <p>Please check the box below if you agree to take part:</p>
          <form className="Consent__form" onSubmit={handleSubmit}>
            <div className="form-group checkbox--indented" style={{}}>
              <Checkbox
                color="primary"
                style={{ paddingTop: '3px' }}
                value={isHIPAAConsented}
                onChange={(_val, isChecked) => setIsHIPAAConsented(isChecked)}
              />
              <p>
                <ConsentCopy screen="HIPAA_LAST_CHECKBOX"></ConsentCopy>
              </p>
            </div>
            <p>{moment().format('MMMM Do, YYYY')}</p>
            <div className="form-group">
              <TextField
                label="Full Name of adult participant:"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="fullName"
                variant="outlined"
              />
            </div>

            <div className="buttons--action">
              <Button
                onClick={() => alert('todo')}
                variant="outlined"
                color="primary"
              >
                Disagree
              </Button>
              <Button
                type="submit"
                disabled={!name || !isHIPAAConsented}
                variant="contained"
                color="primary"
              >
                Agree
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
    return element
  }

  return (
    <div>
      <div className="Consent">
        {currentStep < 10 && (
          <>
            <FloatingToolbar
              closeLinkDestination="/dashboard"
              closeIcon={faTimes}
              closeLinkText=""
              closeConfirmationText='Are you sure you want to leave the HIPPA Authorization process?'
            >
              HIPAA Authorization
            </FloatingToolbar>
          </>
        )}

        {currentStep > 0 && (
          <div className="text-right">
            {currentStep} of {totalSteps}
          </div>
        )}
        {currentStep === 0 && renderStep0()}
        {currentStep > 0 && currentStep < totalSteps && renderInfoStep()}
        {currentStep === 12 && <div>{renderSignatureStep()}</div>}
      </div>
    </div>
  )
}

export default ConsentEHR
