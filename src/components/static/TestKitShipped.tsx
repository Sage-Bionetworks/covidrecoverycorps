import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Card, Button, Box } from '@material-ui/core'

import { ReactComponent as ColumbiaLogo } from '../../assets/columbia_logo.svg'
import { ReactComponent as SageLogo } from '../../assets/sage_logo.svg'

import { useTranslation, Trans } from 'react-i18next'
import 'moment/locale/es'

type TestKitShippedProps = {
  token?: string
}

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  containerDiv: {
    margin: '0px 30px 0 30px',
  },

  logosDiv: {
    padding: '40px 30px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  logosDivSeparator: {
    width: '5px',
    borderRight: '2px #EEEEEE solid',
    margin: '0px 50px',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0px #EEEEEE solid',
      margin: '10px 5px',
    },
  },
  logo: {
    height: '50px',
    maxWidth: '200px',
  },
}))
export const TestKitShipped: React.FunctionComponent<TestKitShippedProps> = ({
  token,
}: TestKitShippedProps) => {
  const classes = useStyles()
  // const [testKitInfo, testKitInfo] = useState<BookedTestKitShipped>()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const { t } = useTranslation()

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          //some info to get the tracking
        } catch (e) {
          if (isSubscribed) {
            setError(e)
          }
        } finally {
          if (isSubscribed) {
            setIsLoading(false)
          }
        }
      }
    }
    getInfo()
    return () => {
      isSubscribed = false
    }
  }, [token])

  return (
    <Card className={classes.root} data-cy="page-trackKit">
      <div className={classes.containerDiv}>
        <h2 className="text-center">{t('testKitShipped.title')}</h2>

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Trans i18nKey="testKitShipped.text1">
              <p>[translate]</p>
            </Trans>
            <Box
              textAlign="center"
              marginTop="56px"
              marginLeft="auto"
              marginRight="auto"
              width="240px"
            >
              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={() => {}}
              >
                {t('testKitShipped.cta')}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <div className={classes.logosDiv}>
          <ColumbiaLogo className={classes.logo} />
          <div className={classes.logosDivSeparator}></div>
          <SageLogo className={classes.logo} />
        </div>
      </div>
    </Card>
  )
}

export default TestKitShipped
