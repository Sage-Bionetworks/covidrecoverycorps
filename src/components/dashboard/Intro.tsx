import React, { FunctionComponent } from 'react'
import {
  TestLocationEnum,
  SurveysCompletionStatusEnum,
} from '../../types/types'
import iconThankYou from '../../assets/dashboard/icon_thankyou.svg'
import iconCheckMark from '../../assets/dashboard/icon_whoohoo.svg'
import i18next from 'i18next'
import { Trans } from 'react-i18next'
import i18n from '../../i18n'

type IntroProps = {
  testLocation: TestLocationEnum | undefined
  completionStatus: SurveysCompletionStatusEnum

  isInvitedForTest?: boolean
  hasCancelledAppointment: boolean
  emailAddress: string
}

const Intro: FunctionComponent<IntroProps> = ({
  testLocation,
  completionStatus,
  isInvitedForTest,
  emailAddress,
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

  const elSelectedTest = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{i18next.t('dashboard.intro.selectedTestTitle')}</h2>
      <Trans i18nKey="dashboard.intro.selectedTestText">
        <p>[translate]</p>
      </Trans>
    </>
  )

  const elSelectedNoTest = (
    <>
      <img src={iconThankYou}></img>
      <h2 style={{ textAlign: 'left' }}>
        {i18next.t('dashboard.intro.selectedNoTestTitle')}
      </h2>
      <Trans i18nKey="dashboard.intro.selectedNoTestText">
        <p>[translate]</p>
      </Trans>
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
        {i18next.t('dashboard.intro.invitedText1', { email: emailAddress })}
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
  if (testLocation === TestLocationEnum.NO_TEST) {
    return <div className="finished-status text-center">{elSelectedNoTest}</div>
  }

  // locaton selection -- take home
  if (testLocation === TestLocationEnum.HOME) {
    return <div className="finished-status text-center">{elSelectedTest}</div>
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
  }

  return (
    <div className="finished-status text-center">
      <div className="finished-status text-center">{elSelectedTest}</div>
    </div>
  )
}

export default Intro
