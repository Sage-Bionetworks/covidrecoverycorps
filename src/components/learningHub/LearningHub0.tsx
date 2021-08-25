import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'

import { useTranslation, Trans } from 'react-i18next'
import img1 from '../../assets/hub/img1.svg'

export const useStyles = makeStyles(theme => ({}))

const LearningHub0: FunctionComponent = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div>
      <h3>{t('learningHub.lh0.title')}</h3>
      <div>
        <Trans i18nKey="learningHub.lh0.text1">
          <p>[translate]</p>
          <p>[translate]</p>
          <p>[translate]</p>
        </Trans>
      </div>
      <div>
        <img src={img1} style={{ width: '100%' }} />
      </div>
      <div>
        <Trans i18nKey="learningHub.lh0.text2">
          <p>[translate]</p>
          <p>[translate]</p>
          <p>[translate]</p>
          <p>[translate]</p>
        </Trans>
      </div>
    </div>
  )
}

export default LearningHub0
