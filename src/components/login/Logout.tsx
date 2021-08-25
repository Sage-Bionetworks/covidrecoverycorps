import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useSessionDataDispatch } from '../../AuthContext'
import { makeStyles, Button } from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  fullNavBarButton: {
    width: '100px',
    height: '37px',
    fontWeight: 'bold',
    border: '2px solid',
    '&:hover': {
      border: '2px solid',
    },
  },
}))
type LogoutProps = {
  redirectUrl?: string
  onLogout: Function
}

export const Logout: React.FunctionComponent<LogoutProps> = ({
  redirectUrl,
  onLogout,
}: LogoutProps) => {
  const [navigate, setNavigate] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation()
  const sessionUpdateFn = useSessionDataDispatch()
  const logout = () => {
    sessionUpdateFn({ type: 'LOGOUT' })
    onLogout()

    setNavigate(true)
  }
  if (navigate) {
    return <Redirect to={redirectUrl || '/login'} push={true} />
  } else {
    return (
      <Button
        color="primary"
        variant="outlined"
        className={classes.fullNavBarButton}
        style={{ lineHeight: '100%' }}
        onClick={logout}
      >
        {t('common.logOut')}
      </Button>
    )
  }
}

export default Logout
