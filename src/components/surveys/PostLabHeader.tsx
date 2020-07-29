import React, { useState, ChangeEvent } from 'react'
import Button from '@material-ui/core/Button/Button'
import { CardContent, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
root: {
    padding: '3rem 1.5rem 2rem 1.5rem'
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
  const labels = [
    'Not at all concerned',
    'Slightly concerned',
    'Somewhat concerned',
    'Moderately concerned',
    'Extremely concerned',
  ]

  const classes = useStyles()

  const cir = <div className={classes.circle}></div>
  return (
    <div className={classes.root}>
      <span style={{fontStyle: 'italic', paddingBottom: '1rem'}}>Please select a value the best represents how you feel for each concern:</span>
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
