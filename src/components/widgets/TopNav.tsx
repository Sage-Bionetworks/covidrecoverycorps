import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles';
import Logout from '../login/Logout'
import { ListItem, List, Divider } from '@material-ui/core'
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
    color: '#21394A',
    backgroundColor: 'rgb(254, 254, 254)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
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
    color: '#000',
    '&:hover': {
      textDecoration: 'none',
   },
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
            Meet the researchers
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
        <NavLink to="/home" onClick={handleDrawerToggle} className={classes.navBarLink}>
          <Logout
            onLogout={() => props.logoutCallbackFn(undefined, '', false)}
          ></Logout>
        </NavLink>
      )}
      {!props.token && (
        <NavLink to="/login" onClick={handleDrawerToggle} className={classes.navBarLink}>
          <ListItem>
              Log in
          </ListItem>
        </NavLink>
      )}
      {!props.token && (
        <NavLink
          style={{ marginRight: '10px' }}
          to="/eligibility" onClick={handleDrawerToggle} className={classes.navBarLink}
        >
        <ListItem>
            Join Us
        </ListItem>
      </NavLink>
      )}
    </List>
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
        
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </IconButton>
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
        <Alert severity="info" variant="filled" icon={false}>
          <GlobalAlertCopy code={alertCode}></GlobalAlertCopy>
        </Alert>
      }
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  )
}

export default TopNav
