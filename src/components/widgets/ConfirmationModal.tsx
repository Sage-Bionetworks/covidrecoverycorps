import React from 'react'
import { Button } from '@material-ui/core'
import Modal from 'react-bootstrap/Modal'

export type ConfirmationModalProps = {
  mainCopy: string | JSX.Element
  topSecondaryCopy?: string | JSX.Element
  confirmCopy?: string
  cancelCopy?: string
  className?: string
  show: boolean
  onOK: Function
  onCancel: Function
}

export default function ConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Modal show={props.show} animation={false} className={props.className}>
      <Modal.Body>
        <p>
          {props.topSecondaryCopy}
        </p>
        <h2 className="modal--main-copy">
          {props.mainCopy}
        </h2>
        <div className="buttons--vertical-stack">
          <Button
            onClick={() => props.onOK()}
            variant="contained"
            color="primary"
            fullWidth
          >
            <span>{props.confirmCopy || 'OK'}</span>
          </Button>
          <Button
            onClick={() => props.onCancel()}
            variant="outlined"
            color="primary"
            fullWidth
          >
            <span>{props.cancelCopy || 'Cancel'}</span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
