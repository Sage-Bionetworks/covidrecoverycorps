import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Grid,
  Card,
  Button,
  CardContent,
  CircularProgress,
  colors,
} from '@material-ui/core'
import { playfairDisplayFont } from '../../App'
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
import TechnicalInfo from './TechicalInfo'
import { Feature, TOGGLE_NAMES } from '../../helpers/FeatureToggle'

type ResultProps = {
  testResult?: TestResult
  userData: LoggedInUserData
  changeTabCallbackFn: Function
}

export const RESULT_COLOR = {
  POSITIVE: '#FC9090',
  NEGATIVE: '#7ddef0',
  INDETERMINATE: '#3CDDD3',
}

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f5f5f5',
    overflow: 'unset',
    maxWidth: 'unset',
    [theme.breakpoints.down('md')]: {
      marginBottom: '3rem',
    },
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
  list1: {
    '& li': {
      margin: '10px 0',
    },
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
    maxWidth: 'unset',
  },
  videoContainerDiv: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: '5rem',
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
    color: RESULT_COLOR.POSITIVE,
  },
  resultDataHeaderNegative: {
    color: RESULT_COLOR.NEGATIVE,
  },
  resultDataHeaderInconclusive: {
    color: RESULT_COLOR.INDETERMINATE,
  },

  contact: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    fontSize: '2rem',
    lineHeight: '127%',
  },
}))
export const Result: React.FunctionComponent<ResultProps> = ({
  testResult,
  userData,
  changeTabCallbackFn,
}: ResultProps) => {
  const classes = useStyles()

  const { t } = useTranslation()

  //positives
  const positiveHeader = (
    <>
      {userData.firstName}, &nbsp;
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
      <ul className={classes.list1}>
        <li>[translate]</li>
        <li>[translate]</li>
        <li>[translate]</li>
      </ul>
    </Trans>
  )

  //negatives
  const negativeHeader = (
    <>
      {userData.firstName}, &nbsp;
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
      <ul className={classes.list1}>
        <li>[translate]</li>

        <li>[translate]</li>
        <li>[translate]</li>
      </ul>
    </Trans>
  )

  //inconclusive
  const inconclusiveHeader = (
    <>
      {userData.firstName}, &nbsp;
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
      <ul className={classes.list1}>
        <li>[translate]</li>
        <li>[translate]</li>
        <li>[translate]</li>
      </ul>
    </Trans>
  )

  const nextSteps = (
    <Button
      type="button"
      variant="contained"
      color="primary"
      className="btnVerticallySpaced"
      onClick={() => changeTabCallbackFn(1)}
    >
      {t('result.whatNext')}
    </Button>
  )

  const learnMore = (
    <>
      <p className={classes.learnMore}>{t('result.learnMore')}</p>
      <div className="text-center">
        <Button
          type="button"
          className="btnVerticallySpaced"
          variant="contained"
          color="primary"
          onClick={() => alert('download')}
        >
          {t('result.learnMoreCTA')}
        </Button>
      </div>
    </>
  )

  type PageVersion = {
    HEADER: JSX.Element
    TEXT: JSX.Element
    LIST: JSX.Element
    TOP_IMG: JSX.Element
    BG_IMG: JSX.Element
    NEXT: JSX.Element
  }

  type PageVersions = {
    [key in TestResultString]: PageVersion
  }

  const versions: PageVersions = {
    POSITIVE: {
      HEADER: positiveHeader,
      TEXT: positiveText,
      LIST: positiveList,
      TOP_IMG: <img src={positiveTopImg}></img>,
      BG_IMG: <img src={positiveTri}></img>,
      NEXT: nextSteps,
    },
    NEGATIVE: {
      HEADER: negativeHeader,
      TEXT: negativeText,
      LIST: negativeList,
      TOP_IMG: <img src={negativeTopImg}></img>,
      BG_IMG: <img src={negativeTri}></img>,
      NEXT: learnMore,
    },
    INDETERMINATE: {
      HEADER: inconclusiveHeader,
      TEXT: inconclusiveText,
      LIST: inconclusiveList,
      TOP_IMG: <img src={inconclusiveTopImg}></img>,
      BG_IMG: <img src={inconclusiveTri}></img>,
      NEXT: learnMore,
    },
  }

  const getElement = (result: TestResultString, key: keyof PageVersion) => {
    if (!result) {
      return <></>
    }
    return versions[result][key]
  }

  const capitalize = (_str: string): string =>
    _str.charAt(0).toUpperCase() + _str.slice(1)

  const renderResultForPrint = (result: TestResult): JSX.Element => {
    const resultValue = result.data.valueString.toUpperCase()
    const removeBreaks = (_str: string) => _str.replace(/\\.br.\\/g, '')

    const patient = result.data.contained?.find(
      item => item['resourceType'] === 'Patient',
    )

    const specimen = result.data.contained?.find(
      item => item['resourceType'] === 'Specimen',
    )

    const performer = result.data.performer[0]

    const performerDetails = performer ? performer.extension[0] : undefined
    if (!patient) {
      return <></>
    }
    return (
      <>
        <div style={{ borderStyle: 'double none double none' }}>
          Patient: {_.get(patient, 'name[0].family')},{' '}
          {_.get(patient, 'name[0].given')}
          <br />
          MRN: {result.data.subject.reference.split('/')[1]}
          <br />
          DOB: {new Date(patient.birthDate).toLocaleDateString()}
          <br />
          Sex: {capitalize(patient.gender)}
          <br />
        </div>
        <div style={{ float: 'right' }}>
          Status: <strong>{capitalize(result.data.status)}</strong>
        </div>
        <div style={{ clear: 'both' }}>
          <table style={{ width: '80%' }}>
            <thead>
              <tr>
                <td>&nbsp;</td>
                <td>Value</td>
                <td>Range</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {' '}
                  {_.get(result.data, 'code.coding[0].display').toUpperCase()}
                </td>
                <td>
                  <strong>{result.data.valueString}</strong>
                </td>
                <td>{result.data.valueRange.extension[0].valueString}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <strong>Comments:</strong> <br />
        <p style={{ fontFamily: 'Courier New', fontSize: '12px' }}>
          {removeBreaks(result.data.comment)}
        </p>
        <div style={{ height: '30px' }}></div>
        <table style={{ width: '100%', fontSize: '12px' }}>
          <tbody>
            <tr>
              <td colSpan={2}>Performing Lab: {performer?.display}</td>
              <td colSpan={2}>CLIA: {performerDetails?.valueCode}</td>
            </tr>
            <tr>
              <td colSpan={2}>Director: {performerDetails?.valueString}</td>
              <td colSpan={2}>
                Address: {performerDetails?.valueAddress?.text}
              </td>
            </tr>
            <tr>
              <td>
                Specimen Type:
                <br />
                {specimen.type?.text}
              </td>
              <td>
                Specimen Collected:
                <br />
                {new Date(
                  specimen?.collection?.collectedDateTime,
                ).toLocaleString()}{' '}
              </td>
              <td>
                Specimen Received Date:
                <br />
                {new Date(result.data.effectiveDateTime).toLocaleString()}
              </td>
              <td>
                Last Resulted:
                <br />
                {new Date(result.data.issued).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }

  const renderResult = (result: TestResult): JSX.Element => {
    const resultValue = result.data.valueString.toUpperCase() as TestResultString
    if (['NEGATIVE', 'POSITIVE', 'INDETERMINATE'].indexOf(resultValue) === -1)
      return (
        <Card className={`${classes.root}`} style={{ position: 'relative' }}>
          <div className={classes.corner}>Invalid Test Result</div>
        </Card>
      )
    return (
      <>
        <Card className={`${classes.root}`} style={{ position: 'relative' }}>
          <div className={classes.corner}>
            {getElement(resultValue, 'BG_IMG')}
          </div>
          <div className={classes.resultContainerDiv}>
            <div className={classes.topImage}>
              {getElement(resultValue, 'TOP_IMG')}
            </div>
            <div
              className={classes.resultDataHeader}
              data-cy="resultDataHeader"
            >
              {getElement(resultValue, 'HEADER')}
            </div>
            <div className={classes.explanationText}>
              {getElement(resultValue, 'TEXT')}
            </div>
            {getElement(resultValue, 'LIST')}

            <div className="text-center" style={{ width: '100%' }}>
              {
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className="btnVerticallySpaced"
                  onClick={() => window.print()}
                >
                  {t('result.download')}
                </Button>
              }
            </div>
          </div>
        </Card>
        <h2 className="text-center">{t('result.explain')}</h2>
        <Card className={classes.cardNoBg}>
          <Feature toggleName={TOGGLE_NAMES.RESULTS_VIDEO}>
            <div className={classes.videoContainerDiv}>
              <iframe
                src="https://player.vimeo.com/video/449347196"
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen={true}
              ></iframe>
            </div>
          </Feature>
          <Feature toggleName={TOGGLE_NAMES.RESULTS_VIDEO} showIfFalse>
            <>{/*possible alternate content */}</>
          </Feature>
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

          <TechnicalInfo></TechnicalInfo>

          <div className="text-center">{getElement(resultValue, 'NEXT')}</div>
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
                    [trans]
                    <br />
                    [trans]
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

  if (testResult) {
    return (
      <>
        <div className="no-print">{renderResult(testResult)}</div>
        <div className="print-only">{renderResultForPrint(testResult)}</div>
      </>
    )
  }
  if (userData.dataGroups.includes('tests_collected')) {
    return <div>{renderProcessing()}</div>
  } else return <></>
}

export default Result
