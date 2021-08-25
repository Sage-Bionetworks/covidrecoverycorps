import React from 'react'
import { makeStyles } from '@material-ui/core'

type TwoColumnTemplateProps = {
  nav: JSX.Element
  main: JSX.Element
}

export const useStyles = makeStyles(theme => ({
  root: {
    maxWith: '1080',
  },

  body: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  nav: {
    width: '100%',
    marginRight: '0',

    [theme.breakpoints.up('md')]: {
      width: '288px',
      marginRight: '5rem',
      flexShrink: 0,
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: '3.2rem',
    },
  },

  main: {
    width: '100%',
  },
}))
export const TwoColumnTemplate: React.FunctionComponent<TwoColumnTemplateProps> = ({
  nav,
  main,
}: TwoColumnTemplateProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <div className={classes.nav}>{nav}</div>
        <div className={classes.main}>{main}</div>
      </div>
    </div>
  )
}

export default TwoColumnTemplate
