import React, { useState, useEffect } from 'react'

import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

type FloatingNavProps = {
  staticText?: string
}

export const FloatingNav: React.FunctionComponent<FloatingNavProps> = (
  props
) => {
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
    setPrevScrollpos((_prev) => currentScrollPos)
  }

  return (
    <div id="toolbar" className="container" style={{ top: top, width: '100%' }}>
      <div className="row" style={{ position: 'relative' }}>
        {
          <div style={{ position: 'absolute', left: '20px' }}>
            <Link to="/home">
              <FontAwesomeIcon size="xs" icon={faTimes}></FontAwesomeIcon>
            </Link>
          </div>
        }
        <div className="col-md-offset-1 col-md-10">
          <div className="row">
            <div className="text-center">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatingNav
