import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import _ from 'lodash'
import { SurveyService } from '../../services/survey.service'
import { TestLocationEnum } from '../../types/types'

type TestLoctionSurveyProps = {
  surveyUpdatedCallbackFn: Function
  token: string
}

type QuestionOptions = {
  [key: string]: boolean
}
const TestLoctionSurvey: React.FunctionComponent<TestLoctionSurveyProps> = ({
  surveyUpdatedCallbackFn,
  token,
}: TestLoctionSurveyProps) => {
  const [location, setLocation] = useState<TestLocationEnum | undefined>(
    undefined,
  )

  const postSurvey = async () => {
    await SurveyService.postToHealthData(
      'TEST_LOCATION',
      { location: location },
      token,
    )
    await SurveyService.saveSurvey(
      'TEST_LOCATION',
      { location: location },
      token,
      new Date(),
    )
    surveyUpdatedCallbackFn(location)
  }

  return (
    <div
      className="finished-status"
      style={{ marginBottom: '2.4rem', clear: 'both' }}
    >
      <p>
        <strong>
          Would you prefer to go to a lab draw or wait until home test kits are
          available?{' '}
        </strong>
      </p>
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
                            onChange={() => setLocation(TestLocationEnum.LAB)}
                            value={TestLocationEnum.LAB}
                            checked={location === TestLocationEnum.LAB}
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
                            onChange={() => setLocation(TestLocationEnum.HOME)}
                            value={TestLocationEnum.HOME}
                            checked={location === TestLocationEnum.HOME}
                          />
                          <span>Wait for a home test kit</span>
                        </span>
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <span>
                          <input
                            type="radio"
                            onChange={() =>
                              setLocation(TestLocationEnum.NO_TEST)
                            }
                            value={TestLocationEnum.NO_TEST}
                            checked={location === TestLocationEnum.NO_TEST}
                          />
                          <span>Not interested in testing</span>
                        </span>
                      </label>
                    </div>
                    <div
                      className="pull-right"
                      style={{ paddingBottom: '2.4rem' }}
                    >
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
    </div>
  )
}
export default TestLoctionSurvey
