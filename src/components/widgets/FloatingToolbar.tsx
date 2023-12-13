import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { openSansFont } from '../../App'
import btnClose from '../../assets/btn_close.svg'
import LanguageIcon from '../../assets/language_icon.svg'
import i18n from '../../i18n'
import ConfirmationModal from './ConfirmationModal'

const useStyles = makeStyles(theme => ({
  languageIcon: {
    marginRight: theme.spacing(0.5),
  },
  languageText: {
    display: 'none',
    color: '#0084FF',
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    right: '25px',
    fontFamily: openSansFont,
    '&:hover': {
      fontWeight: 'bold',
      color: '#0084FF',
    },
  },
}))

type FloatingToolbarProps = {
  closeLinkDestination: string
  closeIcon?: IconProp
  closeLinkText: string
  closeConfirmationText?: string
  closeConfirmationText2?: string
}

export const FloatingToolbar: React.FunctionComponent<React.PropsWithChildren<FloatingToolbarProps>> = props => {
  const [top, setTop] = useState('0px')
  const classes = useStyles()
  const [language, setLanguage] = React.useState(i18n.language)
  const [
    isShowingCancelConfirmation,
    setIsShowingCancelConfirmation,
  ] = useState(false)
  const [isCanceled, setIsCancelled] = useState(false)
  const { t } = useTranslation()

  if (isCanceled) {
    // TopNav does not read the new search param when using the optimized react router redirect, so replacing for now :(
    window.location.href = props.closeLinkDestination
    // return <Redirect to={props.closeLinkDestination}></Redirect>
  }

  React.useEffect(() => {
    setLanguage(i18n.language)
  }, [i18n.language])

  const changeLanguage = (newLanguage: string) => {
    window.localStorage.setItem('appUILang', newLanguage)
    i18n.changeLanguage(newLanguage)
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
              data-cy="close-toolbar"
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
        <div
          className={classes.languageText}
          onClick={() => {
            changeLanguage(language === 'es' ? 'en' : 'es')
          }}
        >
          <img src={LanguageIcon} style={{ marginRight: '4px' }}></img>
          {language === 'es' ? 'in English' : 'en español'}
        </div>
      </div>
      {isShowingCancelConfirmation && (
        <ConfirmationModal
          show={true}
          content={
            <div>
              <h2>{props.closeConfirmationText}</h2>
              {props.closeConfirmationText2 && (
                <div>{props.closeConfirmationText2}</div>
              )}
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
          confirmCopy={t('common.yes')}
          cancelCopy={t('common.noTakeBack')}
        ></ConfirmationModal>
      )}
    </div>
  )
}

export default FloatingToolbar
