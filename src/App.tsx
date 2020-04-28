import React from 'react'
import logo from './logo.svg'
import './App.css'
import './components/style.scss'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Collaborators from './components/static/Collaborators'
import PatientCorpsHome from './components/PatientCorpsHome'
import EligibilityRegistration from './components/registration/EligibilityRegistration'
import Login from './components/Login'

function App() {

  const getSearchParams = (search: string): {[key: string]: string} => {
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
    <Router>
      <div>
        <nav>
          <ul>
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
              const searchParamsProps = getSearchParams(props.location.search)
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
          <Route path="/">
            <PatientCorpsHome  page="HOME" />
          </Route>
          <Route
            exact={true}
            path="/consent"
            render={props => {
              const searchParamsProps = getSearchParams(props.location.search)
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
  )
}

export default App
