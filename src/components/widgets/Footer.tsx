import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Toolbar } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { openSansFont } from '../../App'
import { privacyPolicyLink } from './CookieNotificationBanner'
import { ReactComponent as CZILogo } from '../../assets/czi_logo.svg'

type FooterProps = {
  token: string | undefined
}

const useStyles = makeStyles(theme => ({
  footer: {
    color: '#FCFCFC',
    backgroundColor: '#2A2A2A',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  toolBar: {
    padding: '50px 0px 15px 20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '35px 0px',
    },
  },
  content: {
    flexGrow: 1,
  },
  questionsCommentsText: {
    color: '#FFFFFF',
    fontFamily: openSansFont,
    fontSize: '14px',
    lineHeight: '22px',
    padding: '20px 50px 30px 50px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '30px',
    },
  },
  fullNavBarLink: {
    fontFamily: openSansFont,
    color: '#FCFCFC',
    fontSize: '14px',
    marginLeft: 30,
    paddingBottom: 7,
    '&:hover': {
      textDecoration: 'none',
      color: '#FCFCFC',
    },
    '&:focus': {
      textDecoration: 'none',
      color: '#FCFCFC',
    },
  },
  cziLogoDiv: {
    padding: '40px 50px 40px 30px',
  },
}))

export const Footer: React.FunctionComponent<FooterProps> = props => {
  const classes = useStyles()
  return (
    <div className={classes.footer}>
      <CssBaseline />
      <div></div>
      <div>
        <Toolbar className={classes.toolBar}>
          {props.token && (
            <NavLink to="/dashboard" className={classes.fullNavBarLink}>
              Survey Dashboard
            </NavLink>
          )}
          <NavLink to="/home" className={classes.fullNavBarLink}>
            About
          </NavLink>
          <NavLink to="/team" className={classes.fullNavBarLink}>
            Meet the Researchers
          </NavLink>
          <NavLink to="/faqs" className={classes.fullNavBarLink}>
            FAQs
          </NavLink>
          <NavLink to="/contact" className={classes.fullNavBarLink}>
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
            <NavLink to="/settings" className={classes.fullNavBarLink}>
              Account Settings
            </NavLink>
          )}
          {/* the toolbar is a flex layout, whose flex direction changes on smaller devices.  add an empty element for correct spacing or newline */}
          <div className={classes.fullNavBarLink}></div>

          {!props.token && (
            <NavLink to="/login" className={classes.fullNavBarLink}>
              Log in
            </NavLink>
          )}
          {!props.token && (
            <NavLink to="/eligibility" className={classes.fullNavBarLink}>
              Join Us
            </NavLink>
          )}
        </Toolbar>
        <div className={classes.questionsCommentsText}>
          For questions, comments, or requests regarding the privacy policy or
          our processing of your information, please contact:
          privacypolicy@sagebionetworks.org.
        </div>
      </div>
      <div className={classes.cziLogoDiv}>
        <a href="https://chanzuckerberg.com/">
          <CZILogo />
        </a>
      </div>
    </div>
  )
}

export default Footer
