import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { blue } from '@material-ui/core/colors'
import { grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
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
import { useSessionDataState, useSessionDataDispatch } from '../AuthContext'
import { SurveyService } from '../services/survey.service'
import { useTranslation, Trans } from 'react-i18next'

type AcountSettingsProps = {
  token: string
}

const BlueSwitch = withStyles({
  switchBase: {
    color: grey[400],
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

  const sessionUpdateFn = useSessionDataDispatch()
  const sessionInfo = useSessionDataState()
  const { t } = useTranslation()

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
      await SurveyService.postToHealthData(
        'WITHDRAW',
        withdrawlSurveyData,
        props.token,
      )
      await ConsentService.withdrawFromStudy(userId!, props.token)
      sessionUpdateFn({ type: 'WITHDRAW' })
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
          closeLinkText={t('footer.dashboard')}
        />
      </div>
      <Card>
        <CardContent>
          <h2 className="text-center margin-top-std">
            {t('accountSettings.header')}
          </h2>
          {error && <Alert severity="error">{error}</Alert>}
          <Link to="/contactinfo">{t('accountSettings.updateLink')}</Link>
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
                  label={t('accountSettings.shareDataLabel')}
                  className="margin-bottom-std"
                />
                <LearnMore learnMoreText={t('common.learnMore')}>
                  <div>
                    <Trans i18nKey="accountSettings.shareLearnMore">
                      <p>[translate]</p>
                      <p>[translate]</p>
                      <p>[translate]</p>
                      <p>[translate]</p>
                      <p>[translate]</p>
                    </Trans>
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
                  label={t('accountSettings.shareEHRLabel')}
                  className="margin-bottom-std"
                />
                <LearnMore learnMoreText={t('common.learnMore')}>
                  <div>
                    <Trans i18nKey="accountSettings.ehrLearnMore">
                      <p>[translate]</p>
                      <p>[translate]</p>
                      <p>[translate]</p>
                      <p>[translate]</p>
                      <p>[translate]</p>
                    </Trans>
                  </div>
                </LearnMore>
              </>
            )}
          </FormGroup>

          {userId !== undefined && (
            <MaterialUiLink
              onClick={() => setIsShowingWithdrawConfirmation(true)}
            >
              {t('accountSettings.withdrawLink')}
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
                <Trans i18nKey="accountSettings.withdrawConfirm">
                  <h2 style={{ marginTop: '0rem' }}>[translate]</h2>
                  <p className="margin-top-std">[translate]</p>
                  <p style={{ marginTop: '2rem', marginBottom: '6rem' }}>
                    [translate]
                  </p>
                </Trans>
              </div>
              <div className="withdrawal-form">
                <WithdrawSurvey
                  surveyUpdatedCallbackFn={(surveyData: object) => {
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
          confirmCopy={t('accountSettings.withdrawYes')}
          cancelCopy={t('accountSettings.withdrawNo')}
        ></ConfirmationModal>
      )}
    </>
  )
}

export default AcountSettings
