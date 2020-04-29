import React from 'react'
import logo from './logo.svg'


import './styles/style.scss'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Collaborators from './components/static/Collaborators'
import PatientCorpsHome from './components/PatientCorpsHome'
import EligibilityRegistration from './components/registration/EligibilityRegistration'
import SurveyWrapper from './components/SurveyWrapper'
import Login from './components/Login'
import Consent from './components/consent/Consent'
import Container from '@material-ui/core/Container/Container'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { createMuiTheme, ThemeProvider, Typography } from '@material-ui/core'
import { SESSION_NAME } from './types/types'


const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    fontFamily: ["Lato", "Roboto", "Helvetica", "Arial"].join(',')

  },
  palette: {
 
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#000'///'#202423' //'#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00'
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
   props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  }
})

const useStyles = makeStyles(theme => ({
  root: {
    //backgroundColor: '#E5E5E5'
  }
}))

function App() {
  const token = sessionStorage.getItem(SESSION_NAME);
  const classes = useStyles()

  const getSearchParams = (search: string): { [key: string]: string } => {
    const searchParamsProps: any = {}
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
    const searchParams = new URLSearchParams(search)
    searchParams.forEach((value, key) => {
      console.log(key)
      searchParamsProps[key] = value
    })
    return searchParamsProps
  }
  return (
    <ThemeProvider theme={theme}>
      <Typography component={'div'}>
        <div className={classes.root}>
          <CssBaseline />
          <Router>
            <div>
              <nav style={{border: "1px solid black", width:"200px", fontSize: '.5rem'}}>
                <p> FOR DEV PURPOSES ONLY. (wed night update) </p>
                <ul style={{display: 'inline'}}>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/collaborators">Collaborators</Link>
                  </li>
                  <li>
                    <Link to="/Login">Login</Link>
                  </li>
                  <li>
                    <Link to="/eligibility">Eligibility</Link>
                  </li>
                  <li>
                    <Link to="/consentEHR">Consent</Link>
                  </li>
                  <li>
                    <Link to="/survey1">Survey1</Link>
                  </li>
                </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/collaborators">
                  <Collaborators />
                </Route>

                <Route
                  exact={true}
                  path="/login"
                  render={props => {
                    const searchParamsProps = getSearchParams(
                      props.location.search
                    )
                    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
                    return (
                      <PatientCorpsHome
                        searchParams={searchParamsProps}
                        page="LOGIN"
                      />
                    )
                  }}
                ></Route>
                <Route path="/eligibility">
                  <EligibilityRegistration />
                </Route>

                <Route exact={true} path="/consent">
                  <Consent token="123" name="Alina" />
                </Route>
                <Route exact={true} path="/survey1">
                 <SurveyWrapper formTitle="Tell us about yourself" token={token|| ''} surveyName={'DEMOGRAPHIC'} formClass="crc"></SurveyWrapper>
                </Route>

                <Route path="/">
                  <PatientCorpsHome page="HOME" />
                </Route>
              
              
                <Route
                  exact={true}
                  path="/consent2"
                  render={props => {
                    const searchParamsProps = getSearchParams(
                      props.location.search
                    )
                    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
                    return (
                      <PatientCorpsHome
                        searchParams={searchParamsProps}
                        page="CONSENT"
                      />
                    )
                  }}
                ></Route>
              </Switch>
            </div>
          </Router>
        </div>
      </Typography>
    </ThemeProvider>
  )
}

export default App
