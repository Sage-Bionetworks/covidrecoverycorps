import React, { useState, useEffect } from 'react'
import FloatingToolbar from '../widgets/FloatingToolbar'
import Button from '@material-ui/core/Button/Button'
import icon from '../../assets/bird_letter.png'

import { getSearchParams } from '../../helpers/utility'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

type ConsentSentConfirmationProps = {
  type: 'CONSENT' | 'EHR'
  doneCallbackFn: Function
  isFromAccountSettings?: boolean
}

const text = {
  CONSENT: 'We just sent you a copy of your study consent',
  EHR: 'We just sent you a copy of your HIPAA Authorization',
}

export const ConsentSentConfirmation: React.FunctionComponent<ConsentSentConfirmationProps> = ({
  type,
  doneCallbackFn,
}: ConsentSentConfirmationProps) => {
  const searchParamsProps = getSearchParams(window.location.search)
  const from: string = searchParamsProps['from']

  const getConsentButton = (): JSX.Element => {
    return (
      <div className="buttons--action" style={{ flexDirection: 'row-reverse' }}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className="pull-right"
          style={{ marginTop: '8rem' }}
          onClick={() => doneCallbackFn()}
        >
          &nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    )
  }

  const getEHRButton = (from?: string): JSX.Element => {
    return (
      <div className="buttons--action">
        <Button
          style={{ marginTop: '8rem' }}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => doneCallbackFn()}
        >
          &nbsp;
          {from === 'ACCOUNT' ? 'View Dashboard' : 'Begin Study'}
        </Button>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {type === 'CONSENT' && (
        <h2>Thank you for joining the COVID Recovery Corps !</h2>
      )}
      <div className="consentConfirmation">
        <img src={icon}></img>
      </div>
      <div>
        <p>{text[type]}</p>
      </div>
      {type === 'CONSENT' && getConsentButton()}
      {type === 'EHR' && getEHRButton(from)}
    </div>
  )
}

export default ConsentSentConfirmation
