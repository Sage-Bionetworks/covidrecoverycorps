import React, { useState, useEffect } from 'react'

import useForm from '../useForm'
import FloatingToolbar from '../widgets/FloatingToolbar'
import Button from '@material-ui/core/Button/Button'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Alert from '@material-ui/lab/Alert'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'

import Switch from '@material-ui/core/Switch/Switch'
import ConsentCopy, { StepInfo } from './ConsentCopy'
import Grid from '@material-ui/core/Grid/Grid'

type ConsentInfoProps = {
  name: string
  onDone: Function
}
const quizes = [
  {
    screen: 2,
    title: ' What is the purpose of [Study name]? ',
    options: [
      'To receive medical treatment for COVID-19',
      'To be able to better understand COVID-19',
    ],
    explanation:
      'This study is a research study to understand COVID-19 better. The study does not provide medical treatment.',
    correctAnser: 1,
  },
  {
    screen: 4,
    title: 'What is the primary risk in this study?',
    options: ['Privacy', 'There is no risk in participating in this study'],
    explanation:
      'We will do our best to protect your privacy. But we can’t guarantee your privacy. It is possible that public health authorities will ask to see the data.',
    correctAnser: 0,
  },
]
const totalSteps = 8

export const ConsentInfo: React.FunctionComponent<ConsentInfoProps> = ({
  name,
  onDone,
}: ConsentInfoProps) => {
  const [isFullText, setIsFullText] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState(new Array(2))

  const getText = (step: number, fullText: boolean): JSX.Element => {
    const stepInfo: StepInfo = {
      step,
      isSummary: !fullText,
    }
    return <ConsentCopy stepInfo={stepInfo}></ConsentCopy>
  }

  const getStatic = (step: number, fullText: boolean): JSX.Element => {
    const quiz = quizes.find((quiz) => quiz.screen === step)
    if (quiz) {
      return <></>
    }
    return <> {getText(step, fullText)}</>
  }

  const getNavButtons = (step: number): JSX.Element => {
    const quizIndex = quizes.findIndex((quiz) => quiz.screen === step)

    const isDisabled = (): boolean => {
      if (quizIndex === -1) {
        return false
      } else {
        //find idf quiz has an answer
        if (quizAnswers[quizIndex] !== undefined) {
          return false
        }
      }
      return true
    }


    const isQuiz = quizIndex !== -1

    const buttonDiv = (
      <>
        {currentStep > 0 && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp;
          </Button>
        )}
        {currentStep > 0 && currentStep <= totalSteps && (
          <Button
            color="primary"
            variant="contained"
            disabled={isDisabled()}
            onClick={() => {
              if (currentStep < totalSteps) {
                setCurrentStep((prev) => prev + 1)
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

    const result = isQuiz ? (
      <div className="ConsentInfo__navButtons--quiz">
        <Grid item xs={10} md={6} lg={6}>
          {buttonDiv}
        </Grid>{' '}
      </div>
    ) : (
      <div className="ConsentInfo__navButtons">{buttonDiv}</div>
    )
    return result
  }

  const getQuiz = (step: number) => {
    const quizIndex = quizes.findIndex((quiz) => quiz.screen === step)
    if (quizIndex == -1) {
      return <></>
    }
    const getQuizButtonClass = (correctAnswer: number, quizAnswer: number) => {
      if (quizAnswers[quizIndex]=== undefined) {
        return ''
      }
      return quizAnswer === correctAnswer ? 'success' : 'error'
    }


    const quiz = quizes[quizIndex]
    const content = (
      <div>
        <h3 style={{marginBottom: "2rem"}}>{quiz.title}</h3>
        {quizAnswers[quizIndex] !== undefined && (
          <Alert style={{marginBottom: "2rem"}}
            severity={
              quizAnswers[quizIndex] === quiz.correctAnser ? 'success' : 'error'
            }
          >
            {' '}
            {quiz.explanation}
          </Alert>
        )}

        <ToggleButtonGroup
          value={quizAnswers[quizIndex]}
          exclusive
          className="verticalToggle"
          onChange={(_event: any, value: number) =>
            setQuizAnswers((prev) => {
              const newAnswers = [...prev]
              // const correct = value === quiz.correctAnser
              newAnswers[quizIndex] = value
              console.log(newAnswers)
              return newAnswers
            })
          }
          aria-label="can consent"
        >
          ><ToggleButton value={0} className={getQuizButtonClass(quiz.correctAnser, 0)}> {quiz.options[0]}</ToggleButton>
          <ToggleButton value={1} className={getQuizButtonClass(quiz.correctAnser, 1)}> {quiz.options[1]}</ToggleButton>
        </ToggleButtonGroup>

      
      </div>
    )
    return content
  }

  const renderNavChildren = (step: number): JSX.Element | string => {
    if (step === 0) {
      return 'Study Consent'
    }
    if (quizes.findIndex((quiz) => quiz.screen === step) > -1) {
      return 'Consent Question'
    }
    return (
      <div className="FloatingToolbar__toggle">
        <span className="FloatingToolbar__toggle__text">Summary</span>
        <Switch
        
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
          checked={isFullText}
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setIsFullText(event.target.checked)
          }
        />
        <span className="FloatingToolbar__toggle__text">Full Text</span>
      </div>
    )
  }

  return (
    
        <div className="ConsentInfo">
          <FloatingToolbar>{renderNavChildren(currentStep)}</FloatingToolbar>
          <div>
            {currentStep > 0 && (
              <div className="text-right">
                {currentStep} of {totalSteps}
              </div>
            )}
            <div>{currentStep === 0 && <h1>Welcome {name}</h1>}</div>
            <div>
              {getStatic(currentStep, isFullText)}

              {getQuiz(currentStep)}
              {getNavButtons(currentStep)}
            </div>

            {currentStep == 0 && (
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                  style={{ margin: '30px 0' }}
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                >
                  {' '}
                  Start Consent
                </Button>
              </div>
            )}
          </div>
        </div>
     
  )
}

export default ConsentInfo
