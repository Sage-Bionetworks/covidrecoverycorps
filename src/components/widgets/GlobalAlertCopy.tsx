import React from 'react'
import { Button, Link } from '@material-ui/core'

export type GlobalAlertCopyProps = {
  code?: string
}

const codes: { [key: string]: JSX.Element } = {
  WITHDRAWN_FROM_STUDY: (
    <div>
      <div>We are sorry to see you go!</div><br></br><div>You are now withdrawn from the COVID Recovery Corps Study.</div>
    </div>
  ),
  CANCELLED_CONSENT: (
    <div>
      <div>You will need to complete the consent process before you can join the study.</div>
      <br></br>
      <Button
            // override standard secondary button color for the global alert
            style={{ backgroundColor: '#2E2E2E', color: '#F2F2F2'}}
            color="secondary"
            variant="contained"
            size="large"
            type="submit"
            fullWidth
            href='/consent'
          >
            Start consent
        </Button>

    </div>
  ),
}

export const GlobalAlertCopy: React.FunctionComponent<GlobalAlertCopyProps> = ({
  code
}: GlobalAlertCopyProps) => {
  if (code) {
    return codes[code]
  }

  return <></>
}

export default GlobalAlertCopy
