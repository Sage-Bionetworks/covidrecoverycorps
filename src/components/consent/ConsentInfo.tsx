import React, { useState, useEffect } from 'react'

import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

import useForm from '../useForm'
import Nav from '../Nav'
import Button from '@material-ui/core/Button/Button'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Alert from '@material-ui/lab/Alert'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import { SizeMe } from 'react-sizeme'
import Switch from '@material-ui/core/Switch/Switch'
import ConsentCopy, { StepInfo } from './ConsentCopy'

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
      'To be able to better understand COVID-19'
    ],
    explanation:
      'This study is a research study to understand COVID-19 better. The study does not provide medical treatment.',
    correctAnser: 1
  },
  {
    screen: 4,
    title: 'What is the primary risk in this study?',
    options: ['Privacy', 'There is no risk in participating in this study'],
    explanation:
      'We will do our best to protect your privacy. But we can’t guarantee your privacy. It is possible that public health authorities will ask to see the data.',
    correctAnser: 0
  }
]
const totalSteps = 5

export const ConsentInfo: React.FunctionComponent<ConsentInfoProps> = ({
  name,
  onDone
}: ConsentInfoProps) => {
  const [isFullText, setIsFullText] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState(new Array(2))

 /* const titles = [
    '',
    'Rearch study activities',
    '',
    'What it means to share data with us'
  ]
  const contentSummary = ['602368', '602367', '', '602368',  '', '602367']
  const contentDetail = ['602368', '602366', '', '602368', '', '602366']*/

 /* const getTitle = (step: number): JSX.Element =>
    titles[step] ? <h1>{titles[step]}</h1> : <></>*/

  const getText = (step: number, fullText: boolean): JSX.Element => {
    const stepInfo: StepInfo = {
      step, 
      isSummary: !fullText
    }
    return <ConsentCopy stepInfo={stepInfo}></ConsentCopy>
   /* let wikiId
    if (!fullText) {
      console.log('summarytrue', fullText)
      wikiId = contentSummary[step]
    } else {
      console.log('summaryfalse', fullText)
      wikiId = contentDetail[step]
    }
    return <MarkdownSynapse ownerId="syn21985841" wikiId={wikiId} />*/
  }

  const getStatic = (step: number, fullText: boolean): JSX.Element => {
    const quiz = quizes.find(quiz => quiz.screen === step)
    if (quiz) {
      return <></>
    }
    return (
      <>
        {' '}

        {getText(step, fullText)}
      </>
    )
  }

  const getNavButtons = (step: number, width: number | null): JSX.Element => {
    const quizIndex = quizes.findIndex(quiz => quiz.screen === step)

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

    let style: { [key: string]: string } = {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      width: width ? `${width}px` : 'auto'
    }

    if (quizIndex > -1) {
      style = { ...style, position: 'fixed', bottom: '16px' }
    }

    return (
      <div style={style}>
        {currentStep > 0 && (
          <Button 
          color="primary"
          variant="contained"
            onClick={() => setCurrentStep(prev => prev - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />&nbsp;
            </Button>
        )}
        {currentStep > 0 && currentStep <= totalSteps && (
          <Button
          color="primary"
          variant="contained"
            disabled={isDisabled()}
            onClick={() => {
              if (currentStep < totalSteps) {
                setCurrentStep(prev => prev + 1)
              } else {
                onDone()
              }
            }}
          >
            &nbsp;<FontAwesomeIcon icon={faArrowRight} />
            </Button>
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
          value={quizAnswers[quizIndex]}
          exclusive
          className="verticalToggle"
          onChange={(_event: any, value: number) =>
            setQuizAnswers(prev => {
              const newAnswers = [...prev]
              // const correct = value === quiz.correctAnser
              newAnswers[quizIndex] = value
              console.log(newAnswers)
              return newAnswers
            })
          }
          aria-label="can consent"
        >
          ><ToggleButton value={0}> {quiz.options[0]}</ToggleButton>
          <ToggleButton value={1}> {quiz.options[1]}</ToggleButton>
        </ToggleButtonGroup>

        {quizAnswers[quizIndex] !== undefined && (
          <Alert
            severity={
              quizAnswers[quizIndex] === quiz.correctAnser ? 'success' : 'error'
            }
          >
            {' '}
            {quiz.explanation}
          </Alert>
        )}
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
    
        <div className="NavToggle">
       
          <span className="NavToggle__text">Summary</span>
          <Switch
            defaultChecked
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
            checked={isFullText}
            size = "small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setIsFullText(event.target.checked)
            }
          />
          <span className="NavToggle__text">Full Text</span>
        </div>
     
    )
  }

  return (
    <SizeMe >
      {({ size }) => (
        <div className="ConsentInfo">
          <Nav width={size.width}>{renderNavChildren(currentStep)}</Nav>
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
              {getNavButtons(currentStep, size.width)}
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
      )}
    </SizeMe>
  )
}

export default ConsentInfo
