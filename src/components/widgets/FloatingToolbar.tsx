import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import btnClose from '../../assets/btn_close.svg'
import { Link } from '@material-ui/core'
import ConfirmationModal from './ConfirmationModal'

type FloatingToolbarProps = {
  closeLinkDestination: string
  closeIcon?: IconProp
  closeLinkText: string
  closeConfirmationText?: string
}

export const FloatingToolbar: React.FunctionComponent<FloatingToolbarProps> = props => {
  const [top, setTop] = useState('0px')
  const [
    isShowingCancelConfirmation,
    setIsShowingCancelConfirmation,
  ] = useState(false)
  const [isCanceled, setIsCancelled] = useState(false)

  if (isCanceled) {
    // TopNav does not read the new search param when using the optimized react router redirect, so replacing for now :(
    window.location.href = props.closeLinkDestination
    // return <Redirect to={props.closeLinkDestination}></Redirect>
  }

  return (
    <div
      className="FloatingToolbar"
      style={{ top: top, width: '100%', height: '80px' }}
    >
      <div className="row" style={{ position: 'relative', marginTop: '17px' }}>
        {
          <div style={{ position: 'absolute', left: '20px', zIndex: 999 }}>
            <Link
              onClick={() => {
                if (props.closeConfirmationText) {
                  setIsShowingCancelConfirmation(true)
                } else {
                  setIsCancelled(true)
                }
              }}
            >
              {!props.closeIcon && (
                <img
                  style={{ left: '10px', position: 'absolute' }}
                  src={btnClose}
                  alt={props.closeLinkText}
                ></img>
              )}

              {props.closeIcon && <FontAwesomeIcon icon={props.closeIcon} />}

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
      {isShowingCancelConfirmation && (
        <ConfirmationModal
          show={true}
          content={
            <div>
              <h2>{props.closeConfirmationText}</h2>
            </div>
          }
          onCancel={() =>
            // hide cancel confirmation
            setIsShowingCancelConfirmation(false)
          }
          onOK={() =>
            // redirect back
            setIsCancelled(true)
          }
          confirmCopy={'Yes'}
          cancelCopy={'No, take me back'}
        ></ConfirmationModal>
      )}
    </div>
  )
}

export default FloatingToolbar
