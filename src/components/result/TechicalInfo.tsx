import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'
import { playfairDisplayFont } from '../../App'
import { useTranslation, Trans } from 'react-i18next'
import img1 from '../../assets/results/techInfo_hand.svg'
import img2 from '../../assets/results/techInfo_board.svg'

export const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'unset',
    maxWidth: 'unset',
  },
  list: {
    '& ul': {
      paddingBottom: '20px',
      borderBottom: '1px solid #EEEEEE',
      [theme.breakpoints.up('md')]: {
        marginLeft: '50px',
        paddingBottom: '30px',
      },
    },

    '& li': {
      color: '#4C697E;',
      margin: '10px 0',
    },
  },
  heading: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    '& h4': {
      fontFamily: playfairDisplayFont,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '1.8rem',
      color: '#222222',
    },
    '& img': {
      width: '50px',
      verticalAlign: 'bottom',
      [theme.breakpoints.down('md')]: {
        margin: '20px 0',
      },
      [theme.breakpoints.up('md')]: {
        margin: '0 40px 0 0',
      },
    },
  },
}))

const TechnicalInfo: FunctionComponent = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div className={classes.root}>
      <h2>{t('resultTechInfo.title')}</h2>
      <p>{t('resultTechInfo.p1')}</p>
      <div className={classes.list}>
        <div className={classes.heading}>
          <img src={img1} alt=""></img>
          <h4>{t('resultTechInfo.subhead1')}</h4>
        </div>
        <ul>
          <Trans i18nKey="resultTechInfo.text1">
            <li></li>
            <li></li>
          </Trans>
        </ul>
        <div className={classes.heading}>
          <img src={img2} alt=""></img>
          <h4>{t('resultTechInfo.subhead2')}</h4>
        </div>
        <ul>
          <Trans i18nKey="resultTechInfo.text2">
            <li></li>
            <li></li>
          </Trans>
        </ul>
      </div>
    </div>
  )
}

export default TechnicalInfo
