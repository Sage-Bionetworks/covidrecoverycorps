import React, { FunctionComponent } from 'react'
import {
  TestLocationEnum,
  SurveysCompletionStatusEnum,
} from '../../types/types'
import iconThankYou from '../../assets/dashboard/icon_thankyou.svg'
import iconWooHoo from '../../assets/dashboard/icon_whoohoo.svg'
import i18next from 'i18next'
import { Trans } from 'react-i18next'

type IntroProps = {
  testLocation: TestLocationEnum | undefined
  completionStatus: SurveysCompletionStatusEnum
  isTestLocationSurveyDone: boolean
  isScheduledForTest?: boolean
}

const Intro: FunctionComponent<IntroProps> = ({
  testLocation,
  completionStatus,
  isTestLocationSurveyDone,
  isScheduledForTest,
}) => {
  //finished main surveys and test location survey. Not called for test
  const doneMainElNotScheduled = (
    <>
      <img src={iconWooHoo} alt="woo hoo!"></img>
      <h2>{i18next.t('dashboard.intro.heading1')}</h2>
      {(testLocation === TestLocationEnum.LAB ||
        testLocation === TestLocationEnum.HOME) && (
        <p>{i18next.t('dashboard.intro.text1')}</p>
      )}
      {testLocation === TestLocationEnum.NO_TEST && (
        <p>{i18next.t('dashboard.intro.text2')}</p>
      )}
    </>
  )
  const doneMainElScheduled = (
    <>
      <img src={iconWooHoo} alt="woo hoo!"></img>
      <h2>{i18next.t('dashboard.intro.heading2')}</h2>
      {testLocation === TestLocationEnum.LAB && (
        <p>{i18next.t('dashboard.intro.text3')}</p>
      )}
      {testLocation === TestLocationEnum.HOME && (
        <p>{i18next.t('dashboard.intro.text4')}</p>
      )}
    </>
  )
  // main surveys done but not the location survey
  const doneMainNoLocationSurveyEl = (
    <Trans i18nKey="dashboard.intro.text5">
      <h2>[translate]</h2>
      <p>[translate]</p>
    </Trans>
  )

  const doneAllEl = (
    <>
      <img src={iconThankYou} alt={i18next.t('dashboard.intro.heading1')}></img>
      <h2>{i18next.t('dashboard.intro.text6')}</h2>{' '}
    </>
  )

  if (completionStatus === SurveysCompletionStatusEnum.NOT_DONE) {
    return <></>
  }

  if (
    completionStatus === SurveysCompletionStatusEnum.MAIN_DONE &&
    !isScheduledForTest
  ) {
    return (
      <div className="finished-status text-center">
        {isTestLocationSurveyDone
          ? doneMainElNotScheduled
          : doneMainNoLocationSurveyEl}
      </div>
    )
  }
  if (
    completionStatus === SurveysCompletionStatusEnum.MAIN_DONE &&
    isScheduledForTest
  ) {
    return (
      <div className="finished-status text-center">{doneMainElScheduled}</div>
    )
  }

  return <div className="finished-status text-center">{doneAllEl}</div>
}

export default Intro
