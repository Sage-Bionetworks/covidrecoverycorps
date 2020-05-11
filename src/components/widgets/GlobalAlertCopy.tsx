import React from 'react'

export type GlobalAlertCopyProps = {
  code?: string
}

const codes: { [key: string]: JSX.Element } = {
  WITHDRAWN_FROM_STUDY: (
    <div>
      <div>We are sorry to see you go!</div><br></br><div>You are now withdrawn from the COVID Recovery Corps Study.</div>
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
