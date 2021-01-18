import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { ReactComponent as CovidRecoveryCorpsLogo } from '../../assets/CovidRecoveryCorpsLogo.svg'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '900px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '250px',
  },
  languageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black',
    width: '170px',
  },
  languageButton: {
    color: 'black',
    cursor: 'pointer',
    fontSize: '15px',
    outline: 'none',
    border: 'none',
    backgroundColor: 'Transparent',
  },
  selectedLanguage: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  videoContainer: {
    marginTop: '30px',
    maxWidth: '900px',
    maxHeight: '550px',
  },
  topBanner: {
    height: '92px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: '15px',
    paddingLeft: '25px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '10px',
    marginLeft: '5px',
    marginRight: '5px',
  },
}))

const TestKitInformationScreen: React.FC<{}> = props => {
  const [language, setLanguage] = useState<string>(i18n.language)
  const classes = useStyles()
  const { t } = useTranslation()

  const changeLanguage = (pressedLanguage: string) => {
    if (pressedLanguage !== language) {
      const newLanguage = i18n.language === 'es' ? 'en' : 'es'
      window.localStorage.setItem('appUILang', newLanguage)

      i18n.changeLanguage(newLanguage)
      setLanguage(newLanguage)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.topBanner}>
        <NavLink to="/home">
          <CovidRecoveryCorpsLogo />
        </NavLink>
      </div>
      <h2 className={classes.header}>
        {t('testKitInstructionPage.instructionHeader')}
      </h2>
      <div className={classes.languageRow}>
        <button
          className={`${classes.languageButton} ${
            language === 'en' ? classes.selectedLanguage : null
          }`}
          onClick={() => changeLanguage('en')}
        >
          English
        </button>
        <button
          className={`${classes.languageButton} ${
            language === 'en' ? null : classes.selectedLanguage
          }`}
          onClick={() => changeLanguage('es')}
        >
          en español
        </button>
      </div>
      <iframe
        width="100%"
        height="60%"
        src={
          language === 'en'
            ? 'https://www.youtube.com/embed/--MX5u9a12Y?autoplay=1'
            : 'https://www.youtube.com/embed/bM6MoVTAegQ?autoplay=1'
        }
        className={classes.videoContainer}
      />
    </div>
  )
}

export default TestKitInformationScreen
