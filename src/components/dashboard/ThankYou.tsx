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
import { Link } from 'react-router-dom'
import ThankYouHomeTest from './ThankYouHomeTest'

type ThankYouProps = {
  testLocation: TestLocationEnum | undefined
  isInvitedForTest?: boolean
  hasCancelledAppointment: boolean
  userInfo?: LoggedInUserData
  token: string
}

const ThankYou: FunctionComponent<ThankYouProps> = ({
  testLocation,
  isInvitedForTest,
  userInfo,
  hasCancelledAppointment,
  token,
}) => {
  const [isShowingShareDialog, setIsShowingShareDialog] = useState(false)
  /*const [isAddressCorrect, setIsAddressCorrect] = useState<boolean | undefined>(
    undefined,
  )*/
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useTranslation()

  const elDoneNoLocationSurvey = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{i18next.t('dashboard.thankYou.surveysDoneTitle')}</h2>
      <Trans i18nKey="dashboard.thankYou.surveysDoneText">
        <p>[translate]</p>
        <p>[translate]</p>
      </Trans>
    </>
  )
  const elSelectedTestLab = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{t('dashboard.thankYou.surveysDoneTitle')}</h2>
      <Trans i18nKey="dashboard.thankYou.selectedTestText">
        <p>[translate]</p>
      </Trans>
    </>
  )

  const elSelectedNoTest = (
    <>
      <img src={iconThankYou}></img>
      <h2 style={{ textAlign: 'left' }}>
        {t('dashboard.thankYou.selectedNoTestTitle')}
      </h2>
      <Trans i18nKey="dashboard.thankYou.selectedNoTestText">
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
        {i18next.t('dashboard.thankYou.cancelledTitle')}
      </h2>
      <p>
        <Trans i18nKey="dashboard.thankYou.cancelledText">
          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu"></a>
        </Trans>
      </p>
    </>
  )

  const elInvitedTest = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{i18next.t('dashboard.thankYou.invitedTitle')}</h2>
      <p>
        {i18next.t('dashboard.thankYou.invitedText1', {
          email: userInfo?.email,
        })}
      </p>
      <Trans i18nKey="dashboard.thankYou.invitedText2">
        <p>[translate]</p>
        <p>
          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu"></a>
        </p>
      </Trans>
    </>
  )

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
      <div className="finished-status text-center">
        <ThankYouHomeTest userInfo={userInfo} token={token}></ThankYouHomeTest>
      </div>
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

export default ThankYou
