import * as React from 'react'

import PatientCorpsInfo from './PatientCorpsInfo'
import Consent from './consent/Consent'
import Logout from './Logout'
import Login from './Login'
import Intro from './Intro'
import Survey from './Survey'
import Surveys from './Surveys'
import { useState } from 'react'
import {
  SESSION_NAME,
  LoggedInUserData,
  ENDPOINT,
  UserData,
  Response,
} from '../types/types'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid'

import { callEndpoint, getSession } from '../helpers/utility'
import Dashboard from './Dashboard'

type USER_STATE =
  | 'HOME'
  | 'REGISTER'
  | 'LOGIN_START'
  | 'LOGIN'
  | 'CONSENT'
  | 'SURVEY'
  | 'SURVEYS'

export type PatientCorpsHomeProps = {

  searchParams?: any
  page?: USER_STATE
}
//?email=alina.gendel%2Bny1%40gmail.com&token=pI3j28A8H5TXo8oBPIuUU

// NEW syntax for typing function components
const PatientCorpsHome: React.FunctionComponent<PatientCorpsHomeProps> = ({

  searchParams,
  page,
  ...rest
}: PatientCorpsHomeProps) => {
  const [token, setToken] = useState<string | undefined>(
    getSession()?.token
  )
  // const [consented, setConsented] = useState(false)

  const [userInfo, setUserInfo] = useState<LoggedInUserData>()
  const [isLoading, setIsLoading] = useState(true)
  React.useEffect(() => {
    let isSubscribed = true
    setIsLoading(true)
    async function getInfo(token: string) {
      try {
        const response = await callEndpoint<LoggedInUserData>(
          `${ENDPOINT}/v3/participants/self`,
          'GET',
          {},
          token,
        )
  
        if (isSubscribed) {
          //const result = await response.json()
          console.log(response.data)
          if (response.status === 401) {
            sessionStorage.clear()
            setToken(undefined)
            setUserInfo(undefined)
          } else {
            setUserInfo(response.data)
          }
          setIsLoading(false)
        }
      } catch (error) {
        //setErrorMessage(error)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (token) {
      getInfo(token)
    } else {
      setIsLoading(false)
    }
    return () => {
      isSubscribed = false
    }
  }, [token])

 
  const updateUserInfo = (data: LoggedInUserData, status?: number) => {
    setUserInfo(data)
    //alert(JSON.stringify(data, null, 2))
  }

  const renderLoginOut = (
    token?: string | null,
    page?: USER_STATE,
  ): JSX.Element => {
    let link = <></>
    if (token) {
      link = <Logout onLogout={() => setToken(undefined)}></Logout>
    } else {
      link = page === 'LOGIN' ? <></> : <a href="/Login">Login</a>
    }

    return <div style={{ float: 'right' }}>{link}</div>
  }

  const isLoggedInAndConsented = (
    token?: string | null,
    userInfo?: LoggedInUserData,
  ): boolean => {
    return !!token && !!userInfo?.consented
  }

  const isLoggedInAndNotConsented = (
    token?: string | null,
    userInfo?: LoggedInUserData,
  ): boolean => {
    return !!token && !userInfo?.consented
  }

  return (

        <div className="PatientCorps theme-drug-upload-tool">
          {isLoading && (
            <div className="text-center">
              <span className="spinner" />
            </div>
          )}
          {!isLoading && (
         
              <div>
                {renderLoginOut(token, page)}
                {page === 'HOME' && !token && <Intro token={token|| null}></Intro>}
                {(page === 'CONSENT' ||
                  isLoggedInAndNotConsented(token, userInfo)) && (
                  <Consent
                    name={userInfo?.firstName || ''}
                    setConsentFn={(isConsented: boolean) =>
                      setUserInfo(userInfo => {
                        return { ...userInfo!, consented: isConsented }
                      })
                    }
                    token={token!}
                  ></Consent>
                )}
             
            
                {token && page === 'SURVEY' && (
                  <Survey token={token} callbackFn={() => {}}></Survey>
                )}
                {token && page === 'SURVEYS' && (
                  <Surveys token={token} callbackFn={() => {}}></Surveys>
                )}
              </div>
          
          )}
        </div>
     
  )
}

/*
  axios.post('https://webservices.sagebridge.org/v3/itp', {
        studyId: 'sage-mpower-2',
        phone: {number: phoneFormatted, regionCode: 'US'},
        subpopGuid: 'sage-mpower-2',
        osName: osName,
        consentSignature: {
          name: this.$store.getName(),
          scope: this.$store.getSharingScope()
        }
      }).t
      */
export default PatientCorpsHome
