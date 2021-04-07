import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles'
import Logout from '../login/Logout'

import btnClose from '../../assets/btn_close_dark.svg'
import {
  ListItem,
  List,
  Divider,
  Hidden,
  Grid,
  Button,
  Link,
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import { openSansFont } from '../../App'
import { getSearchParams } from '../../helpers/utility'
import { useSessionDataState, useSessionDataDispatch } from '../../AuthContext'
import GlobalAlertCopy from './GlobalAlertCopy'
import { ReactComponent as CovidRecoveryCorpsLogo } from '../../assets/CovidRecoveryCorpsLogo.svg'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'
import { Feature, TOGGLE_NAMES } from '../../helpers/FeatureToggle'
import LanguageIcon from '../../assets/language_icon.svg'

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
  showTopNavigator: boolean
}
const drawerWidth = 275
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#2E2E2E', // dark
    backgroundColor: '#FCFCFC', // light
    minHeight: '80px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 275px)',
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  navBarLink: {
    color: '#2E2E2E',
    '&:hover': {
      textDecoration: 'none',
      color: '#2E2E2E',
    },
  },
  fullNavBarLink: {
    fontFamily: openSansFont,
    color: '#2E2E2E',
    marginLeft: 30,
    paddingBottom: 7,
    fontWeight: 400,
    '&:hover': {
      textDecoration: 'none',
      color: '#2E2E2E',
    },
    '&:focus': {
      textDecoration: 'none',
      color: '#2E2E2E',
    },
  },
  fullNavBarLinkActive: {
    borderBottom: '4px solid #0084FF',
  },
  globalAlertMessage: {
    width: '100%',
  },
  fullNavBarButton: {
    whiteSpace: 'nowrap',
    minWidth: '100px',
    height: '37px',

    fontWeight: 'bold',
    border: '2px solid',
    '&:hover': {
      border: '2px solid',
    },
  },
  navbarTitle: {
    paddingTop: '11px',
    paddingLeft: '15px',
  },
  mobileMenuItem: {
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '30px',
    fontStyle: 'normal',
    padding: '10px 0px 10px 40px',
    color: '#2A2A2A',
  },
  mobileMenuSeparator: {
    height: '2px',
    margin: '20px 0px',
    backgroundColor: '#2A2A2A',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    height: '72px',
    marginBottom: '10px',
  },
  drawerCloseButton: {
    width: '48px',
  },
  drawerCloseIcon: {
    color: '#2A2A2A',
  },
  languageIcon: {
    marginRight: theme.spacing(0.5),
  },
}))

