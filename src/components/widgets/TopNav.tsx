import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles'
import Logout from '../login/Logout'
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
import { privacyPolicyLink } from './CookieNotificationBanner'

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
    height: '80px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 240px)',
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
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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
        <IconButton onClick={handleDrawerToggle} className={classes.drawerCloseButton}>
          <FontAwesomeIcon icon={faTimes} className={classes.drawerCloseIcon}></FontAwesomeIcon>
        </IconButton>
      </div>
      <List>
        {props.token && (
          <NavLink
            to="/dashboard"
            onClick={handleDrawerToggle}
            className={classes.navBarLink}
          >
            <ListItem button className={classes.mobileMenuItem}>Survey Dashboard</ListItem>
          </NavLink>
        )}
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
        <Link
          href={privacyPolicyLink}
          onClick={handleDrawerToggle}
          className={classes.navBarLink}
          target="_blank"
        >
          <ListItem button className={classes.mobileMenuItem}>Privacy Policy</ListItem>
        </Link>

        <Divider className={classes.mobileMenuSeparator} />
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
      {props.token && (
        <NavLink
          to="/dashboard"
          className={classes.fullNavBarLink}
          activeClassName={classes.fullNavBarLinkActive}
        >
          Survey Dashboard
        </NavLink>
      )}
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
      <Link
        href={privacyPolicyLink}
        className={classes.fullNavBarLink}
        target="_blank"
      >
        Privacy Policy
      </Link>
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
      <Toolbar className={classes.toolBar}>
        <div>
          <Typography variant="h6" noWrap className={classes.navbarTitle}>
            <NavLink to="/home">
              {/* Covid Recovery Corps title */}
              <svg
                width="97"
                height="57"
                viewBox="0 0 97 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0022 3.71927C10.8218 3.24582 10.5964 2.77236 10.2356 2.27636C9.69455 1.53236 8.65745 0.382545 7.28218 0.382545H4.32873C3.78764 0.382545 3.224 0.607999 2.86327 0.810909C2.34473 1.12654 1.46545 2.07345 1.19491 2.43418C0.901818 2.86255 0.811636 3.336 0.811636 3.832V10.6633C0.811636 11.1142 0.924364 11.6327 1.19491 12.0611C1.51055 12.4895 2.36727 13.3913 2.84073 13.6844C3.224 13.9098 3.78764 14.1127 4.32873 14.1127H7.28218C8.65745 14.1127 9.71709 12.9629 10.2582 12.1964C10.5513 11.7905 10.8218 11.3171 11.0247 10.7535L8.45455 10.1222C8.13891 10.6858 7.77818 11.1593 7.30473 11.4749H4.44145C3.90036 11.1593 3.56218 10.6633 3.56218 10.6407V3.92218C3.76509 3.60655 4.216 3.17818 4.44145 3.02036H7.25964C7.89091 3.44873 8.16145 3.832 8.45455 4.44073L11.0022 3.71927ZM23.5304 10.6407V3.85455C23.5304 3.35854 23.4402 2.86255 23.1471 2.43418C22.854 2.07345 21.9973 1.104 21.5013 0.810909C21.118 0.585454 20.5544 0.382545 20.0133 0.382545H16.5864C16.0228 0.382545 15.4817 0.585454 15.0984 0.810909C14.6024 1.104 13.7231 2.07345 13.4526 2.43418C13.1595 2.86255 13.0693 3.35854 13.0693 3.85455V10.6407C13.0693 11.1142 13.1595 11.6102 13.4526 12.0385C13.7231 12.4218 14.6024 13.3913 15.0984 13.6844C15.4817 13.9098 16.0228 14.1127 16.5864 14.1127H20.0133C20.5544 14.1127 21.118 13.9098 21.5013 13.6844C21.9973 13.3913 22.854 12.4218 23.1471 12.0385C23.4402 11.6102 23.5304 11.1142 23.5304 10.6407ZM20.7799 10.6407C20.5319 10.9564 20.126 11.3396 19.9457 11.4749H16.6315C16.4511 11.3622 16.0679 10.9789 15.8199 10.6407V3.87709C16.0904 3.49382 16.4737 3.15564 16.654 3.02036H19.9682C20.1937 3.15564 20.622 3.584 20.7799 3.85455V10.6407ZM36.5855 0.472727H33.6771C33.8124 0.472727 30.7462 10.1447 30.7462 10.1447L27.8153 0.472727H24.9069L29.2356 14H32.2793L36.5855 0.472727ZM41.1986 14V0.472727H38.4256V14H41.1986ZM53.8891 10.5956V3.92218C53.8891 3.44873 53.8215 2.97527 53.5058 2.52436C53.2353 2.16364 52.4011 1.19418 51.9051 0.878545C51.4767 0.607999 50.8905 0.472727 50.4171 0.472727H43.8564V14H50.4171C50.9356 14 51.4767 13.7745 51.86 13.5716C52.356 13.2785 53.2127 12.4218 53.5284 11.9709C53.7989 11.5425 53.8891 11.0015 53.8891 10.5956ZM51.1386 10.5055C50.9131 10.9338 50.62 11.1818 50.3044 11.3622H46.6069V3.11055H50.3044C50.6426 3.31345 50.9356 3.53891 51.1386 4.03491V10.5055Z"
                  fill="#0084FF"
                />
                <path
                  d="M10.7542 26.6356V24.7193C10.7542 24.2233 10.6189 23.6371 10.3258 23.2313C10.1004 22.9382 9.424 22.2393 9.10836 21.9913C8.68 21.6756 7.98109 21.4727 7.41745 21.4727H0.834182V35H3.58473V29.8371H5.74909L8.432 35H11.4982C11.4982 35 9.672 31.6633 8.56727 29.6342C8.74764 29.544 8.928 29.4538 9.10836 29.3185C9.424 29.0931 10.1229 28.4167 10.3258 28.1011C10.6189 27.6727 10.7542 27.1767 10.7542 26.6356ZM8.00364 26.6582C7.86836 26.8836 7.48509 27.1993 7.41745 27.1993H3.58473V24.1105H7.41745C7.64291 24.2233 7.89091 24.4713 8.00364 24.6516V26.6582ZM22.2395 35V32.3622H16.1071V29.5215H22.0366V26.8836H16.1071V24.1105H22.2395V21.4727H13.3566V35H22.2395ZM34.9241 24.7193C34.7438 24.2458 34.5183 23.7724 34.1576 23.2764C33.6165 22.5324 32.5794 21.3825 31.2041 21.3825H28.2507C27.7096 21.3825 27.146 21.608 26.7852 21.8109C26.2667 22.1265 25.3874 23.0735 25.1169 23.4342C24.8238 23.8625 24.7336 24.336 24.7336 24.832V31.6633C24.7336 32.1142 24.8463 32.6327 25.1169 33.0611C25.4325 33.4895 26.2892 34.3913 26.7627 34.6844C27.146 34.9098 27.7096 35.1127 28.2507 35.1127H31.2041C32.5794 35.1127 33.6391 33.9629 34.1801 33.1964C34.4732 32.7905 34.7438 32.3171 34.9467 31.7535L32.3765 31.1222C32.0609 31.6858 31.7001 32.1593 31.2267 32.4749H28.3634C27.8223 32.1593 27.4841 31.6633 27.4841 31.6407V24.9222C27.6871 24.6065 28.138 24.1782 28.3634 24.0204H31.1816C31.8129 24.4487 32.0834 24.832 32.3765 25.4407L34.9241 24.7193ZM47.4524 31.6407V24.8545C47.4524 24.3585 47.3622 23.8625 47.0691 23.4342C46.776 23.0735 45.9193 22.104 45.4233 21.8109C45.04 21.5855 44.4764 21.3825 43.9353 21.3825H40.5084C39.9447 21.3825 39.4036 21.5855 39.0204 21.8109C38.5244 22.104 37.6451 23.0735 37.3746 23.4342C37.0815 23.8625 36.9913 24.3585 36.9913 24.8545V31.6407C36.9913 32.1142 37.0815 32.6102 37.3746 33.0385C37.6451 33.4218 38.5244 34.3913 39.0204 34.6844C39.4036 34.9098 39.9447 35.1127 40.5084 35.1127H43.9353C44.4764 35.1127 45.04 34.9098 45.4233 34.6844C45.9193 34.3913 46.776 33.4218 47.0691 33.0385C47.3622 32.6102 47.4524 32.1142 47.4524 31.6407ZM44.7018 31.6407C44.4538 31.9564 44.048 32.3396 43.8676 32.4749H40.5535C40.3731 32.3622 39.9898 31.9789 39.7418 31.6407V24.8771C40.0124 24.4938 40.3956 24.1556 40.576 24.0204H43.8902C44.1156 24.1556 44.544 24.584 44.7018 24.8545V31.6407ZM60.5074 21.4727H57.5991C57.7343 21.4727 54.6681 31.1447 54.6681 31.1447L51.7372 21.4727H48.8289L53.1576 35H56.2012L60.5074 21.4727ZM71.1402 35V32.3622H65.0079V29.5215H70.9373V26.8836H65.0079V24.1105H71.1402V21.4727H62.2573V35H71.1402ZM83.5769 26.6356V24.7193C83.5769 24.2233 83.4416 23.6371 83.1485 23.2313C82.9231 22.9382 82.2467 22.2393 81.9311 21.9913C81.5027 21.6756 80.8038 21.4727 80.2402 21.4727H73.6569V35H76.4074V29.8371H78.5718L81.2547 35H84.3209C84.3209 35 82.4947 31.6633 81.39 29.6342C81.5703 29.544 81.7507 29.4538 81.9311 29.3185C82.2467 29.0931 82.9456 28.4167 83.1485 28.1011C83.4416 27.6727 83.5769 27.1767 83.5769 26.6356ZM80.8263 26.6582C80.6911 26.8836 80.3078 27.1993 80.2402 27.1993H76.4074V24.1105H80.2402C80.4656 24.2233 80.7136 24.4713 80.8263 24.6516V26.6582ZM96.5728 21.4727H93.4615L90.5982 26.2298L87.78 21.4727H84.6688L89.2004 29.1382V35H91.9735V29.1382L96.5728 21.4727ZM11.0022 45.7193C10.8218 45.2458 10.5964 44.7724 10.2356 44.2764C9.69455 43.5324 8.65745 42.3825 7.28218 42.3825H4.32873C3.78764 42.3825 3.224 42.608 2.86327 42.8109C2.34473 43.1265 1.46545 44.0735 1.19491 44.4342C0.901818 44.8625 0.811636 45.336 0.811636 45.832V52.6633C0.811636 53.1142 0.924364 53.6327 1.19491 54.0611C1.51055 54.4895 2.36727 55.3913 2.84073 55.6844C3.224 55.9098 3.78764 56.1127 4.32873 56.1127H7.28218C8.65745 56.1127 9.71709 54.9629 10.2582 54.1964C10.5513 53.7905 10.8218 53.3171 11.0247 52.7535L8.45455 52.1222C8.13891 52.6858 7.77818 53.1593 7.30473 53.4749H4.44145C3.90036 53.1593 3.56218 52.6633 3.56218 52.6407V45.9222C3.76509 45.6065 4.216 45.1782 4.44145 45.0204H7.25964C7.89091 45.4487 8.16145 45.832 8.45455 46.4407L11.0022 45.7193ZM23.5304 52.6407V45.8545C23.5304 45.3585 23.4402 44.8625 23.1471 44.4342C22.854 44.0735 21.9973 43.104 21.5013 42.8109C21.118 42.5855 20.5544 42.3825 20.0133 42.3825H16.5864C16.0228 42.3825 15.4817 42.5855 15.0984 42.8109C14.6024 43.104 13.7231 44.0735 13.4526 44.4342C13.1595 44.8625 13.0693 45.3585 13.0693 45.8545V52.6407C13.0693 53.1142 13.1595 53.6102 13.4526 54.0385C13.7231 54.4218 14.6024 55.3913 15.0984 55.6844C15.4817 55.9098 16.0228 56.1127 16.5864 56.1127H20.0133C20.5544 56.1127 21.118 55.9098 21.5013 55.6844C21.9973 55.3913 22.854 54.4218 23.1471 54.0385C23.4402 53.6102 23.5304 53.1142 23.5304 52.6407ZM20.7799 52.6407C20.5319 52.9564 20.126 53.3396 19.9457 53.4749H16.6315C16.4511 53.3622 16.0679 52.9789 15.8199 52.6407V45.8771C16.0904 45.4938 16.4737 45.1556 16.654 45.0204H19.9682C20.1937 45.1556 20.622 45.584 20.7799 45.8545V52.6407ZM35.9091 47.6356V45.7193C35.9091 45.2233 35.7738 44.6371 35.4807 44.2313C35.2553 43.9382 34.5789 43.2393 34.2633 42.9913C33.8349 42.6756 33.136 42.4727 32.5724 42.4727H25.9891V56H28.7396V50.8371H30.904L33.5869 56H36.6531C36.6531 56 34.8269 52.6633 33.7222 50.6342C33.9026 50.544 34.0829 50.4538 34.2633 50.3185C34.5789 50.0931 35.2778 49.4167 35.4807 49.1011C35.7738 48.6727 35.9091 48.1767 35.9091 47.6356ZM33.1586 47.6582C33.0233 47.8836 32.64 48.1993 32.5724 48.1993H28.7396V45.1105H32.5724C32.7978 45.2233 33.0458 45.4713 33.1586 45.6516V47.6582ZM48.4315 47.6356V45.7193C48.4315 45.2233 48.2962 44.6371 48.0031 44.2313C47.7777 43.9382 47.1013 43.2393 46.7857 42.9913C46.3573 42.6756 45.6584 42.4727 45.0948 42.4727H38.5115V56H41.2621V50.8371H45.0948C45.681 50.8371 46.2897 50.6793 46.7857 50.3185C47.1013 50.0931 47.8002 49.4167 48.0031 49.1011C48.2962 48.6727 48.4315 48.1767 48.4315 47.6356ZM45.681 47.6582C45.5457 47.8836 45.1624 48.1993 45.0948 48.1993H41.2621V45.1105H45.0948C45.3202 45.2233 45.5682 45.4713 45.681 45.6516V47.6582ZM53.8465 45.0204H56.9577C57.589 45.4487 57.8596 45.832 58.1527 46.4407L60.7003 45.7193C60.5199 45.2458 60.2945 44.7724 59.9337 44.2764C59.3927 43.5324 58.3556 42.3825 56.9803 42.3825H53.7788C53.2377 42.3825 52.6741 42.608 52.3134 42.8109C51.7948 43.1265 50.893 44.0509 50.6225 44.4342C50.3294 44.8851 50.2617 45.4487 50.2617 45.8545V47.0945C50.2617 48.1993 50.8705 49.3716 52.133 49.7098C54.0268 50.2058 55.9657 50.7469 57.837 51.2429C57.837 51.2429 57.9047 51.2655 57.9047 51.3782V52.7084C57.9047 52.7309 57.4312 53.2945 57.093 53.4749H53.6661C53.1927 53.1593 52.8094 52.528 52.4937 51.9644L49.9461 52.7535C50.149 53.3171 50.4196 53.7905 50.7127 54.1964C51.2537 54.9629 52.3134 56.1127 53.6887 56.1127H57.1381C57.6792 56.1127 58.2654 55.8873 58.6261 55.6844C59.0996 55.3913 59.9788 54.4669 60.2719 54.0385C60.565 53.5876 60.6777 53.0015 60.6777 52.6407V51.3105C60.6777 50.2058 60.0465 49.0335 58.8065 48.6953L53.0799 47.1396C53.0799 47.1396 53.0123 47.0945 53.0123 47.0044V45.8095C53.0123 45.7869 53.4857 45.2007 53.8465 45.0204Z"
                  fill="black"
                />
              </svg>
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
