import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { playfairDisplayFont } from '../../App'
import iconCheckMark from '../../assets/dashboard/icon_whoohoo.svg'
import { SavedSurvey } from '../../types/types'
import SurveyWrapper from '../surveys/SurveyWrapper'
import UploadResult from '../surveys/UploadResult'


export const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'unset',
    maxWidth: 'unset',
  },

  loader: {
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
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

type ResultProps = {
  token?: string
 // unfinishedSurveys: string[]
 savedMonthlySurvey?: SavedSurvey
  onSurveyFinishedFn: Function
}

const MonthlySurvey: FunctionComponent<ResultProps> = ({
  //unfinishedSurveys,
  savedMonthlySurvey,
  token,
  onSurveyFinishedFn,
}: ResultProps) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
 // const [survey, setSurvey] = useState<SavedSurvey | undefined>(undefined)

  const [toggle, setToggle]= React.useState(false)
  const [pageState, setPageState] = useState<
    'INTRO' | 'SURVEY' | 'SURVEY_DONE'
  >((!savedMonthlySurvey || !savedMonthlySurvey.completedDate )?  'INTRO': 'SURVEY_DONE')


  if (isLoading) {
    return <Box mx="auto" textAlign="center"><CircularProgress/></Box>
  }

  switch (pageState) {
    case 'SURVEY_DONE':
      return  (
        <div style={{ textAlign: 'center', margin: '0 auto' }}>
          <img src={iconCheckMark}></img>
          <h3>{t('resultDashboard.thankYou')}</h3>
          <span>{savedMonthlySurvey?.data.reinfection?.positive_test} TEST </span>
    
          {savedMonthlySurvey?.data.reinfection?.positive_test  === "Yes" &&    <UploadResult token={token || ''}></UploadResult>}
        </div>
      )

    case 'SURVEY':
      return (
      <SurveyWrapper
      formTitle="Post Lab"
      token={token || ''}
      surveyName={'POST_LAB_MONTHLY'}
      formClass="crc"
      cardClass="inherit"
      onDoneCallback={() => {
     
       // setToggle(prev => !prev)
        //setPageState('SURVEY_DONE')
        onSurveyFinishedFn('POST_LAB')
      }}
    ></SurveyWrapper>)
    default:

      return (
        <>
          <h2>{t('resultNext.title')}</h2>
          {(!savedMonthlySurvey || !savedMonthlySurvey.completedDate ) && (
            <>
              <p>{t('resultNext.text1')}</p>
              <div className="text-center btnVerticallySpaced">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setPageState('SURVEY')}
                >
                  {t('resultNext.surveyCTA')}
                </Button>
              </div>
            </>
          )}
        </>
      )
  }
}

export default MonthlySurvey
