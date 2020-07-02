import React from 'react'
import { Button, Link } from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next'
import i18next from 'i18next'
import i18n from '../../i18n'

export type GlobalAlertCopyProps = {
  code?: string
}

export const GlobalAlertCopy: React.FunctionComponent<GlobalAlertCopyProps> = ({
  code,
}: GlobalAlertCopyProps) => {
  const { t } = useTranslation()

  const codes: { [key: string]: JSX.Element } = {
    WITHDRAWN_FROM_STUDY: (
      <div>
        <Trans i18nKey="globalAlert.withdrawn">
          <div>[translate]</div>
          <br></br>
          <div>[translate]</div>
        </Trans>
      </div>
    ),
    CANCELLED_CONSENT: (
      <div>
        <div>{t('globalAlert.cancelledConsent')}</div>
        <br></br>
        <Button
          // override standard secondary button color for the global alert
          style={{ backgroundColor: '#2E2E2E', color: '#F2F2F2' }}
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          href="/consent"
        >
          {t('globalAlert.startConsent')}
        </Button>
      </div>
    ),
    APPOINTMENT_BOOKED: (
      <div>
        <div>{t('globalAlert.booked')}</div>
        <br></br>
        <Button
          // override standard secondary button color for the global alert
          style={{ backgroundColor: '#2E2E2E', color: '#F2F2F2' }}
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          href="/appointment"
        >
          {t('globalAlert.viewDetails')}
        </Button>
      </div>
    ),
  }
  if (code) {
    return codes[code]
  }

  return <></>
}

export default GlobalAlertCopy
