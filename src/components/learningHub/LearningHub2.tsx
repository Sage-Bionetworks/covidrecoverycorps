import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'

import { useTranslation, Trans } from 'react-i18next'
import img1 from '../../assets/hub/img1.svg'

export const useStyles = makeStyles(theme => ({}))

const LearningHub2: FunctionComponent = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div>
      <h3>{t('learningHub.lh2.title')}</h3>
      <div>
        <Trans i18nKey="learningHub.lh2.text">
          <p>[translate]</p>
          <p>[translate]</p>
          <p>[translate]</p>
        </Trans>
      </div>
    </div>
  )
}

export default LearningHub2
