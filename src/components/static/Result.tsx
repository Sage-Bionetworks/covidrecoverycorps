import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Grid,
  Card,
  Button,
  CardContent,
  CircularProgress,
  createMuiTheme,
} from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import {
  TestResult,
  TestResultString,
  LoggedInUserData,
} from '../../types/types'
import negativeTri from '../../assets/results/rect_negative.svg'
import positiveTri from '../../assets/results/rect_positive.svg'
import inconclusiveTri from '../../assets/results/rect_indeterminate.svg'
import negativeTopImg from '../../assets/results/result_negative.svg'
import positiveTopImg from '../../assets/results/result_positive.svg'
import inconclusiveTopImg from '../../assets/results/result_indeterminate.svg'
import contactUs from '../../assets/results/contact_us.svg'

import { UserService } from '../../services/user.service'

import { useTranslation, Trans } from 'react-i18next'

import Alert from '@material-ui/lab/Alert'
import moment from 'moment'
import _ from 'lodash'

type ResultProps = {
  token?: string
}

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
    overflow: 'unset',
    maxWidth: 'unset',
  },

  resultContainerDiv: {
    margin: '0px 30px 0 30px',
  },
  corner: {
    position: 'relative',
    width: '50px',
    top: '-2px',
    left: '-2px',
    backgroundColor: '#fafafa',
  },
  topImage: {
    textAlign: 'center',
    margin: '4rem auto 3rem auto',
  },
  cardNegatative: {
    backgroundImage: negativeTri,
  },
  explanationText: {
    '& p': {
      fontSize: '2rem',
      lineHeight: '160%',
    },
  },
  cardNoBg: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    maxWidth: 'unset'
  },
  videoContainerDiv: {
    position: 'relative',
    width: '100%',
    height: '0',

    marginBottom: '5rem',
    paddingBottom: '56.25%',
  },
  video: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
  learnMore: {
    fontFamily: playfairDisplayFont,

    fontSize: '2rem',
    lineHeight: '150%',
  },
  cardContact: {
    borderTop: '7px solid #FFDC5D',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    maxWidth: 'unset',
    '& p': {
      fontSize: '1.4rem',
    },

    '& .MuiCardContent-root': {
      padding: '46px 32px',
    },
  },

  resultDataHeader: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    fontSize: '2.5rem',
    lineHeight: '127%',
    marginBottom: '5rem',
  },
  resultDataHeaderPositive: {
    color: '#FC9090',
  },
  resultDataHeaderNegative: {
    color: '#7ddef0',
  },
  resultDataHeaderInconclusive: {
    color: '#3CDDD3',
  },

  contact: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    fontSize: '2rem',
    lineHeight: '127%',
  },
}))
export const Result: React.FunctionComponent<ResultProps> = ({
  token,
}: ResultProps) => {
  const classes = useStyles()
  const [result, setResult] = useState<TestResult>()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [userData, setUserData] = useState<LoggedInUserData | undefined>(
    undefined,
  )
  const { t } = useTranslation()

  useEffect(() => {
    let isSubscribed = true
    const getInfo = async () => {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfoResponse = await UserService.getUserInfo(token)
          setUserData(userInfoResponse.data)
          const ResultsResponse = await UserService.getTestResult(token)
          if (ResultsResponse?.data?.items?.length > 0) {
            const result = ResultsResponse.data.items[0]
            setResult(result)
          }
        } catch (e) {
          setError(e)
        } finally {
          setIsLoading(false)
        }
      }
    }
    getInfo()
    return () => {
      isSubscribed = false
    }
  }, [token])

  //positives
  const positiveHeader = (
    <>
      {userData?.firstName}, &nbsp;
      <span className={classes.resultDataHeaderPositive}>
        {t('result.positiveTitle1')},
      </span>
      &nbsp;
      {t('result.positiveTitle2')}
    </>
  )

  const positiveText = (
    <Trans i18nKey="result.positiveText1">
      <p>[translate]</p>
      <p>[translate]</p>
    </Trans>
  )

  const positiveList = (
    <Trans i18nKey="result.positiveText2">
      <ul>
        <li>[translate]</li>
        <li>[translate]</li>
        <li>[translate]</li>
      </ul>
    </Trans>
  )

  //negatives
  const negativeHeader = (
    <>
      {userData?.firstName}, &nbsp;
      <span className={classes.resultDataHeaderNegative}>
        {t('result.negativeTitle1')},
      </span>
      &nbsp;{t('result.negativeTitle2')}
    </>
  )

  const negativeText = (
    <Trans i18nKey="result.negativeText1">
      <p>[translate]</p>
      <p>[translate]</p>
    </Trans>
  )

  const negativeList = (
    <Trans i18nKey="result.negativeText2">
      <ul>
        <li>[translate]</li>

        <li>[translate]</li>
        <li>[translate]</li>
      </ul>
    </Trans>
  )

  //inconclusive
  const inconclusiveHeader = (
    <>
      {userData?.firstName}, &nbsp;
      <span className={classes.resultDataHeaderInconclusive}>
        {t('result.inconclusiveTitle1')}
      </span>
      .
    </>
  )

  const inconclusiveText = (
    <Trans i18nKey="result.inconclusiveText1">
      <p>[translate]</p>
      <p>[translate]</p>
    </Trans>
  )

  const inconclusiveList = (
    <Trans i18nKey="result.inconclusiveText2">
      <ul>
        <li>[translate]</li>
        <li>[translate]</li>
        <li>[translate]</li>
      </ul>
    </Trans>
  )

  type PageVersion = {
    HEADER: JSX.Element
    TEXT: JSX.Element
    LIST: JSX.Element
    TOP_IMG: JSX.Element
    BG_IMG: JSX.Element
  }

  type PageVersions = {
    [key in TestResultString]: PageVersion
  }

  const versions: PageVersions = {
    Detected: {
      HEADER: positiveHeader,
      TEXT: positiveText,
      LIST: positiveList,
      TOP_IMG: <img src={positiveTopImg}></img>,
      BG_IMG: <img src={positiveTri}></img>,
    },
    'Not Detected': {
      HEADER: negativeHeader,
      TEXT: negativeText,
      LIST: negativeList,
      TOP_IMG: <img src={negativeTopImg}></img>,
      BG_IMG: <img src={negativeTri}></img>,
    },
    Inconclusive: {
      HEADER: inconclusiveHeader,
      TEXT: inconclusiveText,
      LIST: inconclusiveList,
      TOP_IMG: <img src={inconclusiveTopImg}></img>,
      BG_IMG: <img src={inconclusiveTri}></img>,
    },
  }

  const getElement = (result: TestResultString, key: keyof PageVersion) => {
    if (!result) {
      return <></>
    }
    return versions[result][key]
  }
  const renderResultForPrint = (result: TestResult): JSX.Element => {
    const patient = result.data.contained?.find(
      item => item['resourceType'] === 'Patient',
    )
    if (!patient) {
      return <></>
    }
    return (
      <>
        <div style={{ borderStyle: 'double none double none' }}>
          Patient: {_.get(patient, 'name[0].family')},{' '}
          {_.get(patient, 'name[0].given')}
          <br />
          MRN: DONT KNOW
          <br />
          DOB: {patient.birthDate}
          <br />
          Sex: {patient.gender}
          <br />
        </div>
        <h3 style={{ float: 'left' }}>COVID-19 SEROLOGY TEST</h3>
        <div style={{ float: 'right' }}>Status: {result.data.status}|</div>
        <div style={{ clear: 'both' }}>
          <table style={{width: '80%'}}>
            <tr>
              <th>&nbsp;</th>
              <th>Value</th>
              <th>Range</th>
            </tr>
            <tr>
              <td> {_.get(result.data, 'code.coding[0].display')}</td>
              <td>
                <strong>{result.data.valueString}</strong>
              </td>
              <td></td>
            </tr>
          </table>
        </div><br /><br />
        Comments: <br />
        {result.data.comment}
        <div style={{ borderStyle: 'dashed none dashed none' }}>
          {moment(result.data.effectiveDateTime).toLocaleString()}
          <br />
        </div>
      </>
    )
  }

  const renderResult = (result: TestResult): JSX.Element => {
    return (
      <>
        <Card className={`${classes.root}`} style={{ position: 'relative' }}>
          <div className={classes.corner}>
            {getElement(result.data.valueString, 'BG_IMG')}
          </div>
          <div className={classes.resultContainerDiv}>
            <div className={classes.topImage}>
              {getElement(result.data.valueString, 'TOP_IMG')}
            </div>
            <div className={classes.resultDataHeader}>
              {getElement(result.data.valueString, 'HEADER')}
            </div>
            <div className={classes.explanationText}>
              {getElement(result.data.valueString, 'TEXT')}
            </div>
            {getElement(result.data.valueString, 'LIST')}
           
            <div className="text-center"   style={{ margin: '30px auto', height: '1px'}}>
              {/* ALINA REMOVE TEMP <Button
                type="button"
              
                variant="contained"
                color="primary"
                onClick={() => window.print()}
              >
                {t('result.download')}
              </Button>*/}
            </div>
          </div>
        </Card>
        <h2 className="text-center">{t('result.explain')}</h2>
        <Card className={classes.cardNoBg}>
         {/*agendel: add when video is ready <div className={classes.videoContainerDiv}>
            <iframe
              src="https://www.youtube.com/embed/HdfuSDxApwE"
              frameBorder="0"
              className={classes.video}
              allowFullScreen
            ></iframe>
    </div> */}
          <p>
            <Trans i18nKey="result.text1">
              [translate]<strong></strong>
            </Trans>
          </p>

          <div>
            <Trans i18nKey="result.text2">
              <p>[translate]</p>
              <p>[translate]</p>
            </Trans>
          </div>
          <p>
            <a
              href="https://www.figma.com/file/NYYPVfRsbtUflNyySnFeDK/COVID_flow?node-id=1661%3A4481"
              target="_blank"
            >
              {t('result.techInfo')}
            </a>
          </p>
          {/* What can do next if positive agendel TODO*/}
          {/* agendel TODO: link to learning hub result.data.valueString !== 'Detected' && (
            <>
              <p className={classes.learnMore}>{t('result.learnMore')}</p>
              <div className="text-center">
                <Button
                  type="button"
                  style={{ margin: '30px auto' }}
                  variant="contained"
                  color="primary"
                  onClick={() => alert('download')}
                >
                  {t('result.learnMoreCTA')}
                </Button>
              </div>
            </>
          )*/}
        </Card>
        <Card className={classes.cardContact}>
          <CardContent style={{ display: 'flex' }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={4}>
                <img src={contactUs} />
                <br></br>
                <span className={classes.contact}>{t('result.contact')}</span>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Trans i18nKey="result.contactText">
                  <p>[trans]</p>
                  <p>
                    [trans]<br></br>[trans]
                    <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
                      [translate]
                    </a>{' '}
                  </p>
                </Trans>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    )
  }

  const renderProcessing = (): JSX.Element => {
    return (
      <div className="text-center">
        <div className={classes.topImage}>
          <img src={inconclusiveTopImg} />
        </div>
        <div style={{ width: '300px', margin: '0 auto' }}>
          <Trans i18nKey="result.inProcess">
            <h3></h3>
            <h3></h3>
          </Trans>
        </div>
      </div>
    )
  }

  if (result && userData) {
    return (
      <>
        <div className="no-print">{renderResult(result)}</div>
        <div className="print-only">{renderResultForPrint(result)}</div>
      </>
    )
  }
  if (userData?.dataGroups.includes('tests_collected')) {
    return <div>{renderProcessing()}</div>
  }
  if (error) {
    return <Alert severity="error">{error!['message'] || error}</Alert>
  }

  return (
    <div className="text-center">
      <CircularProgress color="primary" />
    </div>
  )
}

export default Result
