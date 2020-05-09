import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router'
import { SESSION_NAME } from '../../types/types'
import Button from '@material-ui/core/Button/Button'
import { ListItem } from '@material-ui/core'

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
        onLogout()
        sessionStorage.removeItem(SESSION_NAME)
        sessionStorage.clear()
        setNavigate(true)
    }
    if(navigate) {
  return (<Redirect to={redirectUrl || "/login" } push={true}/>)
    }
    else {
        return (
            <ListItem onClick={logout}>Log out</ListItem>
        )
    }
}

export default Logout

