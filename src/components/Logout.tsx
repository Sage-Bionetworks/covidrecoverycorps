import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router'
import { SESSION_NAME } from '../types/types'

//import {SESSION_NAME} from './types'

type LogoutProps = {
  redirectUrl?: string
  onLogout: Function
}

export const Logout: React.FunctionComponent<LogoutProps> = ({
    redirectUrl,
    onLogout
}: LogoutProps) => {
    const [navigate, setNavigate] = useState(false)
    const logout = () => {
        sessionStorage.removeItem(SESSION_NAME)
        sessionStorage.clear()
        onLogout()
        setNavigate(true)
    }
    if(navigate) {
  return (<Redirect to={redirectUrl || "/" } push={true}/>)
    }
    else {
        return (
            <button onClick={logout}>Log out</button>
        )
    }
}

export default Logout

