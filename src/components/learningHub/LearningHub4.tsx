import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next'
export const useStyles = makeStyles(theme => ({}))

const LearningHub4: FunctionComponent = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div>
      <h3>{t('learningHub.lh4.title')}</h3>
      <div>
        <Trans i18nKey="learningHub.lh4.text">
          <p>[translate]</p>
          <p>[translate]</p>
          <p>[translate]</p>
          <p>[translate]</p>
        </Trans>
      </div>
    </div>
  )
}

export default LearningHub4
