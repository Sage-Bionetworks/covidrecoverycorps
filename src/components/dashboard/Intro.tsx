import React, { FunctionComponent } from 'react'
import {
  TestLocationEnum,
  SurveysCompletionStatusEnum,
} from '../../types/types'
import iconThankYou from '../../assets/dashboard/icon_thankyou.svg'
import iconWooHoo from '../../assets/dashboard/icon_whoohoo.svg'

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
      <h2>Thank you!</h2>
      {(testLocation === TestLocationEnum.LAB ||
        testLocation === TestLocationEnum.HOME) && (
        <p>
          We’ve added you to the waiting list for an antibody test. If you are
          selected, you will receive an email.
        </p>
      )}
      {testLocation === TestLocationEnum.NO_TEST && (
        <p>
          {' '}
          Please consider completing the rest of the surveys if you have time.
        </p>
      )}
    </>
  )
  const doneMainElScheduled = (
    <>
      <img src={iconWooHoo} alt="woo hoo!"></img>
      <h2>You're invited!</h2>
      {testLocation === TestLocationEnum.LAB && (
        <p>
          Please complete surveys 3 &amp; 4 before your antibody test
          appointment in order to receive a gift card.
        </p>
      )}
      {testLocation === TestLocationEnum.HOME && (
        <p>
          Please complete surveys 3 &amp; 4 before sending back your at-home
          test kit.
        </p>
      )}
    </>
  )
  // main surveys done but not the location survey
  const doneMainNoLocationSurveyEl = (
    <>
      <h2>Lab Preferences</h2>
      <p>
        You've completed the minimum surveys to qualify for the antibody test
        waitlist.
      </p>
      <p>
        To receive a gift card, you will need to be invited to an antibody test
        and provide a biosample. You will also need to complete surveys 3 &amp;
        4.
      </p>
      <p>
        We cannot guarantee testing invites for all participants at this time.
      </p>
      <p>
        If you were invited to get an antibody test, what is your testing
        preference?
      </p>
    </>
  )

  const doneAllEl = (
    <>
      <img src={iconThankYou} alt="thank you!"></img>
      <h2>
        Thank you for your contribution to the COVID Recovery Corps Study!
      </h2>{' '}
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
