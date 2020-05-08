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
        <Button style={{  width: '90px' }} color="primary" variant="outlined" size="large">
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
          <Button style={{  width: '90px' }}color="primary" variant="contained" size="large">
            Join
          </Button>
        </NavLink>
        {element}
      </>
    )
  }

  const collapseMenu = () => {
    setTopClicked(false)
  }
  return (
    <div className="TopNav">
      <div
        className={`${topClicked ? 'TopNav__menu responsive' : 'TopNav__menu'}`}
      >
      
        <NavLink to="/home" activeClassName="active" onClick={collapseMenu}>
          About
        </NavLink>
        
        <NavLink to="/team" activeClassName="active" onClick={collapseMenu}>
          Team
        </NavLink>
        <NavLink to="/faqs" activeClassName="active" onClick={collapseMenu}>
          FAQs
        </NavLink>
        <NavLink to="/contact" activeClassName="active" onClick={collapseMenu}>
          Contact
        </NavLink>
        {token && (
          <NavLink to="/settings" activeClassName="active" onClick={collapseMenu}>
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