export const TopNav: React.FunctionComponent<TopNavProps> = props => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [language, setLanguage] = React.useState(i18n.language)
  const classes = useStyles()
  const sessionData = useSessionDataState()
  const alertCode = sessionData.alert
  const sessionUpdateFn = useSessionDataDispatch()
  //const [alertCode, setAlertCode] = useSessionStorage('alert', undefined)

  const { t } = useTranslation()

  const clearAlertCode = () => {
    //setAlertCode(undefined)
    sessionUpdateFn({ type: 'CLEAR_ALERT' })
  }
  const isGlobalNotificationAlertHidden = (location: string): boolean => {
    const specialPages = ['settings', 'appointment', 'consent']
    return (
      specialPages.find(page => location.toLowerCase().includes(page)) !==
      undefined
    )
  }
  const isGlobalNotificationAlertHiddenFlag = isGlobalNotificationAlertHidden(
    window.location.pathname,
  )
  if (!isGlobalNotificationAlertHiddenFlag) {
    const searchParamsProps = getSearchParams(window.location.search)
    const searchParamAlertCode: string = searchParamsProps['alert']
    if (searchParamAlertCode && searchParamAlertCode !== alertCode) {
      sessionUpdateFn({
        type: 'SET_ALERT',
        payload: { ...sessionData, alert: searchParamAlertCode },
      })
      // setAlertCode(searchParamAlertCode)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    setLanguage(i18n.language)
  }, [i18n.language])

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'es' ? 'en' : 'es'
    window.localStorage.setItem('appUILang', newLanguage)

    i18n.changeLanguage(newLanguage)
  }

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Link
          onClick={handleDrawerToggle}
          className={classes.drawerCloseButton}
        >
          <img className={classes.drawerCloseIcon} src={btnClose}></img>
        </Link>
      </div>
      <List>
        <NavLink
          to="/home"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>
            {t('topnav.text1')}
          </ListItem>
        </NavLink>
        <NavLink
          to="/team"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>
            {t('topnav.text2')}
          </ListItem>
        </NavLink>
        <NavLink
          to="/faqs"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>
            {t('topnav.text3')}
          </ListItem>
        </NavLink>
        {
          <NavLink
            to="/learninghub"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('topnav.text31')}
            </ListItem>
          </NavLink>
        }
        <NavLink
          to="/contact"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>
            {t('topnav.text4')}
          </ListItem>
        </NavLink>
        <NavLink
          to="/privacypolicy"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>
            {t('topnav.text5')}
          </ListItem>
        </NavLink>

        <Feature toggleName={TOGGLE_NAMES.SPANISH}>
          <ListItem
            button
            className={classes.mobileMenuItem}
            onClick={() => {
              handleDrawerToggle()
              changeLanguage()
            }}
          >
            <img src={LanguageIcon} className={classes.languageIcon}></img>
            {language === 'es' ? 'in English' : 'en español'}
          </ListItem>
        </Feature>
        <Divider className={classes.mobileMenuSeparator} />
        {props.token && sessionData.consented && (
          <NavLink
            to="/dashboard"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('topnav.text6')}
            </ListItem>
          </NavLink>
        )}
        {props.token && sessionData.consented && (
          <NavLink
            to="/settings"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('topnav.text7')}
            </ListItem>
          </NavLink>
        )}
        {props.token && (
          <NavLink
            to="/logout"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              <Logout
                onLogout={() => {
                  props.logoutCallbackFn(undefined, '', false)
                }}
              ></Logout>
            </ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/eligibility"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('common.joinUs')}
            </ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/login"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>
              {t('topnav.text8')}
            </ListItem>
          </NavLink>
        )}
      </List>
    </div>
  )

  const fullScreenNavBar = (
    <div style={{ display: language === 'es' ? 'flex' : 'block' }}>
      <NavLink
        to="/home"
        className={classes.fullNavBarLink}
        style={{ whiteSpace: 'nowrap' }}
        activeClassName={classes.fullNavBarLinkActive}
      >
        {t('topnav.text1')}
      </NavLink>
      <NavLink
        to="/team"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        {t('topnav.text2')}
      </NavLink>
      <NavLink
        to="/faqs"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        {t('topnav.text3')}
      </NavLink>

      <NavLink
        to="/learninghub"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        {t('topnav.text31')}
      </NavLink>
      <NavLink
        to="/contact"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        {t('topnav.text4')}
      </NavLink>
      <NavLink
        to="/privacypolicy"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        {t('topnav.text5')}
      </NavLink>
      {props.token && sessionData.consented && (
        <NavLink
          to="/dashboard"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          {t('topnav.text6')}
        </NavLink>
      )}
      {props.token && sessionData.consented && (
        <NavLink
          to="/settings"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          {t('topnav.text7')}
        </NavLink>
      )}
      <Feature toggleName={TOGGLE_NAMES.SPANISH}>
        <a
          className={classes.fullNavBarLink}
          style={{ whiteSpace: 'nowrap' }}
          onClick={() => changeLanguage()}
        >
          <img src={LanguageIcon} className={classes.languageIcon}></img>
          {language === 'es' ? 'in English' : 'en español'}
        </a>
      </Feature>

      {props.token && (
        <NavLink
          to="/logout"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          <Logout
            onLogout={() => {
              props.logoutCallbackFn(undefined, '', false)
            }}
          ></Logout>
        </NavLink>
      )}
      {!props.token && (
        <NavLink
          style={{ marginLeft: '60px' }}
          to="/login"
          className={classes.fullNavBarLink}
        >
          <Button variant="outlined" className={classes.fullNavBarButton}>
            {t('topnav.text8')}
          </Button>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/eligibility" className={classes.fullNavBarLink}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.fullNavBarButton}
          >
            {t('common.joinUs')}
          </Button>
        </NavLink>
      )}
    </div>
  )
  return (
    <div>
      {props.showTopNavigator ? (
        <div>
          <CssBaseline />
          <div className="no-print">
            <Toolbar className={classes.toolBar}>
              <div>
                <Typography variant="h6" noWrap className={classes.navbarTitle}>
                  <NavLink to="/home">
                    <CovidRecoveryCorpsLogo />
                  </NavLink>
                </Typography>
              </div>

              {/* show hamburger menu on xs and sm, but full nav bar on md and up */}
              <Hidden lgUp>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </IconButton>
              </Hidden>
              <Hidden mdDown>{fullScreenNavBar}</Hidden>
            </Toolbar>
          </div>
          <nav className={classes.drawer}>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          {/* global alert area */}
          {alertCode && !isGlobalNotificationAlertHiddenFlag && (
            <Alert
              severity="error"
              variant="filled"
              icon={false}
              classes={{
                message: classes.globalAlertMessage,
              }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <GlobalAlertCopy code={alertCode}></GlobalAlertCopy>
              </Grid>
            </Alert>
          )}
          <div className={classes.content}>{props.children}</div>
        </div>
      ) : (
        <div className={classes.content}>{props.children}</div>
      )}
    </div>
  )
}

export default TopNav
