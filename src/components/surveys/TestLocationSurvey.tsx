import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import _ from 'lodash'
import { SurveyService } from '../../services/survey.service'

type TestLoctionSurveyProps = {
  surveyUpdatedCallbackFn: Function,
  token: string
}

type QuestionOptions = {
  [key: string]: boolean
}
const TestLoctionSurvey: React.FunctionComponent<TestLoctionSurveyProps> = ({
  surveyUpdatedCallbackFn,
  token
}: TestLoctionSurveyProps) => {
  const [location, setLocation] = useState<string | undefined>(undefined)

const postSurvey = async () => {
  await SurveyService.postToHealthData('TEST_LOCATION', {location: location}, token)
  await SurveyService.saveSurvey('TEST_LOCATION', {location: location}, token, new Date())
  surveyUpdatedCallbackFn()
}

  return (
    <div className="theme-crc">
      <div className="SRC-ReactJsonForm">
        <form className="submissionInputForm">
          <div className="form-group field field-object">
            <div className="fieldset">
              <div className="form-group field field-string">
                <div className="field-radio-group" style={{ marginRight: 0 }}>
                  <div className="radio ">
                    <label>
                      <span>
                        <input
                          type="radio"
                          onChange={() => setLocation('lab')}
                          value="lab"
                          checked={location === 'lab'}
                        />
                        <span>Go to a lab draw</span>
                      </span>
                    </label>
                  </div>
                  <div className="radio ">
                    <label>
                      <span>
                        <input
                          type="radio"
                          onChange={() => setLocation('home')}
                          value="home"
                          checked={location === 'home'}
                        />
                        <span>Wait for a home test kit</span>
                      </span>
                    </label>
                  </div>
                  <div className="radio ">
                    <label>
                      <span>
                        <input
                          type="radio"
                          onChange={() => setLocation('noTest')}
                          value="noTest"
                          checked={location === 'noTest'}
                        />
                        <span>Not interested in testing</span>
                      </span>
                    </label>
                  </div>
                  <div className="pull-right" style={{paddingBottom: '2.4rem'}}>
                    <Button
                      size="small"
                      color="primary"
                      className="submit"
                      variant="contained"
                      disabled={!location}
                      onClick={postSurvey}
                    >
                      Submit
                    </Button>
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
export default TestLoctionSurvey
