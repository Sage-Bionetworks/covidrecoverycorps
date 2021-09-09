import { Box, makeStyles } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { openSansFont, playfairDisplayFont } from '../../App'
import BiologicalSexPieChart from '../../assets/dashboard/survey-results/biological_sex_pie_chart.svg'
import ColorfulClipboard from '../../assets/dashboard/survey-results/clipboard.svg'
import DashedLine from '../../assets/dashboard/survey-results/dashed_line.svg'
import DiagnosisFollowUpChart from '../../assets/dashboard/survey-results/diagnosis_follow_up_chart.svg'
import EducationPieChart from '../../assets/dashboard/survey-results/education_pie_chart.svg'
import EthnicityPieChart from '../../assets/dashboard/survey-results/ethnicity_pie_chart.svg'
import FemaleInfectionSymptomsGraph from '../../assets/dashboard/survey-results/female_infection_symptoms.svg'
import InitialSymptomsBarGraph from '../../assets/dashboard/survey-results/initial_infection_symptoms_chart.svg'
import ShortVsLongInfectionGraph from '../../assets/dashboard/survey-results/initial_vs_long_infection_graph.svg'
import MaleInfectionSymptomsGraph from '../../assets/dashboard/survey-results/male_infection_symptoms.svg'
import ParticipantsByIncomeGraph from '../../assets/dashboard/survey-results/participants_by_income_levels_bar_graph.svg'

export const useStyles = makeStyles(theme => ({
  headerText: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '40px',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '100px',
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
  headerDescriptionText: {
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
    maxWidth: '640px',
  },
  followUpSurveryContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  followUpSurveyText: {
    maxWidth: '500px',
    fontFamily: playfairDisplayFont,
    fontSize: '24px',
    lineHeight: '30px',
    marginBottom: theme.spacing(2.75),
  },

  newMedicalDiagnosisContainer: {
    fontFamily: openSansFont,
    fontStyle: '18px',
    lineHeight: '24px',
    maxWidth: '600px',
    marginBottom: theme.spacing(10),
  },
  medicalDiagnosisContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    alignItems: 'center',
    paddingTop: theme.spacing(4),
  },
  whiteContainer: {
    backgroundColor: 'white',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderImage: 'url(' + DashedLine + ') 60 round',
    borderTop: '1px solid transparent',
  },
}))

type ResultProps = {}

const BottomSurveyResults: React.FunctionComponent = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box className={classes.bottomContainer}>
      <Box className={classes.container} mb={6}>
        <Box className={classes.headerText} mb={3.75}>
          {t('studyResults.graph1Header')}
        </Box>
        <img src={ParticipantsByIncomeGraph}></img>
      </Box>
      <Box className={classes.container} mb={8}>
        <Box className={classes.headerText} mb={1.4}>
          {t('studyResults.graph2Header')}
        </Box>
        <Box className={classes.headerDescriptionText}>
          {t('studyResults.graph2Description')}
        </Box>
        <img src={InitialSymptomsBarGraph}></img>
      </Box>
      <Box className={classes.container} mb={4}>
        <Box className={classes.headerText} mb={1.5}>
          {t('studyResults.graph3Header')}
        </Box>
        <Box display="flex">
          <img
            src={FemaleInfectionSymptomsGraph}
            style={{ marginRight: '12px' }}
          ></img>
          <img src={MaleInfectionSymptomsGraph}></img>
        </Box>
      </Box>
      <Box className={classes.whiteContainer}>
        <Box className={classes.container} mb={4}>
          <Box className={classes.followUpSurveryContainer}>
            <img src={ColorfulClipboard} style={{ marginRight: '16px' }}></img>
            <Box className={classes.followUpSurveyText}>
              <strong>{t('studyResults.followUpText.header')}</strong>
              <Box mt={2}>
                <strong>
                  {t('studyResults.followUpText.paragraph1.bolded')}
                </strong>
                {t('studyResults.followUpText.paragraph1.regular')}
              </Box>
              <Box mt={2}>
                <strong>
                  {t('studyResults.followUpText.paragraph2.bolded1')}
                </strong>{' '}
                {t('studyResults.followUpText.paragraph2.regular1')}{' '}
                <strong>
                  {t('studyResults.followUpText.paragraph2.bolded2')}
                </strong>
                {t('studyResults.followUpText.paragraph2.regular2')}
              </Box>
            </Box>
          </Box>
          <strong className={classes.headerText}>
            {t('studyResults.graph4Header')}
          </strong>
          <img src={ShortVsLongInfectionGraph}></img>
        </Box>
      </Box>
      <Box className={classes.medicalDiagnosisContainer}>
        <Box maxWidth="600px">
          <strong className={classes.headerText}>
            {t('studyResults.medicalDiagnosis.header')}
          </strong>
          <Box
            className={classes.headerText}
            style={{ fontWeight: 'normal' }}
            mt={3}
            mb={3}
          >
            {t('studyResults.medicalDiagnosis.description')}
          </Box>
          <Box className={classes.newMedicalDiagnosisContainer}>
            {t('studyResults.medicalDiagnosis.paragraph1')}
            <ul style={{ marginBottom: '12px', marginTop: '12px' }}>
              <li style={{ marginBottom: '10px' }}>
                {t('studyResults.medicalDiagnosis.listItem1')}
              </li>
              <li style={{ marginBottom: '12px' }}>
                {t('studyResults.medicalDiagnosis.listItem2')}
              </li>
            </ul>
            {t('studyResults.medicalDiagnosis.paragraph2')}
          </Box>
        </Box>
        <Box className={classes.headerText} mb={3}>
          {t('studyResults.graph5Header')}
        </Box>
        <img src={DiagnosisFollowUpChart}></img>
        <Box mt={4} maxWidth="600px">
          {t('studyResults.disclaimer')}
        </Box>
      </Box>
    </Box>
  )
}

const SurveyResults: FunctionComponent<ResultProps> = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <>
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
      <Box ml={-62}>
        <BottomSurveyResults />
      </Box>
    </>
  )
}

export default SurveyResults
