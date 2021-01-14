import React, { useState } from 'react'
import Iframe from 'react-iframe'
import { makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { ReactComponent as CovidRecoveryCorpsLogo } from '../../assets/CovidRecoveryCorpsLogo.svg'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '900px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  languageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black',
    width: '170px',
    marginTop: '-15px',
  },
  languageText: {
    color: 'black',
    cursor: 'pointer',
    fontSize: '15px',
  },
  selectedLanguage: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  videoContainer: {
    marginTop: '30px',
  },
  topBanner: {
    height: '92px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: '15px',
    paddingLeft: '25px',
  },
}))

const TestKitInformationScreen: React.FC<{}> = props => {
  const [englishIsSelected, setEnglishSelected] = useState<boolean>(true)
  const classes = useStyles()
  const engishTextClasses = [classes.languageText]
  const spanishTextClasses = [classes.languageText]
  englishIsSelected
    ? engishTextClasses.push(classes.selectedLanguage)
    : spanishTextClasses.push(classes.selectedLanguage)

  const handleLanguagePressed = (pressedLanguage: String) => {
    if (pressedLanguage === 'ENGLISH' && !englishIsSelected) {
      setEnglishSelected(true)
    } else if (pressedLanguage === 'SPANISH' && englishIsSelected) {
      setEnglishSelected(false)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.topBanner}>
        <NavLink to="/home">
          <CovidRecoveryCorpsLogo />
        </NavLink>
      </div>

      <h2>Blood Sample Collection Instructions</h2>
      <div className={classes.languageRow}>
        <div
          className={engishTextClasses.join(' ')}
          onClick={() => handleLanguagePressed('ENGLISH')}
        >
          English
        </div>
        <div
          className={spanishTextClasses.join(' ')}
          onClick={() => handleLanguagePressed('SPANISH')}
        >
          en español
        </div>
      </div>
      <Iframe
        width="900px"
        height="550px"
        url={
          englishIsSelected
            ? 'https://www.youtube.com/embed/--MX5u9a12Y?autoplay=1'
            : 'https://www.youtube.com/embed/bM6MoVTAegQ?autoplay=1'
        }
        className={classes.videoContainer}
      />
    </div>
  )
}

export default TestKitInformationScreen
