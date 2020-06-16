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
}

const Intro: FunctionComponent<IntroProps> = ({
  testLocation,
  completionStatus,
  isTestLocationSurveyDone,
}) => {
  const doneMainEl = (
    <>
      <img src={iconWooHoo} alt="woo hoo!"></img>
      <h2>Whoo hoo!</h2>
      {(testLocation === TestLocationEnum.LAB ||
        testLocation === TestLocationEnum.HOME) && (
        <p>
          We’ve added you to the waiting list for an antibody test. If you are
          selected, you will receive an email.
        </p>
      )}
      <p>
        {' '}
        Please consider completing the rest of the surveys if you have time.
      </p>
    </>
  )

  const doneMainNoLocationSurveyEl = (
    <>
      <img src={iconWooHoo} alt="woo hoo!"></img>
      <h2>Whoo hoo!</h2>
      <p>
        You’ve completed the minimum surveys to qualify for an antibody test!
      </p>
      <p>
        {' '}
        Although we cannot guarantee testing for everyone, we will do our best
        to accomodate based on availability.
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

  if (completionStatus === SurveysCompletionStatusEnum.MAIN_DONE) {
    return (
      <div className="finished-status text-center">
        {isTestLocationSurveyDone ? doneMainEl : doneMainNoLocationSurveyEl}
      </div>
    )
  }

  return <div className="finished-status text-center">{doneAllEl}</div>
}

export default Intro
