import React, { useState, ChangeEvent } from 'react'
import Button from '@material-ui/core/Button/Button'
import { CardContent, Card } from '@material-ui/core'
import { useTranslation} from 'react-i18next'

export const Done: React.FunctionComponent = ({}) => {

  const {t} = useTranslation()

  return (
    <Card>
      <CardContent>
        <div className="text-center">
          <h3>{t('surveys.done.thanks')}</h3>
        </div>
        <Button
          type="button"
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() => (window.location.href = '/Dashboard')}
        >{t('surveys.done.toDashboard')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default Done
