import React, { useState, useEffect } from 'react'


import { IneligibilityReason, MailChimpFormFields } from '../../types/types'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'

import TextField from '@material-ui/core/TextField/TextField'
import { Button } from '@material-ui/core'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

type IneligibleProps = {
  reason: IneligibilityReason
}

const url = 'https://sagebionetworks.us7.list-manage.com/subscribe/post?u=b146de537186191a9d2110f3a&amp;id=46d182222e'

export const Ineligible: React.FunctionComponent<IneligibleProps> = ({
  reason,
}: IneligibleProps) => {
  const [mailList, setMailList] = useState<boolean | undefined>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [mailListJoined, setMailListJoined] = useState<boolean | undefined>()
  const formData:MailChimpFormFields = {
    EMAIL: email,
    NAME: name,
    ZIP: zipcode
  }
  return (
    <>
      {reason === 'AGE' && (
        <div>
          <h1>Thank you for your interest</h1>
          <p>
          Unfortunately, you have to be older than 18 years of age to be part of
          this study registry. [Text to be]
          </p>
        </div>
      )}
      {reason === 'LOCATION' && (
        <div>
          <h1>Thank you for your interest</h1>
          { mailListJoined && (
            <p>
                You have successfully joined the mailing list. We will notify you in the coming months
                if the program expands into your area.
            </p>
          )}
          { !mailListJoined && (
            <div>
              <p>
              Unfortunately, we are currently focusing on the NYC region at the
              moment. We are hoping to expand in the coming months. Would you like
              to join our mailing list and be notified in the future?
              </p>
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
                    <MailchimpSubscribe
                      url={url}
                      render={({ subscribe, status, message }) => (
                        <div>
                          <div className="form-group">
                            <div className="input--min-padded">
                              <TextField
                                name="name"
                                value={name}
                                fullWidth
                                placeholder="full name"
                                aria-label="full name"
                                variant="outlined"
                                onChange={(e) => setName(e.target.value)}
                                label="Full name"
                              />
                            </div>
                            <div className="input--min-padded">
                              <TextField
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                placeholder="email"
                                aria-label="email"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="input--min-padded">
                              <TextField
                                name="zip"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={zipcode}
                                placeholder="zip code"
                                aria-label="zip code"
                                label="Zip code"
                                onChange={(e) => setZipcode(e.target.value)}
                              />
                            </div>
                          </div>
                          <Button variant="contained" color="primary" fullWidth onClick={
                            () =>
                              email &&
                              name &&
                              subscribe(formData)
                          }>Join Mailing List</Button>
                          {status === "sending" && <div>Joining Mailing List...</div>}
                          {status === "success" && setMailListJoined(true)}
                          {status === "error" && message && (
                            <div
                              dangerouslySetInnerHTML={{ __html: message }}
                            />
                          )}
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
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
