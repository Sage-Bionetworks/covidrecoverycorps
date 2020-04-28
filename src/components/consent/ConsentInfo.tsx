import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { ToggleButton, FormControl } from 'react-bootstrap'
import useForm from '../useForm'
import Nav from '../Nav'
import Button from '@material-ui/core/Button/Button'
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
const totalSteps = 5

export const ConsentInfo: React.FunctionComponent<ConsentInfoProps> = ({
  name,
  onDone,
}: ConsentInfoProps) => {
  const [isSummary, setIsSummary] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState(new Array(2))

  const titles = [
    '',
    'Rearch study activities',
    '',
    'What it means to share data with us',
  ]
  const contentSummary = ['602368', '602367', '', '602368']
  const contentDetail = ['602368', '602366', '', '602368']

  const getTitle = (step: number): JSX.Element =>
    titles[step] ? <h1>{titles[step]}</h1> : <></>

  const getText = (step: number, summary: boolean): JSX.Element => {
    let wikiId
    if (summary) {
      console.log('summarytrue', summary)
      wikiId = contentSummary[step]
    } else {
      console.log('summaryfalse', summary)
      wikiId = contentDetail[step]
    }
    return <MarkdownSynapse ownerId="syn21985841" wikiId={wikiId} />
  }

  const getStatic = (step: number, summary: boolean): JSX.Element => {
    const quiz = quizes.find(quiz => quiz.screen === step)
    if (quiz) {
      return <></>
    }
    return (
      <>
        {' '}
        {getTitle(step)}
        {getText(step, summary)}
      </>
    )
  }

  const getNavButtons = (step: number): JSX.Element => {
    const isDisabled = (step: number): boolean => {
      const quizIndex = quizes.findIndex(quiz => quiz.screen === step)
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

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentStep > 0 && (
          
          <button
            className="btn "
            onClick={() => setCurrentStep(prev => prev - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        {currentStep > 0 && currentStep <= totalSteps && (
          <button
            className="btn "
            disabled={isDisabled(step)}
            onClick={() => {
              if (currentStep < totalSteps) {
                setCurrentStep(prev => prev + 1)
              } else {
                onDone()
              }
            }}
          >
             <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    )
  }

  const getQuiz = (step: number) => {
    const quizIndex = quizes.findIndex(quiz => quiz.screen === step)
    if (quizIndex == -1) {
      return <></>
    }
    const quiz = quizes[quizIndex]
    const content = (
      <div>
        <h3>{quiz.title}</h3>

        <ToggleButtonGroup
          vertical
          size="lg"
          aria-label="First group"
          type="radio"
          name="cons"
          className="buttonGroup"
          style={{ display: 'block' }}
          onChange={(value: number) =>
            setQuizAnswers(prev => {
              const newAnswers = [...prev]
              const correct = value === quiz.correctAnser
              newAnswers[quizIndex] = correct
              console.log(newAnswers)
              return newAnswers
            })
          }
        >
          <ToggleButton variant="primary" value={0} block>
            {quiz.options[0]}
          </ToggleButton>
          <ToggleButton variant="primary" value={1} block>
            {quiz.options[1]}
          </ToggleButton>
        </ToggleButtonGroup>
        <div
          className={
            quizAnswers[quizIndex] === true
              ? ' quizAnswer quizAnswer alert alert-success'
              : 'quizAnswer alert alert-danger'
          }
          style={{
            display: quizAnswers[quizIndex] !== undefined ? 'block' : 'none',
          }}
        >
          {quiz.explanation}
        </div>
      </div>
    )
    return content
  }

  const renderNavChildren = (step: number): JSX.Element | string => {
    if (step === 0) {
      return 'Study Consent'
    }
    if (quizes.findIndex(quiz => quiz.screen === step) > -1) {
      return 'Consent Question'
    }
    return (
      <ToggleButtonGroup
        size="sm"
        aria-label="First group"
        type="radio"
        name="summary"
        className="buttonGroup"
        value={isSummary}
        onChange={(val: boolean) => setIsSummary(val)}
      >
        <ToggleButton variant="primary" value={true}>
          Summary
        </ToggleButton>
        <ToggleButton variant="primary" value={false}>
          Full Text
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }

  return (
    <div className="ConsentInfo">
      <Nav>{renderNavChildren(currentStep)}</Nav>
      <div>
        {currentStep > 0 && (
          <div className="text-right">
            {currentStep} of {totalSteps}
          </div>
        )}
        <div>{currentStep === 0 && <h1>Welcome {name}</h1>}</div>
        <div>
          {getStatic(currentStep, isSummary)}

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
              onClick={() => setCurrentStep(prev => prev + 1)}
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
