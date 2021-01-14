import React, { useState } from 'react'
import Iframe from 'react-iframe'
import { makeStyles } from '@material-ui/core'

interface Props {}

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '800px',
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
    marginTop: '-10px',
  },
  languageText: {
    color: 'black',
    cursor: 'pointer',
  },
  selectedLanguage: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  videoContainer: {
    marginTop: '30px',
  },
}))

const TestKitInformationScreen: React.FC<Props> = props => {
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
        width="800px"
        height="500px"
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
