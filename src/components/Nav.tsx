import React, { useState, useEffect } from 'react'

import { Button } from '@material-ui/core'
import { faTimes} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type NavProps = {
  staticText?: string
  width: number | null
}

export const Nav: React.FunctionComponent<NavProps> = props  => {

  
  const [top, setTop] = useState('60px')
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
      setTop('60px')
    } else {
      setTop('-50px')
    }
    setPrevScrollpos(_prev => currentScrollPos)
  }

  return (
    <div id="toolbar" className="container" style={{ top: top , width: props.width? `${props.width}px`: '100%'}}>
       
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <div className="row">
           <div className="text-center" style={{position: 'relative'}}>
          {/* <div style={{position: "absolute", left: "-20px"}}><button style={{backgroundColor: "transparent", border: "none"}} onClick={()=> alert('hi')}><FontAwesomeIcon size="xs" icon={faTimes}></FontAwesomeIcon></button></div>*/}
           {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
