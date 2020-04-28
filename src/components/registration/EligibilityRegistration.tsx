import * as React from 'react'
import { Response, LoggedInUserData, LoginType } from '../types'

import { useState } from 'react'
import Eligiblity from './Eligibility'
import Ineligible from './Ineligible'
import SignInWithCode from '../SignInWithCode'
import { IneligibilityReason, SESSION_NAME } from '../types'
import Registration from '../Registration'
import { callbackify } from 'util'
import { Grid } from '@material-ui/core'



export type EligibilityRegistrationProps = {
  
  callbackFn?: Function
}
//?email=alina.gendel%2Bny1%40gmail.com&token=pI3j28A8H5TXo8oBPIuUU

// NEW syntax for typing function components
const EligibilityRegistration: React.FunctionComponent<EligibilityRegistrationProps> = ({

  callbackFn,
}: EligibilityRegistrationProps) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem(SESSION_NAME),
  )
  const [eligible, setEligible] = useState<boolean | undefined>(undefined)
  const [ineligibilityReason, setIneligibilityReason] = useState<
    IneligibilityReason | undefined
  >(undefined)


  const [loginType, setLoginType] = useState<LoginType>()
  const [phoneOrEmail, setPhoneOrEmail] = useState('')

  const [error, setError] = useState<string>()

  const setSessionToken = (sessionToken: string) => {
    sessionStorage.setItem(SESSION_NAME, sessionToken)
    setToken(sessionToken)
  }

  

  return (
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    spacing={2}
  >
  <Grid item xs={10} md={8} lg={6} className="EligibilityRegistration">   
      {eligible === undefined && (
        <Eligiblity
          setEligibilityFn={(
            isEligible: boolean,
            reason: IneligibilityReason,
          ) => {
            setEligible(isEligible)
            setIneligibilityReason(reason)
          }}
        ></Eligiblity>
      )}
      {eligible === false && (
        <Ineligible reason={ineligibilityReason!}></Ineligible>
      )}
      {eligible && !loginType && (
        <Registration
          onSuccessFn={(
            type: LoginType,
            status: number,
            data: object,
            phoneOrEmail: string,
          ) => {
            setLoginType(type)
            setPhoneOrEmail(phoneOrEmail)
          }}
          onErrorFn={(status: number) => {
            setError(status + '')
          }}
        ></Registration>
      )}
      {eligible && loginType && (
        <SignInWithCode
          loginType={loginType}
          phoneOrEmail={phoneOrEmail}
          loggedInByPhoneFn={(result: Response<LoggedInUserData>) => {
            setSessionToken(result.data.sessionToken)
            alert(JSON.stringify(result, null, 2))
            if (callbackFn){
              callbackFn(result.data)
            }
          }}
        ></SignInWithCode>
      )}
     </Grid>
     </Grid>
  )
}

export default EligibilityRegistration
