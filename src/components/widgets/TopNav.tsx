import React, { useState} from 'react'
import { NavLink } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '@material-ui/core/Button/Button'
import Logout from '../login/Logout'

type TopNavProps = {
  token: string | undefined
  logoutCallbackFn: Function
}

export const TopNav: React.FunctionComponent<TopNavProps> = (
  {token,
  logoutCallbackFn}: TopNavProps
) => {
  const [topClicked, setTopClicked] = useState(false)

  const renderLoginOut = (): JSX.Element => {
    let element = (
      <NavLink to="/login" activeClassName="hidden" className="buttonLink">
        <Button color="primary" variant="outlined">
          Login
        </Button>
      </NavLink>
    )
    if (token) {
      console.log(token)
      return (
        <>
        
          <Logout
            onLogout={() => logoutCallbackFn(undefined, '', false)}
          ></Logout>
        </>
      )
    }

    return (
      <>
        <NavLink
          style={{ marginRight: '10px' }}
          to="/eligibility"
          activeClassName="hidden"
          className="buttonLink"
        >
          <Button color="primary" variant="contained">
            Join
          </Button>
        </NavLink>
        {element}
      </>
    )
  }

  return (
    <div className="TopNav">
      <div
        className={`${topClicked ? 'TopNav__menu responsive' : 'TopNav__menu'}`}
      >
      
        <NavLink to="/home" activeClassName="active">
          About
        </NavLink>
        
        <NavLink to="/team" activeClassName="active">
          Team
        </NavLink>
        <NavLink to="/faqs" activeClassName="active">
          FAQs
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          Contact
        </NavLink>
        {token && (
          <NavLink to="/settings" activeClassName="active">
            Settings
          </NavLink>
        )}
        <a
          onClick={() => {
            setTopClicked((prev) => !prev)
          }}
          className="icon"
        >
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </a>
      </div>
      <div>
        <div className="TopNav__buttons"> {renderLoginOut()}</div>
      </div>
    </div>
  )
}

export default TopNav
