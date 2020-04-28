import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { ToggleButton, FormControl } from 'react-bootstrap'
import useForm from './useForm'

type NavProps = {
  staticText?: string
}

export const Nav: React.FunctionComponent<NavProps> = props  => {

  
  const [top, setTop] = useState('0px')
  const [prevScrollpos, setPrevScrollpos] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  const onScroll = () => {
    const currentScrollPos = window.scrollY

    if (prevScrollpos >= currentScrollPos) {
      setTop('0px')
    } else {
      setTop('-50px')
    }
    setPrevScrollpos(_prev => currentScrollPos)
  }

  return (
    <div id="toolbar" className="container" style={{ top: top }}>
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <div className="row">
            <div className="text-center">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
