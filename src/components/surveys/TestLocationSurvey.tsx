import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import _ from 'lodash'
import { SurveyService } from '../../services/survey.service'
import { TestLocationEnum } from '../../types/types'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()
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
      style={{ clear: 'both', paddingBottom: '0' }}
    >
      <p>
        <strong>{t('surveys.testLocationSurvey.text1')}</strong>
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
                          <span>{t('surveys.testLocationSurvey.text2')}</span>
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
                          <span>{t('surveys.testLocationSurvey.text3')}</span>
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
                          <span>{t('surveys.testLocationSurvey.text4')}</span>
                        </span>
                      </label>
                    </div>
                    <div
                      className="pull-right"
                      style={{ paddingBottom: '1.2rem', paddingTop: '1rem' }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        className="submit"
                        variant="contained"
                        disabled={!location}
                        onClick={postSurvey}
                      >
                        {t('common.submit')}
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
