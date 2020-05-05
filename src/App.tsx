import React, { useState, useEffect } from 'react'
import logo from './logo.svg'

import './styles/style.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
} from 'react-router-dom'
import Collaborators from './components/static/Collaborators'

import EligibilityRegistration from './components/registration/EligibilityRegistration'
import SurveyWrapper from './components/surveys/SurveyWrapper'
import Login from './components/login/Login'
import Consent from './components/consent/Consent'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import {
  createMuiTheme,
  ThemeProvider,
  Typography,
  Grid,
  Button,
} from '@material-ui/core'

import { getSession, callEndpoint } from './helpers/utility'

import Intro from './components/static/Intro'
import Dashboard from './components/Dashboard'

import { SESSION_NAME, ENDPOINT, LoggedInUserData } from './types/types'
import ConsentEHR from './components/consent/ConsentEHR'
import About from './components/static/About'

import Team from './components/static/Team'
import Contact from './components/static/Contact'
import FAQs from './components/static/FAQs'
import { TopNav } from './components/widgets/TopNav'
import ResultsUpload from './components/ResultsUpload'

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    
    htmlFontSize: 10,
    fontFamily: ['Source Serif Pro', 'serif', 'Lato', 'Roboto', 'Helvetica', 'Arial'].join(','),
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#000', ///'#202423' //'#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      //light: '#0066ff',
      main: '#ccc',
      // dark: will be calculated from palette.secondary.main,
      //contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: '#E5E5E5'
  },
}))

type AppState = {
  token: string
}
export const TokenContext = React.createContext('')

function App() {
  const [token, setToken] = useState(getSession()?.token)
  const [name, setName] = useState(getSession()?.name)
  const [consented, setConsented] = useState(getSession()?.consented)

  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        try {
          const response = await callEndpoint<LoggedInUserData>(
            `${ENDPOINT}/v3/participants/self`,
            'GET',
            {},
            token
          )
        } catch (e) {
          setUserSession(undefined, '', false)
          //alert(e.message)
          // return <Redirect to="/"></Redirect>
        }
      }
    }
    getInfo(token)
    return () => {
      isSubscribed = false
    }
  }, [])

  function PrivateRoute({ children, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    )
  }

  const setUserSession = (
    token: string | undefined,
    name: string,
    consented: boolean
  ) => {
    const data = {
      token,
      name,
      consented,
    }
    if (!token) {
      sessionStorage.clear()
      setToken(undefined)
      setName('')
      setConsented(undefined)
    } else {
      setToken(token)
      setName(name)
      setConsented(consented)
      sessionStorage.setItem(SESSION_NAME, JSON.stringify(data))
    }
  }

  const classes = useStyles()

  const getSearchParams = (search: string): { [key: string]: string } => {
    const searchParamsProps: any = {}
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
    const searchParams = new URLSearchParams(search)
    searchParams.forEach((value, key) => {
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
              <nav
                style={{
                  border: '1px solid black',

                  top: '10px',
                  left: '10px',
                  fontSize: '.5rem',
                  position: 'fixed',
                }}
              >
                (Tue:6:10)
              </nav>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Route
                  render={(props) => {
                    console.log(props.location)
                    if (!props.location.pathname.includes('onsent'))
                      return (
                        <Grid item xs={12}>
                          <TopNav
                            token={token}
                            logoutCallbackFn={() =>
                              setUserSession(undefined, '', false)
                            }
                          ></TopNav>
                      
                        </Grid>
                      )
                  }}
                />

                <Grid item xs={10} md={6} lg={6}>
                  {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}{' '}
                  <Switch>
                    <Route path="/collaborators">
                      <Collaborators />
                    </Route>

                    <Route
                      exact={true}
                      path="/login"
                      render={(props) => {
                        const searchParamsProps = getSearchParams(
                          props.location.search
                        )
                        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
                        return (
                          <Login
                            {...props}
                            searchParams={searchParamsProps as any}
                            callbackFn={(
                              token: string,
                              name: string,
                              consented: boolean
                            ) => setUserSession(token, name, consented)}
                          />
                        )
                      }}
                    ></Route>
                    <Route
                      path="/eligibility"
                      render={(props) => {
                        const searchParamsProps = getSearchParams(
                          props.location.search
                        )
                        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
                        return (
                          <EligibilityRegistration
                            {...props}
                            callbackFn={(token: string, name: string) =>
                              setUserSession(token, name, false)
                            }
                          />
                        )
                      }}
                    ></Route>

                    <PrivateRoute exact={true} path="/dashboard">
                      <Dashboard token={token || ''} />
                    </PrivateRoute>
{/*todo make private */}
                    <Route exact={true} path="/consent">
                      <Consent
                        token={token || ''}
                        name={getSession()?.name || ''}
                      />
                    </Route>
{/*todo make private */}
                    <Route exact={true} path="/consentehr">
                      <ConsentEHR token={token || ''} />
                    </Route>
{/*todo make private */}
                    <Route exact={true} path="/survey1">
                      <SurveyWrapper
                        formTitle="Tell us about yourself"
                        token={token || ''}
                        surveyName={'DEMOGRAPHIC'}
                        formClass="crc"
                      ></SurveyWrapper>
                    </Route>
                    <Route exact={true} path="/survey2">
                      <SurveyWrapper
                        formTitle="Your COVID experience"
                        token={token || ''}
                        surveyName={'COVID_EXPERIENCE'}
                        formClass="crc"
                      ></SurveyWrapper>
                    </Route>
                    <Route exact={true} path="/survey3">
                      <ResultsUpload
                       
                        token={token || ''}
                       
                      ></ResultsUpload>
                    </Route>

                    <Route path="/about">
                      <About></About>
                    </Route>
                    <Route path="/faqs">
                      <FAQs></FAQs>
                    </Route>
                    <Route path="/team">
                      <Team></Team>
                    </Route>
                    <Route path="/contact">
                      <Contact></Contact>
                    </Route>
                    <Route path="/home">
                      <Intro token={token || null}></Intro>
                    </Route>

                    <Route path="/">
                      <Intro token={token || null}></Intro>
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </div>
          </Router>
        </div>
      </Typography>
    </ThemeProvider>
  )
}

export default App
