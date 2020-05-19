import React from 'react'
import { Grid } from '@material-ui/core'

export const BlueSeparator: React.FunctionComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="margin-top-std margin-bottom-std"
    >
      <svg
        width="80"
        height="4"
        viewBox="0 0 80 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="80" height="4" fill="#0085FF" />
      </svg>
    </Grid>
  )
}

export default BlueSeparator
