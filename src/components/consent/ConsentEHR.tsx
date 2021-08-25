import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'
import { Redirect } from 'react-router'

import Button from '@material-ui/core/Button/Button'
import { Checkbox, TextField, CardContent, Card } from '@material-ui/core'

import ConsentCopy, { SCREENS_ENUM } from './ConsentCopy'
import { FloatingToolbar } from '../widgets/FloatingToolbar'
import { ConsentService } from '../../services/consent.service'
import ConsentIcons from './ConsentIcons'
import ConsentSentConfirmation from './ConsentSentConfirmation'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import 'moment/locale/es'

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
    undefined,
  )
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isConsentConfirmationShown, setConsentConfirmationShown] = useState(
    false,
  )
  const totalSteps = 10
  const { t } = useTranslation()

  if (isConsentConfirmationShown) {
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
          style={{ marginTop: '20px' }}
          onClick={() => setCurrentStep(_prev => _prev + 1)}
        >
          {t('consentEHR.welcome.text4')}
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
            onClick={() => {
              window.scrollTo(0, 0)
              setCurrentStep(prev => prev - 1)
            }}
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
              window.scrollTo(0, 0)
              setCurrentStep(prev => prev + 1)
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

    const result = <div className="navButtons">{buttonDiv}</div>
    return result
  }

  const renderInfoStep = () => {
    const element = (
      <>
        <div className="icon-top">
          <img
            className="consentIcon"
            src={ConsentIcons.enr[currentStep - 1]}
            alt="Current step"
          ></img>
        </div>
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
    clickEvent: React.FormEvent<HTMLElement>,
  ): Promise<any> => {
    clickEvent.preventDefault() // avoid page refresh

    try {
      setError('')
      const result = await ConsentService.signEhrConsent(
        name,
        ConsentService.SHARE_SCOPE_PARTNERS,
        token,
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
        <ConsentCopy
          screen={SCREENS_ENUM.HIPAA_LAST_INTRO}
          isEHR={true}
        ></ConsentCopy>
        <div className="Consent__inset">
          <p>
            <strong>{t('consentEHR.screen11.text1')}</strong>
          </p>

          <ConsentCopy
            screen={SCREENS_ENUM.HIPAA_LAST_TERMS}
            isEHR={true}
          ></ConsentCopy>

          <form className="Consent__form" onSubmit={handleSubmit}>
            <div className="form-group checkbox--indented" style={{}}>
              <Checkbox
                color="primary"
                style={{ paddingTop: '3px' }}
                value={isHIPAAConsented}
                onChange={(_val, isChecked) => setIsHIPAAConsented(isChecked)}
              />
              <p>
                <ConsentCopy
                  screen={SCREENS_ENUM.HIPAA_LAST_CHECKBOX}
                ></ConsentCopy>
              </p>
            </div>
            <p>{moment().format('MMMM Do, YYYY')}</p>
            <div className="form-group">
              <TextField
                label={t('consentEHR.screen11.text9')}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={e => setName(e.target.value)}
                value={name}
                name="fullName"
                variant="outlined"
              />
            </div>

            <div className="buttons--action">
              <Button
                type="submit"
                fullWidth
                disabled={!name || !isHIPAAConsented}
                variant="contained"
                color="primary"
              >
                {t('consentEHR.screen11.text10')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
    return element
  }

  return (
    <Card>
      <CardContent>
        <div className="Consent">
          <>
            <FloatingToolbar
              closeLinkDestination="/dashboard"
              closeLinkText=""
              closeConfirmationText={t('consentEHR.header.confirmation')}
            >
              {t('consentEHR.header.text1')}
            </FloatingToolbar>
          </>
          {currentStep > 0 && currentStep <= totalSteps && (
            <div className="text-right page-numbers">
              <strong>
                {currentStep}/{totalSteps}
              </strong>
            </div>
          )}
          {currentStep === 0 && renderStep0()}
          {currentStep > 0 && currentStep <= totalSteps && renderInfoStep()}
          {currentStep === totalSteps + 1 && !isConsentEHRDone && (
            <div>{renderSignatureStep()}</div>
          )}
          {isConsentEHRDone && !isConsentConfirmationShown && (
            <ConsentSentConfirmation
              type="EHR"
              doneCallbackFn={() => setConsentConfirmationShown(true)}
            ></ConsentSentConfirmation>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ConsentEHR
