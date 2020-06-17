import React, { useState } from 'react'
import FloatingToolbar from '../widgets/FloatingToolbar'
import Button from '@material-ui/core/Button/Button'
import {
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Alert from '@material-ui/lab/Alert'
import Switch from '@material-ui/core/Switch/Switch'
import ConsentCopy, { StepInfo, SCREENS_ENUM } from './ConsentCopy'
import BlueSeparator from '../static/BlueSeparator'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import ConsentIcons from './ConsentIcons'
import { useTranslation } from 'react-i18next'

type ConsentInfoProps = {
  onDone: Function
}
const quizes = [
  {
    screen: 2,
    title: ' What is the purpose of COVID Recovery Corps? ',
    options: [
      'To receive medical treatment for COVID-19',
      'To be able to better understand COVID-19',
    ],
    explanation:
      'This study is a research study to understand COVID-19 better. The study does not provide medical treatment.',
    correctAnswer: 1,
  },
  {
    screen: 5,
    title: 'What is the primary risk in this study?',
    options: ['Privacy', 'There is no risk in participating in this study'],
    explanation:
      'We will do our best to protect your privacy. But we can’t guarantee your privacy. It is possible that public health authorities will ask to see the data.',
    correctAnswer: 0,
  },
  {
    screen: 8,
    title:
      'I decided to share my data broadly with qualified researchers and now I want to stop. What happens to the data I have already shared?',

    options: [
      'The study will destroy or delete my data',
      'The study will not share my future data',
    ],
    explanation:
      'If you decide to end your data sharing with qualified researchers, we will not share your future data. But the data we have already shared with qualified researchers, we unfortunately cannot get back.',
    correctAnswer: 1,
  },
]

const totalSteps = 12

export const ConsentInfo: React.FunctionComponent<ConsentInfoProps> = ({
  onDone,
}: ConsentInfoProps) => {
  const [isFullText, setIsFullText] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState(new Array(2))
  const { t } = useTranslation()

  const getText = (step: number, fullText: boolean): JSX.Element => {
    const stepInfo: StepInfo = {
      step,
      isSummary: !fullText,
    }
    return <ConsentCopy stepInfo={stepInfo}></ConsentCopy>
  }

  const getStatic = (step: number, fullText: boolean): JSX.Element => {
    const quiz = quizes.find(quiz => quiz.screen === step)
    if (quiz) {
      return <></>
    }
    return <> {getText(step, fullText)}</>
  }

  const getNavButtons = (step: number): JSX.Element => {
    const quizIndex = quizes.findIndex(quiz => quiz.screen === step)

    const isDisabled = (): boolean => {
      if (quizIndex === -1) {
        return false
      } else {
        // find if quiz has an answer 
        return quizAnswers[quizIndex] === undefined
      }
    }

    const navBtn = (
      <>
        {currentStep > -1 && (
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => {
              window.scrollTo(0, 0)
              setCurrentStep(prev => prev - 1)
              setQuizAnswers(new Array(2))
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp;
          </Button>
        )}
        {currentStep > -1 && currentStep <= totalSteps && (
          <Button
            color="primary"
            variant="contained"
            size="large"
            disabled={isDisabled()}
            onClick={() => {
              window.scrollTo(0, 0)
              if (currentStep < totalSteps) {
                setCurrentStep(prev => prev + 1)
                setQuizAnswers(new Array(2))
              } else {
                onDone()
              }
            }}
          >
            &nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        )}
      </>
    )

    const result = <div className="navButtons">{navBtn}</div>
    return result
  }

  const getQuiz = (step: number) => {
    const quizIndex = quizes.findIndex(quiz => quiz.screen === step)
    if (quizIndex === -1) {
      return <></>
    }
    const getQuizButtonClass = (correctAnswer: number, buttonValue: number) => {
      const currentAnswer = quizAnswers[quizIndex]
      if (currentAnswer === undefined || currentAnswer !== buttonValue) {
        // this button was not selected, do not style
        return ''
      }
      return buttonValue === correctAnswer ? 'success' : 'error'
    }

    const quiz = quizes[quizIndex]
    const content = (
      <div>
        <h3 style={{ marginBottom: '2rem' }}>{quiz.title}</h3>
        {quizAnswers[quizIndex] !== undefined && (
          <Alert
            style={{
              marginBottom: '2rem',
              backgroundColor: 'unset',
              padding: '0px',
            }}
            severity={
              quizAnswers[quizIndex] === quiz.correctAnswer ? 'success' : 'error'
            }
            color={
              quizAnswers[quizIndex] === quiz.correctAnswer ? 'info' : 'error'
            }
          >
            {' '}
            {quiz.explanation}
          </Alert>
        )}
        <BlueSeparator></BlueSeparator>
        <RadioGroup
          aria-label="can consent"
          name="quizQuestion"
          onChange={(_event: any, value: string) =>
            setQuizAnswers(prev => {
              const newAnswers = [...prev]
              newAnswers[quizIndex] = parseInt(value, 10)
              console.log(newAnswers)
              return newAnswers
            })
          }
        >
          <FormControlLabel
            className={getQuizButtonClass(quiz.correctAnswer, 0)}
            value="0"
            control={<Radio />}
            label={quiz.options[0]}
          />
          <FormControlLabel
            className={getQuizButtonClass(quiz.correctAnswer, 1)}
            value="1"
            control={<Radio />}
            label={quiz.options[1]}
          />
        </RadioGroup>
      </div>
    )
    return content
  }

  const renderNavChildren = (step: number): JSX.Element | string => {
    if (step < 1 || step === 12) {
      return 'Study Consent'
    }
    if (quizes.findIndex(quiz => quiz.screen === step) > -1) {
      return 'Consent Question'
    }
    return (
      <div className="FloatingToolbar__toggle">
        <span
          className="FloatingToolbar__toggle__text"
          onClick={() => setIsFullText(false)}
        >
          Summary
        </span>
        <Switch
          color="primary"
          inputProps={{ 'aria-label': 'consent text summary toggle' }}
          checked={isFullText}
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setIsFullText(event.target.checked)
          }
        />
        <span
          className="FloatingToolbar__toggle__text"
          onClick={() => setIsFullText(true)}
        >
          Full Text
        </span>
      </div>
    )
  }

  return (
    <div className="Consent">
      <FloatingToolbar
        closeLinkDestination="/home?alert=CANCELLED_CONSENT"
        closeLinkText=""
        closeConfirmationText={t('consentinfo.closeconfirmationtext')}
      >
        {renderNavChildren(currentStep)}
      </FloatingToolbar>
      <div>
        {currentStep > -1 && (
          <div className="text-right page-numbers">
            <strong>
              {currentStep + 1}/{totalSteps + 1}
            </strong>
          </div>
        )}
        {currentStep === -1 && (
          <div>
            <ConsentCopy screen={SCREENS_ENUM.CONSENT_INTRO} isEHR={false}></ConsentCopy>
          </div>
        )}
        {currentStep > -1 && (
          <div>
            <div className="icon-top">
              {ConsentIcons.consent[currentStep] && (
                <img
                  className="consentIcon"
                  alt="Current Status"
                  src={ConsentIcons.consent[currentStep]}
                ></img>
              )}
            </div>
            {getStatic(currentStep, isFullText)}
            {getQuiz(currentStep)}
            {getNavButtons(currentStep)}
          </div>
        )}

        {currentStep === -1 && (
          <div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              style={{ margin: '30px 0' }}
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Start Consent
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsentInfo
