import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles';
import Logout from '../login/Logout'
import { ListItem, List, Divider, Hidden, Grid } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import {getSearchParams} from '../../App'
import GlobalAlertCopy from './GlobalAlertCopy';

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
}
const drawerWidth = 240;
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
    color: '#F2F2F2',  // light
    backgroundColor: '#2E2E2E' // dark
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    color: '#F2F2F2', // light
    marginLeft: 25,
    paddingBottom: 7,
    '&:hover': {
      textDecoration: 'none',
      color: '#F2F2F2',
    },
    '&:focus': {
      textDecoration: 'none',
      color: '#F2F2F2',
    },
  },
  fullNavBarLinkActive: {
    borderBottom: '4px solid #0084FF'
  },
  globalAlertMessage: {
    width: '100%'
  }
}))

export const TopNav: React.FunctionComponent<TopNavProps> = (
  props
) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles()
  const searchParamsProps = getSearchParams(
    window.location.search
  )
  const alertCode:string = searchParamsProps['alert']
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = <div>
    <List>
      {props.token && (
        <NavLink to="/dashboard" onClick={handleDrawerToggle} className={classes.navBarLink}>
          <ListItem button>
              Survey Dashboard
          </ListItem>
        </NavLink>
      )}
      <NavLink to="/home" onClick={handleDrawerToggle} className={classes.navBarLink}>
        <ListItem button>
            About
        </ListItem>
      </NavLink>
      <NavLink to="/team" onClick={handleDrawerToggle} className={classes.navBarLink}>
        <ListItem button>
            Meet the Researchers
        </ListItem>
      </NavLink>
      <NavLink to="/faqs" onClick={handleDrawerToggle} className={classes.navBarLink}>
        <ListItem button>
          FAQs
        </ListItem>
      </NavLink>
      <NavLink to="/contact" onClick={handleDrawerToggle} className={classes.navBarLink}>
        <ListItem button>
            Contact Us
        </ListItem>
      </NavLink>
      <Divider />
      {props.token && (
        <NavLink to="/settings" onClick={handleDrawerToggle} className={classes.navBarLink}>
          <ListItem button>
              Account Settings
          </ListItem>
        </NavLink>
      )}
      {props.token && (
        <NavLink to="/logout" onClick={handleDrawerToggle} className={classes.navBarLink}>
          <ListItem>
            <Logout
              onLogout={() => props.logoutCallbackFn(undefined, '', false)}
            ></Logout>
          </ListItem>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/eligibility" onClick={handleDrawerToggle} className={classes.navBarLink}>
        <ListItem>
          Join Us
        </ListItem>
      </NavLink>
      )}
      {!props.token && (
        <NavLink to="/login" onClick={handleDrawerToggle} className={classes.navBarLink}>
          <ListItem button>
            Log in
          </ListItem>
        </NavLink>
      )}
    </List>
  </div>

const fullScreenNavBar = <div>
  {props.token && (
    <NavLink to="/dashboard" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
        Survey Dashboard
    </NavLink>
  )}
  <NavLink to="/home" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
      About
  </NavLink>
  <NavLink to="/team" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
    Meet the Researchers
  </NavLink>
  <NavLink to="/faqs" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
      FAQs
  </NavLink>
  <NavLink to="/contact" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
      Contact Us
  </NavLink>
  {props.token && (
    <NavLink to="/settings" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
        Account Settings
    </NavLink>
  )}
  {props.token && (
    <NavLink to="/logout" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
      <Logout
        onLogout={() => props.logoutCallbackFn(undefined, '', false)}
      ></Logout>
    </NavLink>
  )}
  {!props.token && (
    <NavLink
      style={{ marginLeft: '50px' }}
      to="/eligibility" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}
    >
      Join Us
  </NavLink>
  )}
  {!props.token && (
    <NavLink to="/login" className={classes.fullNavBarLink} activeClassName={classes.fullNavBarLinkActive}>
          Log in
    </NavLink>
  )}
</div>

  return (
    <div>
      <CssBaseline />
      <Toolbar className={classes.toolBar}>
        <div>
          <Typography variant="h6" noWrap>
            <NavLink to="/home">
              Covid Recovery Corps
            </NavLink>
          </Typography>
        </div>
        
        {/* show hamburger menu on xs and sm, but full nav bar on md and up */}
        <Hidden mdUp>
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
        <Hidden smDown>
          {fullScreenNavBar}
        </Hidden>
      </Toolbar>
      
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
      {alertCode &&
        <Alert severity="info" variant="filled" icon={false} classes={{
          message: classes.globalAlertMessage}}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <GlobalAlertCopy code={alertCode}></GlobalAlertCopy>
          </Grid>
        </Alert>
      }
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  )
}

export default TopNav
