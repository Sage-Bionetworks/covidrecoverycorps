import { makeStyles, Box } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { playfairDisplayFont } from '../../App'
import EthnicityPieChart from '../../assets/dashboard/survey-results/ethnicity_pie_chart.svg'
import BiologicalSexPieChart from '../../assets/dashboard/survey-results/biological_sex_pie_chart.svg'
import EducationPieChart from '../../assets/dashboard/survey-results/education_pie_chart.svg'

export const useStyles = makeStyles(theme => ({}))

type ResultProps = {}

const SurveyResults: FunctionComponent<ResultProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box
      style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        style={{
          fontFamily: playfairDisplayFont,
          fontWeight: 'bold',
          fontSize: '32px',
          lineHeight: '40px',
        }}
      >
        Thank you for participating in our study.
      </Box>
      <Box
        style={{
          fontFamily: playfairDisplayFont,
          fontSize: '24px',
          lineHeight: '30px',
          textAlign: 'center',
          marginTop: '32px',
          maxWidth: '600px',
        }}
      >
        <strong>901 people</strong> from all over the United States responded to
        our surveys. Here’s the breakdown of what our community looks like.
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={EthnicityPieChart} style={{ marginTop: '96px' }}></img>
        <img src={BiologicalSexPieChart} style={{ marginTop: '40px' }}></img>
        <img src={EducationPieChart} style={{ marginTop: '40px' }}></img>
      </Box>
    </Box>
  )
}

export default SurveyResults
