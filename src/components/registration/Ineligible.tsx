import React, { useState, useEffect } from 'react'

import { MailChimpFormFields } from '../../types/types'
import TextField from '@material-ui/core/TextField/TextField'
import { Button } from '@material-ui/core'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { useTranslation } from 'react-i18next'

type IneligibleProps = {}

const url =
  'https://sagebionetworks.us7.list-manage.com/subscribe/post?u=b146de537186191a9d2110f3a&amp;id=46d182222e'

export const Ineligible: React.FunctionComponent<IneligibleProps> = ({}: IneligibleProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [mailListJoined, setMailListJoined] = useState<boolean | undefined>()
  const formData: MailChimpFormFields = {
    EMAIL: email,
    NAME: name,
    ZIP: zipcode,
  }
  const { t } = useTranslation()

  return (
    <>
      <div>
        <h2>{t('ineligible.text1')}</h2>
        {mailListJoined && <p>{t('ineligible.text2')}</p>}
        {!mailListJoined && (
          <div>
            <p>{t('ineligible.text3')}</p>
            <p>{t('ineligible.text4')}</p>
            <p>{t('ineligible.text5')}</p>
            <div className="form-group">
              {
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
                              placeholder={t('common.fullName')}
                              aria-label={t('common.fullName')}
                              variant="outlined"
                              onChange={e => setName(e.target.value)}
                              label={t('common.fullName')}
                            />
                          </div>
                          <div className="input--min-padded">
                            <TextField
                              name="email"
                              type="email"
                              variant="outlined"
                              fullWidth
                              value={email}
                              placeholder={t('common.email')}
                              aria-label={t('common.email')}
                              label={t('common.email')}
                              onChange={e => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="input--min-padded">
                            <TextField
                              name="zip"
                              type="text"
                              variant="outlined"
                              fullWidth
                              value={zipcode}
                              placeholder={t('common.zipCode')}
                              aria-label={t('common.zipCode')}
                              label={t('common.zipCode')}
                              onChange={e => setZipcode(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => email && name && subscribe(formData)}
                        >
                          {t('ineligible.text6')}
                        </Button>
                        {status === 'sending' && (
                          <div>{t('ineligible.text7')}</div>
                        )}
                        {status === 'success' && setMailListJoined(true)}
                        {status === 'error' && message && (
                          <div dangerouslySetInnerHTML={{ __html: message }} />
                        )}
                      </div>
                    )}
                  />
                </div>
              }
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Ineligible
