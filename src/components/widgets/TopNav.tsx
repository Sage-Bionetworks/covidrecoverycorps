import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Logout from '../login/Logout'
import { ListItem, List, Divider } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
}))

export const TopNav: React.FunctionComponent<TopNavProps> = (
  props
) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = <div>
    <List>
      <NavLink to="/home" activeClassName="active" onClick={handleDrawerToggle}>
        <ListItem button>
            About
        </ListItem>
      </NavLink>
      <NavLink to="/team" activeClassName="active" onClick={handleDrawerToggle}>
        <ListItem button>
            Meet the Researchers
        </ListItem>
      </NavLink>
      <NavLink to="/faqs" activeClassName="active" onClick={handleDrawerToggle}>
        <ListItem button>
          FAQs
        </ListItem>
      </NavLink>
      <NavLink to="/contact" activeClassName="active" onClick={handleDrawerToggle}>
        <ListItem button>
            Contact Us
        </ListItem>
      </NavLink>
      <Divider />
      {props.token && (
        <NavLink to="/settings" activeClassName="active" onClick={handleDrawerToggle}>
          <ListItem button>
              Settings
          </ListItem>
        </NavLink>
      )}
      {props.token && (
        <Logout
          onLogout={() => props.logoutCallbackFn(undefined, '', false)}
        ></Logout>
      )}
      {!props.token && (
        <NavLink to="/login" activeClassName="hidden" onClick={handleDrawerToggle}>
          <ListItem>
              Log in
          </ListItem>
        </NavLink>
      )}
      {!props.token && (
        <NavLink
          style={{ marginRight: '10px' }}
          to="/eligibility"
          activeClassName="hidden" onClick={handleDrawerToggle}
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
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </div>
    </div>
  )
}

export default TopNav
