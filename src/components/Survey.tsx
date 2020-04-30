import React from 'react'
import {  faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {  FormControl } from 'react-bootstrap'
import useForm from './useForm'
import { getAge, getMomentDate, callEndpoint } from '../helpers/utility'
import moment from 'moment'
import { ENDPOINT } from '../types/types'
import SurveyWrapper from './SurveyWrapper'

type SurveyProps = {
    token: string, 
    callbackFn: Function,
}

export const Survey: React.FunctionComponent<SurveyProps> = ({token, callbackFn}: SurveyProps) => {
return (
    <div className="Survey">
<SurveyWrapper token={token} formTitle="Tell us about yourself" surveyName={'DEMOGRAPHIC'} formClass="crc"></SurveyWrapper>

    </div>
)
}

    export default Survey