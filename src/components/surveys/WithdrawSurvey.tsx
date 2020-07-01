import React, { useState } from 'react'
import i18next from 'i18next'

type WithdrawSurveyProps = {
  surveyUpdatedCallbackFn: Function
}

type QuestionOptions = {
  [key: string]: boolean
}
const WithdrawSurvey: React.FunctionComponent<WithdrawSurveyProps> = ({
  surveyUpdatedCallbackFn,
}: WithdrawSurveyProps) => {
  const [result, setResult] = useState<QuestionOptions>({})

  const handleChange = (event: any) => {
    const target = event.target
    const value = target.checked
    const name = target.name
    setResult(prev => {
      const newValue = { ...prev, [name]: value }
      surveyUpdatedCallbackFn(newValue)
      return newValue
    })
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
                  {i18next.t('surveys.withdrawSurvey.text1')}
                </label>
                <div className="checkboxes">
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="too_much_time"
                          onChange={handleChange}
                        />
                        <span>{i18next.t('surveys.withdrawSurvey.text2')}</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="not_enough_benefit"
                          onChange={handleChange}
                        />
                        <span>{i18next.t('surveys.withdrawSurvey.text3')}</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="privacy "
                          onChange={handleChange}
                        />
                        <span>{i18next.t('surveys.withdrawSurvey.text4')}</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="data_use"
                          onChange={handleChange}
                        />
                        <span>{i18next.t('surveys.withdrawSurvey.text5')}</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox ">
                    <label>
                      <span>
                        <input
                          type="checkbox"
                          name="personal_reasons"
                          onChange={handleChange}
                        />
                        <span>{i18next.t('surveys.withdrawSurvey.text6')}</span>
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
                        <span>{i18next.t('surveys.withdrawSurvey.text7')}</span>
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
