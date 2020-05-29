import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import Modal from 'react-bootstrap/Modal'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TumblrShareButton,
  ViberShareButton,
  LineShareButton,
  PocketShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  ViberIcon,
  LineIcon,
  PocketIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from 'react-share';
import classes from '*.module.css';

export type ShareModalProps = {
  show: boolean
  onClose: Function
}

const useStyles = makeStyles(theme => ({
  modalBody: {
    padding: '10px'
  },
  shareButtonsContainer: {
    display: 'flex',
    width: '100%',
    overflow: 'auto',
  },
  shareButtonDiv: {
    width: '100px',
    padding: '10px'
  },
  shareButton: {
    marginLeft: '5px',
  },
  shareButtonTextDiv: {
    textAlign: 'center',
  },
  closeButton: {
    padding: '0px 45px'
  },
  
}))

export default function ShareModal(props: ShareModalProps) {
  const shareUrl = window.location.href
  const title = 'Covid Recovery Corps'
  const facebookAppId = '789053391920204'
  const classes = useStyles()

  return (
    <Modal show={props.show} animation={false} onHide={props.onClose} size='lg'>
      <Modal.Header closeButton={true}>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.modalBody}>
        <div className={classes.shareButtonsContainer}>
          <div className={classes.shareButtonDiv}>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className={classes.shareButton}
            >
              <FacebookIcon size={64} round />
            </FacebookShareButton>

            <div>
              <p>Facebook</p>              
            </div>
          </div>
          <div className={classes.shareButtonDiv}>
            <FacebookMessengerShareButton
              url={shareUrl}
              appId={facebookAppId}
              className={classes.shareButton}
            >
              <FacebookMessengerIcon size={64} round />
            </FacebookMessengerShareButton>
            <div>
              <p>Facebook Messenger</p>
            </div>
          </div>
          <div className={classes.shareButtonDiv}>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className={classes.shareButton}
            >
              <TwitterIcon size={64} round />
            </TwitterShareButton>
            <div className={classes.shareButtonTextDiv}>
              <p>Twitter</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className={classes.shareButton}
            >
              <WhatsappIcon size={64} round />
            </WhatsappShareButton>

            <div className={classes.shareButtonTextDiv}>
              <p>WhatsApp</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <TelegramShareButton
              url={shareUrl}
              title={title}
              className={classes.shareButton}
            >
              <TelegramIcon size={64} round />
            </TelegramShareButton>

            <div className={classes.shareButtonTextDiv}>
              <p>Telegram</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <LinkedinShareButton url={shareUrl} className={classes.shareButton}>
              <LinkedinIcon size={64} round />
            </LinkedinShareButton>
            <div className={classes.shareButtonTextDiv}>
              <p>LinkedIn</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <RedditShareButton
              url={shareUrl}
              title={title}
              windowWidth={660}
              windowHeight={460}
              className={classes.shareButton}
            >
              <RedditIcon size={64} round />
            </RedditShareButton>
            <div className={classes.shareButtonTextDiv}>
              <p>Reddit</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <TumblrShareButton
              url={shareUrl}
              title={title}
              className={classes.shareButton}
            >
              <TumblrIcon size={64} round />
            </TumblrShareButton>
            <div className={classes.shareButtonTextDiv}>
              <p>Tumblr</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <ViberShareButton
              url={shareUrl}
              title={title}
              className={classes.shareButton}
            >
              <ViberIcon size={64} round />
            </ViberShareButton>
            <div className={classes.shareButtonTextDiv}>
              <p>Viber</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <LineShareButton
              url={shareUrl}
              title={title}
              className={classes.shareButton}
            >
              <LineIcon size={64} round />
            </LineShareButton>
            <div className={classes.shareButtonTextDiv}>
              <p>Line</p>
            </div>
          </div>

          <div className={classes.shareButtonDiv}>
            <PocketShareButton
              url={shareUrl}
              title={title}
              className={classes.shareButton}
            >
              <PocketIcon size={64} round />
            </PocketShareButton>
            <div className={classes.shareButtonTextDiv}>
              <p>Pocket</p>
            </div>
          </div>
        </div>
        <div className="buttons--vertical-stack">
          <Button
            onClick={() => props.onClose()}
            color="primary"
            variant="contained"
            size="medium"
            className={classes.closeButton}
          >
            <span>Close</span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
