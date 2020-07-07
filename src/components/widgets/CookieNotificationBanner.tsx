import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

export default function CookieNotificationBanner() {
  const isCookiePolicyPreviouslyAccepted: boolean =
    localStorage.getItem('cookiePolicyAccepted') == 'true'
  const [isCookiePolicyAccepted, setIsCookiePolicyAccepted] = useState<boolean>(
    isCookiePolicyPreviouslyAccepted,
  )

  const { t } = useTranslation()
  useEffect(() => {
    localStorage.setItem(
      'cookiePolicyAccepted',
      isCookiePolicyAccepted.toString(),
    )
  }, [isCookiePolicyAccepted])

  return (
    <div
      className="cookiesBanner"
      style={{
        display: isCookiePolicyAccepted ? 'none' : 'flex',
      }}
    >
      <div>
        <div>{t('cookieBanner.text1')}</div>
        <Link to="/privacypolicy">{t('common.learnMore')}</Link>
      </div>
      <Button
        variant="contained"
        onClick={() => setIsCookiePolicyAccepted(true)}
      >
        {t('common.ok')}
      </Button>
    </div>
  )
}
