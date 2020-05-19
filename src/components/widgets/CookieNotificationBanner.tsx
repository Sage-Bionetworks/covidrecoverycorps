import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'

export const privacyPolicyLink: string = '/PrivacyPolicy_v1.0-04.May.2020.pdf'

export default function CookieNotificationBanner() {
  const isCookiePolicyPreviouslyAccepted: boolean =
    localStorage.getItem('cookiePolicyAccepted') == 'true'
  const [isCookiePolicyAccepted, setIsCookiePolicyAccepted] = useState<boolean>(
    isCookiePolicyPreviouslyAccepted,
  )
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
        <div>
          This site uses Cookies to enhance your experience and to analyze our
          traffic. Using this website means that you agree with our cookie
          policy.
        </div>
        <a target="_blank" rel="noopener noreferrer" href={privacyPolicyLink}>
          {' '}
          <u> Learn more</u>
        </a>
      </div>
      <Button
        variant="contained"
        onClick={() => setIsCookiePolicyAccepted(true)}
      >
        {' '}
        OK{' '}
      </Button>
    </div>
  )
}
