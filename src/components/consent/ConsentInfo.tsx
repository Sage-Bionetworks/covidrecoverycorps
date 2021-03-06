import React, { useState } from 'react'
import FloatingToolbar from '../widgets/FloatingToolbar'
import Button from '@material-ui/core/Button/Button'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Alert from '@material-ui/lab/Alert'
import Switch from '@material-ui/core/Switch/Switch'
import ConsentCopy, { StepInfo, SCREENS_ENUM } from './ConsentCopy'
import BlueSeparator from '../static/BlueSeparator'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import ConsentIcons from './ConsentIcons'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { ReactComponent as CovidRecoveryCorpsLogo } from '../../assets/CovidRecoveryCorpsLogo.svg'

type ConsentInfoProps = {
  onDone: Function
}
const quizes = [
  {
    screen: 2,
    title: i18next.t('consentinfo.screen3.text1'),
    options: [
      i18next.t('consentinfo.screen3.text2'),
      i18next.t('consentinfo.screen3.text3'),
    ],
    explanation: i18next.t('consentinfo.screen3.text4'),
    correctAnswer: 1,
  },
  {
    screen: 5,
    title: i18next.t('consentinfo.screen6.text1'),
    options: [
      i18next.t('consentinfo.screen6.text2'),
      i18next.t('consentinfo.screen6.text3'),
    ],
    explanation: i18next.t('consentinfo.screen6.text4'),
    correctAnswer: 0,
  },
  {
    screen: 8,
    title: i18next.t('consentinfo.screen9.text1'),
    options: [
      i18next.t('consentinfo.screen9.text2'),
      i18next.t('consentinfo.screen9.text3'),
    ],
    explanation: i18next.t('consentinfo.screen9.text4'),
    correctAnswer: 1,
  },
]

const totalSteps = 13

export const ConsentInfo: React.FunctionComponent<ConsentInfoProps> = ({
  onDone,
}: ConsentInfoProps) => {
  const [isFullText, setIsFullText] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
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
              quizAnswers[quizIndex] === quiz.correctAnswer
                ? 'success'
                : 'error'
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
    console.log(step, 'step')
    if (step < 1 || step === 13) {
      return t('consentinfo.studyConsent')
    }
    if (quizes.findIndex(quiz => quiz.screen === step) > -1) {
      return t('consentinfo.consentQuestion')
    }
    return (
      <div className="FloatingToolbar__toggle">
        <span
          className="FloatingToolbar__toggle__text"
          onClick={() => setIsFullText(false)}
        >
             {t('consentinfo.summary')}

        </span>
        <Switch
          color="primary"
          inputProps={{ 'aria-label':   t('consentinfo.consentSummaryToggle') }}
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
             {t('consentinfo.fullText')}
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
            <CovidRecoveryCorpsLogo />
            <p>&nbsp;</p>
            <ConsentCopy
              screen={SCREENS_ENUM.CONSENT_INTRO}
              isEHR={false}
            ></ConsentCopy>
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
              {t('consentinfo.startConsent')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsentInfo
