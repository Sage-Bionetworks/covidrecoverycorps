import React, { useEffect, useState } from 'react'



import useForm from './useForm'
import {  callEndpoint } from '../helpers/utility'
import moment from 'moment'
import {
  ENDPOINT,

  SURVEY_TIME_CONSTANT,
  SURVEY_IDENTIFIER,
} from '../types/types'
import SurveyWrapper from './SurveyWrapper'

type SurveysProps = {
  token: string
  callbackFn: Function
}

export const Surveys: React.FunctionComponent<SurveysProps> = ({
  token,
  callbackFn,
}: SurveysProps) => {
  const SURVEYS_ENDOINT = `/v4/users/self/reports/${SURVEY_IDENTIFIER}`

  /*
POST
/v4/users/self/reports/{identifier}
Save a participant report record
*/
  const [error, setError] = useState('')

  useEffect(() => {
    const getSurveys = async (token: string) => {
      const postData = {
        dateTime: SURVEY_TIME_CONSTANT,
        data: {
          survey1: {
            hello: 'world',
          },
        },
      }
      try {
        setError('')
        const result = await callEndpoint<object>(
          `${ENDPOINT}${SURVEYS_ENDOINT}`,
          'POST',
          postData,
          token,
        )
        if (result.ok) {
          alert(JSON.stringify(result, null, 2))
          const getData = {
            startTime: SURVEY_TIME_CONSTANT,
            endTime: SURVEY_TIME_CONSTANT,
          }
          const result2 = await callEndpoint<object>(
            `${ENDPOINT}${SURVEYS_ENDOINT}`,
            'GET',
            getData,
            token,
          )
        } else {
          setError('Error ' + result)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getSurveys(token)
  }, [])

  return <div className="Surveys"></div>
}

export default Surveys
