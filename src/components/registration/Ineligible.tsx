import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { ToggleButton, FormControl } from 'react-bootstrap'
import useForm from '../useForm'
import { IneligibilityReason } from '../../types/types'

type IneligibleProps = {
  reason: IneligibilityReason
}

export const Ineligible: React.FunctionComponent<IneligibleProps> = ({
  reason,
}: IneligibleProps) => {
  return (
    <>
      {reason === 'AGE' && (
        <div>
          <h1>Thank you for your interest</h1>
          Unfortunately, you have to be older than 18 years of age to be part of
          this study registry. [Text to be]
        </div>
      )}
       {reason === 'LOCATION' && (
        <div>
          <h1>Thank you for your interest</h1>
          Wrong location
        </div>
      )}
        {reason === 'CONSENT' && (
        <div>
          <h1>Thank you for your interest</h1>
         Can't consent
        </div>
      )}
       {reason === 'COVID' && (
        <div>
          <h1>Thank you for your interest</h1>
         Didn't have covid
        </div>
      )}
    </>
  )
}

export default Ineligible
