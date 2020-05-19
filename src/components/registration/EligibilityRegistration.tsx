import * as React from 'react'
import { Response, LoggedInUserData, LoginType } from '../../types/types'

import { useState } from 'react'
import Eligiblity from './Eligibility'
import Ineligible from './Ineligible'
import SignInWithCode from '../login/SignInWithCode'
import { IneligibilityReason, SESSION_NAME } from '../../types/types'
import Registration from './Registration'
import { RouteComponentProps } from 'react-router-dom'
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';


export type EligibilityRegistrationOwnProps = {
  callbackFn: Function
}

export type EligibilityRegistrationProps = EligibilityRegistrationOwnProps &
  RouteComponentProps

const EligibilityRegistration: React.FunctionComponent<EligibilityRegistrationProps> = ({
  history,
  callbackFn,
}: EligibilityRegistrationProps) => {
  const [eligible, setEligible] = useState<boolean | undefined>(undefined)
  const [ineligibilityReason, setIneligibilityReason] = useState<
    IneligibilityReason | undefined
  >(undefined)

  const [loginType, setLoginType] = useState<LoginType>()
  const [phoneOrEmail, setPhoneOrEmail] = useState('')

  const [error, setError] = useState<string>()

  const handleLoggedIn = (loggedIn: Response<LoggedInUserData>) => {
    const consented = loggedIn.status !== 412
    if (loggedIn.ok || !consented) {
      callbackFn(loggedIn.data.sessionToken, loggedIn.data.firstName)
      if (consented) {
        history.push('/dashboard')
      } else {
        history.push('/consent')
      }
    } else {
      setError('Error ' + loggedIn.status)
    }
  }

  return (
    <Card>
      <CardContent>
      {eligible === undefined && (
        <Eligiblity
          setEligibilityFn={(
            isEligible: boolean,
            reason: IneligibilityReason
          ) => {
            setEligible(isEligible)
            setIneligibilityReason(reason)
            window.scrollTo(0,0)
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
            phoneOrEmail: string
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
          loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
            handleLoggedIn(result)
          }
        ></SignInWithCode>
      )}
      </CardContent>
    </Card>
  )
}

export default EligibilityRegistration
