import React, { useState, ChangeEvent } from 'react'

import { makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  root: {
    padding: '3rem 1.5rem 2rem 1.5rem',
  },
  table: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cell: {
    flexBasis: '20%',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  circle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '1px solid #000000',
    margin: '0 auto',
  },
})

export const PostLabHeader: React.FunctionComponent = ({}) => {
  const { t } = useTranslation()
  const labels = [
    t('surveys.postLab.concern0'),
    t('surveys.postLab.concern1'),
    t('surveys.postLab.concern2'),
    t('surveys.postLab.concern3'),
    t('surveys.postLab.concern4'),
  ]

  const classes = useStyles()

  const cir = <div className={classes.circle}></div>
  return (
    <div className={classes.root}>
      <span style={{ fontStyle: 'italic', paddingBottom: '1rem' }}>
        {t('surveys.postLab.text1')}
      </span>
      <div className={classes.table}>
        {labels.map((item, i) => (
          <div className={classes.cell}>
            {i}
            <br />
            {cir}
            <br />
            {labels[i]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostLabHeader
