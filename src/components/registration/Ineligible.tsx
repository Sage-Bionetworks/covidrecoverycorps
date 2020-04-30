import React, { useState, useEffect } from 'react'

import useForm from '../useForm'
import { IneligibilityReason } from '../../types/types'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import FormControl from '@material-ui/core/FormControl/FormControl'
import TextField from '@material-ui/core/TextField/TextField'
import { Button } from '@material-ui/core'

type IneligibleProps = {
  reason: IneligibilityReason
}

export const Ineligible: React.FunctionComponent<IneligibleProps> = ({
  reason,
}: IneligibleProps) => {
  const [mailList, setMailList] = useState<boolean | undefined>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [zipcodel, setZipcode] = useState('')
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
          Unfortunately, we are currently focusing on the NYC region at the
          moment. We are hoping to expand in the coming months. Would you like
          to join our mailing list and be notified in the future?
          <div className="form-group">
            <ToggleButtonGroup
              value={mailList}
              exclusive
              className="verticalToggle"
              onChange={(_event: any, val: boolean) => setMailList(val)}
              aria-label="join mailing list"
            >
              ><ToggleButton value={true}>Yes</ToggleButton>
              <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
            {mailList && (
              <div>
                <div className="form-group">
           
                <TextField
                  name="name"
                  value={name}
                  fullWidth
           
                  placeholder="Full Name"
                  aria-label="Full Name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  label="Full Name"
                />
                <TextField
                  name="email"
              
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  placeholder="email"
                  aria-label="email"
                  label="email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  name="zip"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={email}
                  placeholder="zip code"
                  aria-label="zip code"
                  label="zip code"
                  onChange={(e) => setZipcode(e.target.value)}
                />
                </div>
                <Button variant="contained" color="primary" fullWidth onClick={()=>alert ('todo')}>Join Mailing List</Button>
              </div>
            )}
          </div>
        </div>
      )}
      {reason === 'CONSENT' && (
        <div>
          <h1>Thank you for your interest</h1>
          Can't consent. [Need text]
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
