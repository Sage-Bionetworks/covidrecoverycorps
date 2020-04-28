import React from 'react'
import {  faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {  FormControl } from 'react-bootstrap'
import useForm from './useForm'
import { getAge, getMomentDate, callEndpoint } from './utility'
import moment from 'moment'
import { ENDPOINT, SHARE_SCOPE, SUBPOP_GUID } from './types'
import SurveyWrapper from './SurveyWrapper'

type SurveyProps = {
    token: string, 
    callbackFn: Function,
}

export const Survey: React.FunctionComponent<SurveyProps> = ({token, callbackFn}: SurveyProps) => {
return (
    <div className="Survey">
<SurveyWrapper formTitle="Tell us about yourself" surveyName={'DEMOGRAPHIC'} formClass="contribution-request"></SurveyWrapper>

    </div>
)
}

    export default Survey