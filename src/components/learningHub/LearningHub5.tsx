import { makeStyles } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: 'blue',
    marginBottom: '1rem',
  },
  heading: {
    fontWeight: 'bold',
  },
}))

const LearningHub5: FunctionComponent = () => {
  console.log('lh53')
  const classes = useStyles()
  const { t } = useTranslation()
  const [arr] = React.useState(new Array(5))
  return (
    <div>
      <h3>{t('learningHub.lh5.title')}</h3>
      {[...arr].map((item, index) => (
        <ExpansionPanel key={`faq_${index}`}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {t(`learningHub.lh5.q${index + 1}`)}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{t(`learningHub.lh5.a${index + 1}`)}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  )
}

export default LearningHub5
