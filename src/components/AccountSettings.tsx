import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { blue } from '@material-ui/core/colors'
import { Button, Icon, withStyles } from '@material-ui/core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FloatingToolbar from './widgets/FloatingToolbar'
import LearnMore from './widgets/LearnMore'
import ConfirmationModal from './widgets/ConfirmationModal'
import { Link, Redirect } from 'react-router-dom'
import MaterialUiLink from '@material-ui/core/Link'
import { ConsentService } from '../services/consent.service'
import { UserService } from '../services/user.service'
import { LoggedInUserData, Response } from '../types/types'
import WithdrawSurvey from './surveys/WithdrawSurvey'
import Alert from '@material-ui/lab/Alert'
import { Card, CardContent } from '@material-ui/core'
import { setSession, getSession } from '../helpers/utility'
import { SurveyService } from '../services/survey.service'

type AcountSettingsProps = {
  token: string
}

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    '&$checked': {
      color: blue[500],
    },
    '&$checked + $track': {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch)

export const AcountSettings: React.FunctionComponent<AcountSettingsProps> = (
  props: AcountSettingsProps,
) => {
  const [isShareScopeAll, setIsShareScopeAll] = useState<boolean | undefined>()
  const [isEhrConsented, setIsEhrConsented] = useState<boolean | undefined>()
  const [
    isShowingWithdrawConfirmation,
    setIsShowingWithdrawConfirmation,
  ] = useState<boolean | undefined>(false)
  const [isRedirectingToEhr, setIsRedirectingToEhr] = useState<
    boolean | undefined
  >(false)
  const [isRedirectingHome, setIsRedirectingHome] = useState<
    boolean | undefined
  >(false)
  const [userId, setUserId] = useState<string | undefined>()
  const [error, setError] = useState('')
  const [withdrawlSurveyData, setWithdrawlSurveyData] = useState({})

  // initialize check box values
  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        setError('')
        try {
          const userInfoResponse = await UserService.getUserInfo(token)
          const userData: LoggedInUserData = userInfoResponse.data
          const isCurrentlySharingAll =
            ConsentService.SHARE_SCOPE_ALL == userData.sharingScope
          setIsShareScopeAll(_prev => isCurrentlySharingAll)
          const isEhrConsented =
            userData.dataGroups &&
            userData.dataGroups.includes('hipaa_consented')
          setIsEhrConsented(_prev => isEhrConsented)
          setUserId(userData.id)
        } catch (e) {
          setError(e.message)
        }
      }
    }
    getInfo(props.token)
    return () => {
      isSubscribed = false
    }
  }, [props.token])

  const handleConsentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setError('')
    const newScope = checked
      ? ConsentService.SHARE_SCOPE_ALL
      : ConsentService.SHARE_SCOPE_PARTNERS
    console.log(newScope)
    ConsentService.updateMySharingScope(newScope, props.token)
      .then((participantRecordResponse: Response<LoggedInUserData>) => {
        const isCurrentlySharingAll =
          ConsentService.SHARE_SCOPE_ALL ==
          participantRecordResponse.data.sharingScope
        setIsShareScopeAll(_prev => isCurrentlySharingAll)
      })
      .catch(err => {
        setError(err.message)
      })
  }
  const handleEhrConsentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setError('')
    if (checked) {
      //sign
      // we need the full participant name, right?
      // ConsentService.signEhrConsent(fullName,ConsentService.SHARE_SCOPE_PARTNERS, props.token).then(()=> {
      //   setIsEhrConsented(_prev => true)
      // })
      setIsRedirectingToEhr(true)
    } else {
      //unsign
      ConsentService.withdrawEhrConsent(props.token)
        .then(() => {
          setIsEhrConsented(_prev => false)
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }
  if (isRedirectingToEhr) {
    return <Redirect to="/consentehr/?from=ACCOUNT" />
  }
  if (isRedirectingHome) {
    // need a way to force App to reload the token, because the session is dead after withdrawing from the study!
    window.location.href = '/home?alert=WITHDRAWN_FROM_STUDY'
    // return <Redirect to='/home' />
  }

  const handleOnWithdrawFromStudyClick = async () => {
    setError('')
    try {
      await SurveyService.postToHealthData('WITHDRAW', withdrawlSurveyData, props.token)
      await ConsentService.withdrawFromStudy(userId!, props.token)
      setSession(props.token, getSession()?.name || '', false)
      setIsRedirectingHome(true)

      setIsShowingWithdrawConfirmation(false)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <div>
        <FloatingToolbar
          closeLinkDestination="/dashboard"
          closeIcon={faAngleLeft}
          closeLinkText="Dashboard"
        />
      </div>
      <Card>
        <CardContent>
          <h2 className="text-center margin-top-std">Account Settings</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <Link to="/contactinfo">Update contact information</Link>
          <FormGroup className="margin-top-std">
            {isShareScopeAll !== undefined && (
              <>
                <FormControlLabel
                  control={
                    <BlueSwitch
                      checked={isShareScopeAll}
                      color="primary"
                      onChange={handleConsentChange}
                      name="checkConsent"
                    />
                  }
                  label="Share my study data with qualified researchers for future COVID related work"
                />
                <LearnMore learnMoreText="Learn more">
                  <div>
                    <p>
                      You will have the opportunity to share your data with
                      qualified researchers outside of the COVID Recovery Corps.
                    </p>
                    <p>
                      All qualified researchers must be approved by the COVID
                      Recovery Corps study team and will only use de-identified
                      data. This de-identified data does not contain identifiers
                      like name, date of birth, or zip code.
                    </p>
                    <p>
                      These researchers may be from outside the United States
                      and may work for a non-profit institution, commercial drug
                      or medical device companies, or be a private citizen.
                    </p>
                    <p>
                      Sharing your data with qualified researchers is optional
                      and you can change your mind at any time by updating your
                      data sharing options in your profile.
                    </p>
                    <p>
                      But once we share your data we cannot get it back. If you
                      decide to end data sharing, we will not share your future
                      data.
                    </p>
                  </div>
                </LearnMore>
              </>
            )}
            {isEhrConsented !== undefined && (
              <>
                <FormControlLabel
                  control={
                    <BlueSwitch
                      checked={isEhrConsented}
                      color="primary"
                      onChange={handleEhrConsentChange}
                      name="checkEhrConsent"
                    />
                  }
                  label="Share my electronic health records"
                />
                <LearnMore learnMoreText="Learn more">
                  <div>
                    <p>
                      Sharing your EHR (electronic health records) is optional.
                    </p>
                    <p>
                      Your electronic health record (EHR) is a digital version
                      of your medical health record (which may include
                      information like your doctor's notes from visits,
                      diagnosis information and medications).
                    </p>
                    <p>
                      If you say yes to sharing, we will see data about your
                      health problems, test results, medical procedures, images
                      (such as X-rays), and medicines you take.
                    </p>
                    <p>
                      It may tell us about your mental health, genetic
                      conditions, or use of alcohol or drugs. EHR may contain
                      sexual or infection data, including HIV status. You can
                      say no to sharing your health records and still take part
                      in COVID Recovery Corps.
                    </p>
                    <p>
                      There will be a separate form called a HIPAA Authorization
                      for you to sign if you decide to give us access to your
                      health records.
                    </p>
                  </div>
                </LearnMore>
              </>
            )}
          </FormGroup>

          {userId !== undefined && (
            <MaterialUiLink
              onClick={() => setIsShowingWithdrawConfirmation(true)}
            >
              Withdraw from study
            </MaterialUiLink>
          )}
        </CardContent>
      </Card>
      {userId !== undefined && isShowingWithdrawConfirmation && (
        <ConfirmationModal
          show={true}
          content={
            <>
              <div>
                <h2 style={{ marginTop: '0rem' }}>
                  Withdrawing from COVID Recovery Corps:
                </h2>
                <p className="margin-top-std">
                  If you withdraw, your samples will be destroyed. Your data
                  will not be distributed any more.
                </p>
                <p style={{ marginTop: '2rem', marginBottom: '6rem' }}>
                  However, if researchers already have your data or samples for
                  their studies, the COVID Recovery Corps study cannot get it
                  back.
                </p>
              </div>
              <div className="withdrawal-form">
                <WithdrawSurvey
                  surveyUpdatedCallbackFn={(surveyData: object) => {
                    console.log(surveyData)
                    setWithdrawlSurveyData(_pre => surveyData)
                  }}
                ></WithdrawSurvey>
              </div>
            </>
          }
          onCancel={() =>
            // hide cancel confirmation
            setIsShowingWithdrawConfirmation(false)
          }
          onOK={handleOnWithdrawFromStudyClick}
          isOKDisabled={
            !Object.values(withdrawlSurveyData).find(value => value === true)
          }
          confirmCopy={'Yes, withdraw study'}
          cancelCopy={'No, keep me in the study'}
        ></ConfirmationModal>
      )}
    </>
  )
}

export default AcountSettings
