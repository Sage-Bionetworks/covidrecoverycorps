import React, { useState, ChangeEvent } from 'react'
import Button from '@material-ui/core/Button/Button'
import { CardContent, Card } from '@material-ui/core'
export const Done: React.FunctionComponent = ({}) => {
  return (
    <Card>
      <CardContent>
        <div className="text-center">
          <h3> Thank you for submitting your survey!</h3>
        </div>
        <Button
          type="button"
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() => (window.location.href = '/Dashboard')}
        >
          Return to dashboard
        </Button>
      </CardContent>
    </Card>
  )
}

export default Done
