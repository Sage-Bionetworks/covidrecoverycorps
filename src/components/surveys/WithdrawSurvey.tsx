import React, { useState } from 'react'
import { BsPrefixProps } from 'react-bootstrap/helpers'

type WithdrawSurveyProps = {
  surveyUpdatedCallbackFn: Function
}

type QuestionOoptions = {
  [key: string]: boolean
}
const WithdrawSurvey: React.FunctionComponent<WithdrawSurveyProps> = ({surveyUpdatedCallbackFn}:WithdrawSurveyProps) => { 
  const [result, setResult] = useState<QuestionOoptions>({})

  const handleChange = (event: any) => {
    const target = event.target
    const value = target.checked
    const name = target.name
    setResult(prev => {
      const newValue = {...prev, [name]: value}
      surveyUpdatedCallbackFn(newValue)
      return newValue}
      
      )

  }

  return (
    <div className="theme-crc">
      <div className="SRC-ReactJsonForm">
        <form className="submissionInputForm">
          <div className="form-group field field-object  demographic">
            <div className="fieldset" id="root_about">
              <div className="form-group field field-string">
                <label
                  className="control-label"
                  htmlFor="root_about_gender_identity"
                >
                  Please help us make the COVID Recovery Corps study better by
                  telling us about your reasons for withdrawing. (Check all that
                  apply)
             
                </label>
                <div className="checkboxes" >
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="too_much_time"
                          //checked={result.too_much_time}
                          onChange={handleChange}
                        />
                        <span>Study was taking too much of my time </span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="not_enough_benefit"
                         // checked={result.not_enough_benefit}
                          onChange={handleChange}
                        />
                        <span>Not enough benefit for me to continue</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="privacy "
                         // checked={result.privacy}
                          onChange={handleChange}
                        />
                        <span> I am concerned about my privacy </span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="data_use"
                         // checked={result.data_use}
                          onChange={handleChange}
                        />
                        <span>I am concerned about the use of my data</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="personal_reasons"
                         // checked={result.personal_reasons}
                          onChange={handleChange}
                        />
                        <span>
                          Withdrawing for personal reason that do not involve
                          this study{' '}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="no_answer"
                          //checked={result.no_answer}
                          onChange={handleChange}
                        />
                        <span>Prefer not to answer</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default WithdrawSurvey
