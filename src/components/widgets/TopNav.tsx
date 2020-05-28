import React, { useState } from 'react'
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
import GlobalAlertCopy from './GlobalAlertCopy'
import { ReactComponent as CovidRecoveryCorpsLogo } from '../../assets/CovidRecoveryCorpsLogo.svg'

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
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
    width: '100px',
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
    color: '#2A2A2A'
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
}))

export const TopNav: React.FunctionComponent<TopNavProps> = props => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const classes = useStyles()
  const searchParamsProps = getSearchParams(window.location.search)
  const alertCode: string = searchParamsProps['alert']
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Link onClick={handleDrawerToggle} className={classes.drawerCloseButton}>
          <img
            className={classes.drawerCloseIcon}
            src={btnClose}
          ></img>
        </Link>
      </div>
      <List>
      
        <NavLink
          to="/home"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>About</ListItem>
        </NavLink>
        <NavLink
          to="/team"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>Meet the Researchers</ListItem>
        </NavLink>
        <NavLink
          to="/faqs"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>FAQs</ListItem>
        </NavLink>
        <NavLink
          to="/contact"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>Contact Us</ListItem>
        </NavLink>
        <NavLink
          to="/privacypolicy"
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
        >
          <ListItem button className={classes.mobileMenuItem}>Privacy Policy</ListItem>
        </NavLink>
        <Divider className={classes.mobileMenuSeparator} />
        {props.token && (
          <NavLink
            to="/dashboard"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>Survey Dashboard</ListItem>
          </NavLink>
        )}
        {props.token && (
          <NavLink
            to="/settings"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>Account Settings</ListItem>
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
                onLogout={() => props.logoutCallbackFn(undefined, '', false)}
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
            <ListItem button className={classes.mobileMenuItem}>Join Us</ListItem>
          </NavLink>
        )}
        {!props.token && (
          <NavLink
            to="/login"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>Log in</ListItem>
          </NavLink>
        )}
      </List>
    </div>
  )

  const fullScreenNavBar = (
    <div>
     
      <NavLink
        to="/home"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        About
      </NavLink>
      <NavLink
        to="/team"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        Meet the Researchers
      </NavLink>
      <NavLink
        to="/faqs"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        FAQs
      </NavLink>
      <NavLink
        to="/contact"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        Contact Us
      </NavLink>
      <NavLink
        to="/privacypolicy"
        className={classes.fullNavBarLink}
        activeClassName={classes.fullNavBarLinkActive}
      >
        Privacy Policy
      </NavLink>
      {props.token && (
        <NavLink
          to="/dashboard"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          Survey Dashboard
        </NavLink>
      )}
      {props.token && (
        <NavLink
          to="/settings"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          Account Settings
        </NavLink>
      )}
      {props.token && (
        <NavLink
          to="/logout"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          <Logout
            onLogout={() => props.logoutCallbackFn(undefined, '', false)}
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
            Log in
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
            Join Us
          </Button>
        </NavLink>
      )}
    </div>
  )

  return (
    <div>
      <CssBaseline />
      <div>
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
      {alertCode && (
        <Alert
          severity="error"
          variant="filled"
          icon={false}
          classes={{
            message: classes.globalAlertMessage,
          }}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <GlobalAlertCopy code={alertCode}></GlobalAlertCopy>
          </Grid>
        </Alert>
      )}
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

export default TopNav
