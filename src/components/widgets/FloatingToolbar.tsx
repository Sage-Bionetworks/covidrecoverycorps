import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type FloatingToolbarProps = {
  closeLinkDestination: string,
  closeIcon: IconProp,
  closeLinkText: string
}

export const FloatingToolbar: React.FunctionComponent<FloatingToolbarProps> = (
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
    <div className="FloatingToolbar" style={{ top: top, width: '100%', height: '62px' }}>
      <div className="row" style={{ position: 'relative', marginTop: '5px' }}>
        {
          <div style={{ position: 'absolute', left: '20px', zIndex: 999}}>
            <Link to={props.closeLinkDestination}>
              <FontAwesomeIcon icon={props.closeIcon} />
              <span style={{ marginLeft: '5px' }}>{props.closeLinkText}</span>
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

export default FloatingToolbar
