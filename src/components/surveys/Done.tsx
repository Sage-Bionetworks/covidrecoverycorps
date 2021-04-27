import { Card, CardContent } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Done: React.FunctionComponent = ({}) => {
  const { t } = useTranslation()

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
          onClick={() => (window.location.href = '/Dashboard?just_finished')}
        >
          {t('surveys.done.toDashboard')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default Done
