import React, { FunctionComponent, useState } from 'react'
import {
  TestLocationEnum,
  SurveysCompletionStatusEnum,
  LoggedInUserData,
} from '../../types/types'
import iconThankYou from '../../assets/dashboard/icon_thankyou.svg'
import iconCheckMark from '../../assets/dashboard/icon_whoohoo.svg'
import i18next from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import i18n from '../../i18n'
import ShareModal from '../widgets/ShareModal'
import Button from '@material-ui/core/Button'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { truncate } from 'cypress/types/lodash'
import { Link } from 'react-router-dom'

type IntroProps = {
  testLocation: TestLocationEnum | undefined
  completionStatus: SurveysCompletionStatusEnum

  isInvitedForTest?: boolean
  hasCancelledAppointment: boolean

  userInfo?: LoggedInUserData
}

const Intro: FunctionComponent<IntroProps> = ({
  testLocation,
  completionStatus,
  isInvitedForTest,
  userInfo,
  hasCancelledAppointment,
}) => {
  /*
  / Scenarios:
  //1. Surveys not finished
  //2. Surveys finished - test preference not picked
  //3. Test Preference Picked -- not invited
  //  3a No test -> wrap up journey
  //  3b Home test ->'home test intro'
  //  3c Lab test -> ....'added to wait list'
  4. Invited -- invited screen.
  5. scheduled - scheduled screen.
  */

  const [isShowingShareDialog, setIsShowingShareDialog] = useState(false)
  const [isAddressCorrect, setIsAddressCorrect] = useState<boolean | undefined>(
    undefined,
  )
  const [isSubmitted, setIsSubmitted]= useState(false)
  const { t } = useTranslation()

  const elDoneNoLocationSurvey = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{i18next.t('dashboard.intro.surveysDoneTitle')}</h2>
      <Trans i18nKey="dashboard.intro.surveysDoneText">
        <p>[translate]</p>
        <p>[translate]</p>
      </Trans>
    </>
  )

  const elSelectedTestHome = (
    <>
      <Trans i18nKey="dashboard.intro.selectedTestText">
        <p>[translate]</p>
      </Trans>
      {userInfo?.attributes && (
        <div style={{ textAlign: 'left' }}>
          <span>{t('dashboard.intro.willMailAddress')}</span>
          <br />
          <br />
          <span>{`${userInfo.attributes.address1} ${userInfo.attributes.address2}`}</span>
          <br />
          <span>{`${userInfo.attributes.city} ${userInfo.attributes.state}, ${userInfo.attributes.zip_code}`}</span>{' '}
        </div>
      )}
      {!isSubmitted&& (
        <div style={{ marginTop: '24px' }}>
          <p>{t('dashboard.intro.addressConfirm')}</p>

          <RadioGroup
            style={{ marginLeft: '16px' }}
            aria-label={t('dashboard.intro.addressConfirm')}
            name="yesAddress"
            onChange={(_event: any, val: string) => {
              setIsAddressCorrect(val === 'true' ? true : false)
            }}
          >
            <FormControlLabel
              value={'true'}
              control={
                <Radio
                  color="primary"
                  size="small"
                  style={{ paddingBottom: '2px', paddingTop: '2px' }}
                />
              }
              label={t('dashboard.intro.addressYes')}
            />

            <FormControlLabel
              value={'false'}
              control={
                <Radio
                  color="primary"
                  size="small"
                  style={{ paddingBottom: '2px', paddingTop: '2px' }}
                />
              }
              label={t('dashboard.intro.addressNo')}
            />
          </RadioGroup>
          <Button variant="contained" color="primary"  style= {{width: '200px', marginTop: '24px'}} onClick={(_e)=>setIsSubmitted(true)}>{t('common.submit')}</Button>
        </div>
      )}
      {isSubmitted && (
        <div style={{ marginBottom: '24px' }}>
          <img src={iconCheckMark}></img>
          <h2>{t('dashboard.intro.surveysDoneTitle')}</h2>
        </div>
      )}

      {(isAddressCorrect === false && isSubmitted) &&  (
        <div>
          <Trans i18nKey="dashboard.intro.addressUdateLink">
           <span>[translate]</span><Link to="/contactInfo"> [translate]</Link>
          </Trans>
        </div>
      )}
    </>
  )

  const elSelectedTestLab = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{t('dashboard.intro.surveysDoneTitle')}</h2>
      <Trans i18nKey="dashboard.intro.selectedTestText">
        <p>[translate]</p>
      </Trans>
    </>
  )

  const elSelectedNoTest = (
    <>
      <img src={iconThankYou}></img>
      <h2 style={{ textAlign: 'left' }}>
        {t('dashboard.intro.selectedNoTestTitle')}
      </h2>
      <Trans i18nKey="dashboard.intro.selectedNoTestText">
        <p>[translate]</p>
      </Trans>

      <ShareModal
        show={isShowingShareDialog}
        onClose={() => {
          setIsShowingShareDialog(false)
        }}
      ></ShareModal>
      <div className="text-center">
        <Button
          style={{ margin: '30px auto 0 auto', fontSize: '14px' }}
          variant="outlined"
          color="primary"
          onClick={() => {
            setIsShowingShareDialog(true)
          }}
        >
          {t('resultDashboard.inviteCTA')}
        </Button>
      </div>
    </>
  )

  const elCancelledAppointment = (
    <>
      <h2 style={{ textAlign: 'left' }}>
        {i18next.t('dashboard.intro.cancelledTitle')}
      </h2>
      <p>
        <Trans i18nKey="dashboard.intro.cancelledText">
          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu"></a>
        </Trans>
      </p>
    </>
  )

  const elInvitedTest = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{i18next.t('dashboard.intro.invitedTitle')}</h2>
      <p>
        {i18next.t('dashboard.intro.invitedText1', { email: userInfo?.email })}
      </p>
      <Trans i18nKey="dashboard.intro.invitedText2">
        <p>[translate]</p>
        <p>
          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu"></a>
        </p>
      </Trans>
    </>
  )

  // didn't finish surveys
  if (completionStatus === SurveysCompletionStatusEnum.NOT_DONE) {
    return <></>
  }
  // finished surveys and didn't finish location selection
  if (testLocation === undefined) {
    return (
      <div className="finished-status text-center">
        {elDoneNoLocationSurvey}
      </div>
    )
  }
  // location selection --- no test
  if (
    testLocation === TestLocationEnum.NO_TEST ||
    testLocation === TestLocationEnum['N/A']
  ) {
    return <div className="finished-status text-center">{elSelectedNoTest}</div>
  }

  // locaton selection -- take home
  if (testLocation === TestLocationEnum.HOME) {
    return (
      <div className="finished-status text-center">{elSelectedTestHome}</div>
    )
  }

  // location selection lab
  if (testLocation === TestLocationEnum.LAB) {
    if (hasCancelledAppointment) {
      return (
        <div className="finished-status text-center">
          {elCancelledAppointment}
        </div>
      )
    }
    if (isInvitedForTest) {
      return <div className="finished-status text-center">{elInvitedTest}</div>
    }
    return (
      <div className="finished-status text-center">
        <div className="finished-status text-center">{elSelectedTestLab}</div>
      </div>
    )
  }

  return (
    <div className="finished-status text-center">
      <div className="finished-status text-center">n/a</div>
    </div>
  )
}

export default Intro
