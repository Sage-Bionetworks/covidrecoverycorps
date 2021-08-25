import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'

import { useTranslation, Trans } from 'react-i18next'
import img1 from '../../assets/hub/imgLh3.svg'

export const useStyles = makeStyles(theme => ({}))

const LearningHub3: FunctionComponent = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div>
      <h3>{t('learningHub.lh3.title')}</h3>
      <div>
        <p>{t('learningHub.lh3.text')}</p>
      </div>
      <div className="text-center" style={{ marginTop: '50px' }}>
        <img src={img1} />
      </div>
    </div>
  )
}

export default LearningHub3
