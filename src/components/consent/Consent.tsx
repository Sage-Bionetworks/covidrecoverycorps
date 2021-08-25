import {
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import Alert from '@material-ui/lab/Alert/Alert'
import i18next from 'i18next'
import moment from 'moment'
import 'moment/locale/es'
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import { useSessionDataDispatch, useSessionDataState } from '../../AuthContext'
import { ConsentService } from '../../services/consent.service'
import { UserService } from '../../services/user.service'
import useForm from '../useForm'
import FloatingToolbar from '../widgets/FloatingToolbar'
import LearnMore from '../widgets/LearnMore'
import ConsentCopy, { SCREENS_ENUM } from './ConsentCopy'
import ConsentInfo from './ConsentInfo'
import ConsentSentConfirmation from './ConsentSentConfirmation'

export type ConsentProps = {
  token: string
  setConsentFn?: Function
}

export const Consent: React.FunctionComponent<ConsentProps> = ({
  token,
}: ConsentProps) => {
  const [isInfoDone, setIsInfoDone] = useState(false)
  const [isConsentDone, setIsConsentDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isConsentConfirmationShown, setConsentConfirmationShown] = useState(
    false,
  )
  const [doHIPAAConsent, setDoHIPAAConsent] = useState<boolean | undefined>(
    undefined,
  )

  const sessionData = useSessionDataState()
  const sessionUpdateFn = useSessionDataDispatch()

  const [error, setError] = useState('')
  const { t } = useTranslation()

  const stateSchema = {
    agree: { value: '', error: '' },
    shareScope: { value: '', error: '' },
    fullName: { value: '', error: '' },
    dob: { value: '', error: '' },
  }

  const validationStateSchema = {
    agree: {
      required: true,
    },
    shareScope: {
      required: true,
    },

    fullName: {
      required: true,
    },
  }

  //if the user is already consented -- do not take them through the flow
  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        try {
          setIsLoading(true)
          const userInfo = await UserService.getUserInfo(token)
          if (userInfo.data.consented) {
            setDoHIPAAConsent(false)
            setIsConsentDone(true)
          }
        } catch (e) {
          setError(e)
        } finally {
          setIsLoading(false)
        }
      }
    }
    getInfo(token)
    return () => {
      isSubscribed = false
    }
  }, [token])

  async function onSubmitForm(state: any) {
    try {
      setError('')
      const result = await ConsentService.signGeneralConsent(
        state.fullName.value,
        state.shareScope.value,
        token,
      )
      sessionUpdateFn({ type: 'CONSENT' })
      setIsConsentDone(true)
    } catch (e) {
      setError(e.message)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm,
  )

  const checkboxChange = (_name: string, checked: boolean) => {
    handleOnChange({
      target: { name: _name, value: checked },
    })
  }

  const renderHIPAAStep = (): JSX.Element => {
    const element = (
      <div>
        <h2>{t('consent.hipaaText1')}</h2>
        <p>
          <Trans i18nKey="consent.hipaaText2">
            [translate]
            <strong>[translate]</strong>.
          </Trans>
        </p>

        <LearnMore learnMoreText={t('consent.hipaaReview')}>
          <div>
            <Trans i18nKey="consent.hipaaText3">
              <p>[translate]</p>
              <p>[translate]</p>
              <p>[translate]</p>
              <p>[translate]</p>
            </Trans>
          </div>
        </LearnMore>

        <div className="radiobuttons">
          <RadioGroup
            aria-label="start HIPAA consent"
            name="startHIPAAConsent"
            onChange={(_event: any, val: string) =>
              setDoHIPAAConsent(val === 'true')
            }
          >
            <FormControlLabel
              value={'true'}
              control={<Radio color="primary" />}
              label={t('consent.shareYes')}
            />

            <FormControlLabel
              value={'false'}
              control={<Radio color="primary" />}
              label={t('consent.shareNo')}
            />
          </RadioGroup>
        </div>

        <Button
          className="pull-right"
          type="button"
          fullWidth
          disabled={doHIPAAConsent === undefined}
          style={{ margin: '30px 0' }}
          variant="contained"
          color="primary"
          onClick={() => setIsConsentDone(true)}
        >
          {t('common.submit')}
        </Button>
      </div>
    )
    return element
  }

  if (isConsentDone) {
    if (doHIPAAConsent === true) {
      return <Redirect to="consentehr"></Redirect>
    }
    if (doHIPAAConsent === false) {
      return <Redirect to="dashboard?consented=true"></Redirect>
      // window.location.href = '/dashboard?consented=true'
    }
  }

  return (
    <Card>
      <CardContent>
        {isLoading && (
          <div className="text-center">
            <CircularProgress color="primary" />
          </div>
        )}
        {!isLoading && (
          <div className="Consent">
            {!isInfoDone && (
              <ConsentInfo onDone={() => setIsInfoDone(true)}></ConsentInfo>
            )}
            {isInfoDone && !isConsentDone && (
              <>
                <div>
                  <FloatingToolbar
                    closeLinkDestination="/home?alert=CANCELLED_CONSENT"
                    closeLinkText=""
                    closeConfirmationText={t('closeConfirmationText')}
                  >
                    {t('consent.consentSignature')}
                  </FloatingToolbar>
                </div>

                <ConsentCopy
                  screen={SCREENS_ENUM.CONSENT_SIGNATURE1}
                ></ConsentCopy>
                <p>
                  <Trans i18nKey="consentinfo.screen15.text2">[trans]</Trans>
                </p>
                <div
                  className="margin-top-std"
                  style={{ marginLeft: '4rem', marginBottom: '4rem' }}
                >
                  <ConsentCopy
                    screen={SCREENS_ENUM.CONSENT_SIGNATURE2}
                  ></ConsentCopy>
                </div>

                <div
                  style={{
                    marginTop: '2rem',
                  }}
                >
                  <ConsentCopy
                    screen={SCREENS_ENUM.CONSENT_SHARING}
                  ></ConsentCopy>
                </div>
                <LearnMore learnMoreText={t('common.learnMore')}>
                  <div>
                    <p>
                      hi
                      <Trans i18nKey="consentinfo.learnMoreScreen15.text1">
                        [translate]
                      </Trans>
                    </p>
                    <p>
                      <Trans i18nKey="consentinfo.learnMoreScreen15.text2">
                        [translate]
                      </Trans>
                    </p>
                  </div>
                </LearnMore>
                <form className="Consent__form" onSubmit={handleOnSubmit}>
                  <div className="radiobuttons">
                    <RadioGroup
                      aria-label="sharing"
                      name="shareScope"
                      value={state.shareScope.value}
                      onChange={handleOnChange}
                    >
                      <FormControlLabel
                        value={ConsentService.SHARE_SCOPE_ALL}
                        control={<Radio color="primary" />}
                        style={{ marginBottom: '4rem' }}
                        label={i18next.t('consentinfo.screen15.text10')}
                      />

                      <FormControlLabel
                        value={ConsentService.SHARE_SCOPE_PARTNERS}
                        control={<Radio color="primary" />}
                        label={i18next.t('consentinfo.screen15.text11')}
                      />
                    </RadioGroup>
                    <div
                      style={{
                        marginTop: '2rem',
                        marginBottom: '4rem',
                      }}
                    >
                      <p>{i18next.t('consentinfo.screen15.text12')}</p>
                    </div>
                  </div>
                  <p
                    className="margin-top-std"
                    style={{ marginBottom: '4rem' }}
                  >
                    {i18next.t('consentinfo.screen15.text13')}
                  </p>
                  <div
                    className="form-group checkbox--indented"
                    style={{ marginLeft: '0px' }}
                  >
                    <Checkbox
                      color="primary"
                      style={{ paddingTop: '3px' }}
                      value={state.agree.value}
                      onChange={(val, checked) =>
                        checkboxChange('agree', checked)
                      }
                    />
                    <p>
                      <strong>
                        {i18next.t('consentinfo.screen15.text14')}
                      </strong>
                    </p>
                  </div>

                  <p>
                    {moment().locale(i18next.language).format('MMMM Do, YYYY')}
                  </p>
                  <div className="form-group" style={{ marginTop: '4rem' }}>
                    <TextField
                      label={i18next.t('consentinfo.screen15.text15')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleOnChange}
                      value={state.fullName.value}
                      name="fullName"
                      variant="outlined"
                    />
                  </div>
                  {error && <Alert severity="error">{error}</Alert>}
                  {Object.keys(state).map(
                    key =>
                      state[key].error && (
                        <Alert severity="error">{state[key].error}</Alert>
                      ),
                  )}
                  <div className="buttons--action">
                    <Button
                      type="submit"
                      fullWidth
                      disabled={disable}
                      variant="contained"
                      color="primary"
                    >
                      {i18next.t('consentinfo.screen15.text16')}
                    </Button>
                  </div>
                </form>
              </>
            )}
            {isConsentDone && !isConsentConfirmationShown && (
              <ConsentSentConfirmation
                type="CONSENT"
                doneCallbackFn={() => setConsentConfirmationShown(true)}
              ></ConsentSentConfirmation>
            )}
            {isConsentDone && isConsentConfirmationShown && (
              <>
                <div>
                  <FloatingToolbar
                    closeLinkDestination="/home?alert=CANCELLED_CONSENT"
                    closeLinkText=""
                    closeConfirmationText={t('closeConfirmationText')}
                  >
                    {t('consent.consentSignature')}
                  </FloatingToolbar>
                </div>

                {renderHIPAAStep()}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Consent
