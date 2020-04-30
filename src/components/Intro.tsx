import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { ToggleButton, FormControl } from 'react-bootstrap'
import useForm from './useForm'
import { Logout } from './Logout'

type IntroProps = {
  token: string | null
}

export const Intro: React.FunctionComponent<IntroProps> = ({
  token,
}: IntroProps) => {
  const [_token, setToken] = useState(token)
  return (
    <>
      <div>
        <ul>
          <li>
            <a href="/How It Works">How it works</a>
          </li>
          {!_token && (
            <li>
              <a href="/Eligibility">Am I elgible? </a>
            </li>
          )}
          <li>
            <a href="/How It Works">Benefits and Risks</a>
          </li>
          <li>
            <a href="/Collaborators">Project Collaborators</a>
          </li>
          {_token && (
            <li>
          <Logout onLogout={() => setToken(null)}></Logout>
          </li>)}
        </ul>
      </div>
      <h1> We need your help</h1>
      <div className="Introcontent">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <h1>As COVID-19 makes a home in our communities </h1>
      <div className="Introcontent2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </>
  )
}

export default Intro
