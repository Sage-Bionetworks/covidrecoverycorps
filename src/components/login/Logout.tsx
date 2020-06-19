import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useSessionDataDispatch } from '../../AuthContext'

type LogoutProps = {
  redirectUrl?: string
  onLogout: Function
}

export const Logout: React.FunctionComponent<LogoutProps> = ({
  redirectUrl,
  onLogout,
}: LogoutProps) => {
  const [navigate, setNavigate] = useState(false)
  const sessionUpdateFn = useSessionDataDispatch()
  const logout = () => {
    sessionUpdateFn({ type: 'LOGOUT' })
    onLogout()

    setNavigate(true)
  }
  if (navigate) {
    return <Redirect to={redirectUrl || '/login'} push={true} />
  } else {
    return <span onClick={logout}>Log out</span>
  }
}

export default Logout
