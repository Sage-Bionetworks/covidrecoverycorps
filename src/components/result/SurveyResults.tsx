import { makeStyles, Box } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { playfairDisplayFont } from '../../App'
import EthnicityPieChart from '../../assets/dashboard/survey-results/ethnicity_pie_chart.svg'
import BiologicalSexPieChart from '../../assets/dashboard/survey-results/biological_sex_pie_chart.svg'
import EducationPieChart from '../../assets/dashboard/survey-results/education_pie_chart.svg'
import { useTranslation } from 'react-i18next'

export const useStyles = makeStyles(theme => ({
  headerText: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '40px',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  descriptionText: {
    fontFamily: playfairDisplayFont,
    fontSize: '24px',
    lineHeight: '30px',
    textAlign: 'center',
    marginTop: theme.spacing(4),
    maxWidth: '600px',
  },
}))

type ResultProps = {}

const SurveyResults: FunctionComponent<ResultProps> = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.headerText}>{t('studyResults.title')}</Box>
      <Box className={classes.descriptionText}>
        <strong>{t('studyResults.titleDescription.bolded')}</strong>
        {t('studyResults.titleDescription.regular')}
      </Box>
      <Box className={classes.container}>
        <img src={EthnicityPieChart} style={{ marginTop: '96px' }}></img>
        <img src={BiologicalSexPieChart} style={{ marginTop: '40px' }}></img>
        <img src={EducationPieChart} style={{ marginTop: '40px' }}></img>
      </Box>
    </Box>
  )
}

export default SurveyResults
