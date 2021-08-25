import { makeStyles } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

export const useStyles = makeStyles(theme => ({}))

type ResultProps = {}

const SurveyResults: FunctionComponent<ResultProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <h2>'surveyResults'</h2>
    </>
  )
}

export default SurveyResults
