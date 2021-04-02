import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import $RefParser from 'json-schema-ref-parser'
import * as _ from 'lodash'
import { cloneDeep, includes } from 'lodash-es'
import * as React from 'react'
import Alert from 'react-bootstrap/Alert'
import { withTranslation, WithTranslation } from 'react-i18next'
import { UiSchema } from 'react-jsonschema-form'
import { Redirect } from 'react-router-dom'
import { SURVEYS } from '../../data/surveys'
import { isWithin25Miles } from '../../helpers/utility'
import { SurveyService } from '../../services/survey.service'
import { UserService } from '../../services/user.service'
import { USPSService } from '../../services/usps.service'
import {
  LoggedInUserData,
  SavedSurvey,
  SavedSurveysObject,
  SurveyType,
  UserDataGroup
} from '../../types/types'
import SynapseForm, { ExtraUIProps } from './synapse_form_wrapper/SynapseForm'
import { StatusEnum } from './synapse_form_wrapper/types'

export interface SurveyWrapperProps {
  formTitle: string //for UI customization
  formClass?: string // to support potential theaming
  cardClass?: string
  surveyName: SurveyType
  token: string
  onDoneCallback?: Function
  onErrorCallback?: Function
  isNoBackBar?: boolean
}

type SurveyWrapperState = {
  savedSurveys?: SavedSurveysObject
  notification?: Notification
  isLoading?: boolean
  formDataId?: string // file holding user form data
  formData?: any // form data that prepopulates the form
  formSchema?: any // schema that drives the form
  formUiSchema?: UiSchema // ui schema that directs how to render the form elements
  formNavSchema?: any // drives the steps left panel
  isFormSubmitted: boolean

  status?: StatusEnum
}

type Error = {
  name?: string
  message?: string
}

interface Notification extends Error {
  type: StatusEnum
}

const extraUIProps: ExtraUIProps = {
  isLeftNavHidden: true,
  isValidateHidden: true,

  isHelpHidden: true,
  isNoSaveButton: false,
  isNoBackBar: false,
}
class SurveyWrapperComponent extends React.Component<
  SurveyWrapperProps & WithTranslation,
  SurveyWrapperState
> {
  constructor(props: SurveyWrapperProps & WithTranslation) {
    super(props)
    this.state = {
      isLoading: true,
      isFormSubmitted: false,
    }
    extraUIProps.isNoBackBar = props.isNoBackBar || false
  }

  async componentDidMount() {
    await this.getData()
  }

  getData = async (): Promise<void> => {
    try {
      const { default: formSchema } = await SURVEYS[
        this.props.surveyName
      ].formSchema()
      const { default: formUiSchema } = await SURVEYS[
        this.props.surveyName
      ].uiSchema()
      const { default: formNavSchema } = await SURVEYS[
        this.props.surveyName
      ].navSchema()

      const jsonFormSchemaDeref = (await $RefParser.dereference(
        JSON.parse(JSON.stringify(formSchema)),
      )) as JSON
      let formData = { metadata: {} }
      const userInfoResponse = await UserService.getUserInfo(this.props.token)

      if (this.props.surveyName !== 'CONTACT') {
        const savedSurveysResponse = await SurveyService.getUserSurveys(
          this.props.token, this.props.surveyName
        )
        const savedData = _.first(savedSurveysResponse.data.items)
        const surveyData = savedData?.data
        this.setState({ savedSurveys: surveyData })
        const currentSurvey = surveyData?.surveys?.find(
          survey => survey.type === this.props.surveyName,
        )
        if (currentSurvey) {
          formData = { ...currentSurvey.data, metadata: {} }
        }
        if (this.props.surveyName === 'HISTORY') {
          formData.metadata = {
            ...formData.metadata,
            gender: userInfoResponse.data.attributes?.gender || '',
          }
        }

        if (this.props.surveyName === 'MORE') {
          //don't offer testing if they have tested positive or selected that have no symptoms or didnt answer
          const covidData = surveyData?.surveys?.find(
            survey => survey.type === 'COVID_EXPERIENCE',
          )

          const kindOfTesting = covidData?.data?.symptoms2?.kind_of_testing

          const isPositive =
            kindOfTesting?.nasal_swab_result === 'positive' ||
            kindOfTesting?.serum_test_result === 'positive'
          const otherNoTest =
            kindOfTesting === 'no_test_no_symptoms' ||
            kindOfTesting === 'no_answer'
          const dontOfferTest = isPositive || otherNoTest

          if (dontOfferTest) {
            //@ts-ignore
            formData.test_location = {
              //@ts-ignore
              ...formData.test_location,
              test_location: 'N/A',
            }
          }

          // 'isEligibleForLabTest' is technically not needed any more since we don't offer lab last, but leaving in if that changes
          // forceSubmit allows a page to change a 'next' button into 'submit' buttom
          // if 'no test' don't ask for test preferences and submit from ''job_commute' screen. If they selected 'noTest' on the next screen 'test_location' submit from there
          formData.metadata = {
            ...formData.metadata,
            isEligibleForLabTest: userInfoResponse.data.attributes
              ? isWithin25Miles(userInfoResponse.data.attributes.zip_code) &&
                !dontOfferTest
              : false,

            forceSubmit: dontOfferTest
              ? { screen: 'job_commute', value: true }
              : {
                  screen: 'test_location',
                  value: {
                    path: 'test_location.test_location',
                    value: 'noTest',
                  },
                },
          }
        }

        if (this.props.surveyName === 'POST_LAB_MONTHLY') {
          formData.metadata = {
            ...formData.metadata,

            forceSubmit: {
              screen: 'intro',
              value: {
                path: 'intro.curr_have_symptoms',
                value: ['positive_no_symptoms', 'no_longer_symptoms'],
              },
            },
          }
        }
      } else {
        //contact path
        const data = {
          data: {
            firstName: userInfoResponse.data.firstName,
            lastName: userInfoResponse.data.lastName,
            attributes: userInfoResponse.data.attributes,
            included: true,
          },
        }
        formData = {
          ...data,
          metadata: { dataGroups: userInfoResponse.data.dataGroups },
        }
      }
      //if we are creating a new file - store the versions

      this.setState({
        formData,
        formSchema: jsonFormSchemaDeref,
        formUiSchema,
        formNavSchema,
        isLoading: false,
      })
    } catch (e) {
      this.onError({ message: e.message })
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  isSurveySubmitted = (surveyName: SurveyType): boolean => {
    const currentSurvey = this.state.savedSurveys?.surveys.find(
      survey => survey.type === surveyName,
    )
    return !!currentSurvey?.completedDate
  }

  finishedProcessing = (status: StatusEnum, message?: string) => {
    this.setState({
      isLoading: false,
      notification: { type: status, message: message },
      status: status,
    })
    //this will show the update message for 7 seconds
    setTimeout(() => {
      this.setState({ status: undefined })
    }, 7000)
  }

  onError = (error: Error) => {
    this.setState({
      notification: {
        type: StatusEnum.ERROR,
        message: error.message,
        name: error.name,
      },
      status: StatusEnum.ERROR,
      isLoading: false,
    })
    // scroll to top to show error

    if (this.props.onErrorCallback) {
      this.props.onErrorCallback(error)
    } else {
      window.scrollTo(0, 0)
    }
  }

  updateUserContactInfo = async (
    _rawData: any,
    data: { data: LoggedInUserData; metadata: { dataGroups: UserDataGroup[] } },
  ) => {
    try {
      // 348: verify the address that has been entered is valid
      const attributes = data.data.attributes!
      const uspsResponseDoc: Document = await USPSService.validateAddress(
        attributes.address1,
        attributes.address2 || '',
        attributes.city,
        attributes.state,
        attributes.zip_code,
      )
      let invalidAddressText = undefined
      const returnTextElement: Element = uspsResponseDoc.getElementsByTagName(
        'ReturnText',
      )[0]
      const cityElement: Element = uspsResponseDoc.getElementsByTagName(
        'City',
      )[0]
      const stateElement: Element = uspsResponseDoc.getElementsByTagName(
        'State',
      )[0]
      const zipCodeElement: Element = uspsResponseDoc.getElementsByTagName(
        'Zip5',
      )[0]
      const errorElement: Element = uspsResponseDoc.getElementsByTagName(
        'Error',
      )[0]
      if (errorElement) {
        invalidAddressText = errorElement.getElementsByTagName('Description')[0]
          .childNodes[0].textContent!
      } else if (returnTextElement) {
        // matched an address, but something is wrong
        invalidAddressText = returnTextElement.childNodes[0].textContent!
      } else {
        let invalidField: string | undefined | null = undefined
        let suggestedValue: string | undefined | null = undefined

        // USPS sometimes returns a validated address, but it automatically "fixes" the zip code/state/city that was provided in the request!
        if (zipCodeElement.childNodes[0].textContent! != attributes.zip_code) {
          invalidField = this.props.t('surveys.contact.zip')
          suggestedValue = zipCodeElement.childNodes[0].textContent
        } else if (
          stateElement.childNodes[0].textContent! != attributes.state
        ) {
          invalidField = this.props.t('surveys.contact.state')
          suggestedValue = stateElement.childNodes[0].textContent
        } else if (
          cityElement.childNodes[0].textContent!.toUpperCase() !=
          attributes.city.toUpperCase()
        ) {
          invalidField = this.props.t('surveys.contact.city')
          suggestedValue = cityElement.childNodes[0].textContent
        }

        if (invalidField) {
          invalidAddressText = this.props.t('surveys.contact.invalidAddress', {
            invalidField: invalidField,
            suggestedValue: suggestedValue,
          })
        }
      }

      if (invalidAddressText) {
        this.onError({ name: '', message: invalidAddressText })
        return
      }

      const isWithin25 = isWithin25Miles(attributes.zip_code)
      if (isWithin25 && !data.metadata.dataGroups.includes('within_nyc')) {
        data.data.dataGroups = [...data.metadata.dataGroups, 'within_nyc']
      }
      if (!isWithin25) {
        data.data.dataGroups = data.metadata.dataGroups.filter(
          group => group !== 'within_nyc',
        )
      }

      const result = await UserService.updateUserData(
        this.props.token,
        data.data,
      )
      const userData = _.pick(attributes, ['zip_code', 'dob', 'gender'])
      await SurveyService.postToHealthData(
        this.props.surveyName,
        userData,
        this.props.token,
      )

      this.setState({ isFormSubmitted: true })
    } catch (error) {
      this.onError({ name: 'submission error', message: error.message })
    }
  }

  saveSurvey = async (rawData: any, completedDate?: Date) => {
    this.setState({
      status: StatusEnum.PROGRESS,
      notification: { type: StatusEnum.PROGRESS, message: 'Progress' },
      isLoading: true,
    })

    const updatedSurvey: SavedSurvey = {
      type: this.props.surveyName,
      updatedDate: new Date(),
      completedDate: completedDate,
      data: rawData,
    }

    let savedSurveys = _.cloneDeep(this.state.savedSurveys)
    if (!savedSurveys?.surveys) {
      savedSurveys = {
        surveys: [updatedSurvey],
      }
    } else {
      const ourSurveyIndex: number | undefined = savedSurveys.surveys.findIndex(
        survey => survey.type === updatedSurvey.type,
      )
      if (ourSurveyIndex === -1) {
        savedSurveys.surveys.push(updatedSurvey)
      } else {
        savedSurveys.surveys[ourSurveyIndex] = updatedSurvey
      }
    }

    try {
      await SurveyService.postUserSurvey(savedSurveys, this.props.token)

      // this.setState({ is true })
      this.finishedProcessing(StatusEnum.SAVE_SUCCESS, 'File Saved')
    } catch (error) {
      this.onError({ name: 'save error', message: error.message })
    }
  }

  submitForm = async (rawData: any, data: any, surveyName: SurveyType) => {
    this.setState({
      isLoading: true,
    })

    // we need to check and update the employer info
    if (surveyName === 'MORE') {
      const employerInfo = data.employer
      const userData = await UserService.getUserInfo(this.props.token)
      const oldAttributes = userData.data.attributes
      let attributes
      if (employerInfo) {
        if (employerInfo?.employment_status === 'unemployed') {
          attributes = { ...oldAttributes, home_phone: employerInfo.home_phone }
        } else {
          attributes = { ...oldAttributes, ...employerInfo.employment_address }
        }
        //update user info w/ new attributes
        const newData = { ...userData.data, attributes }
        const result = await UserService.updateUserData(
          this.props.token,
          newData,
        )

        //remove employer info from the survey
        data = _.omit(data, [
          'employer.home_phone',
          'employer.employment_address',
        ])
        rawData = _.omit(rawData, [
          'employer.home_phone',
          'employer.employment_address',
        ])
      }
    }
    try {
      const result = await SurveyService.postToHealthData(
        this.props.surveyName,
        data,
        this.props.token,
      )

      if (result.ok) {
        await this.saveSurvey(rawData, new Date())
        this.setState({ isFormSubmitted: true })
      }
    } catch (error) {
      this.onError({ name: 'submission error', message: error.message })
    }
  }

  isReadyToDisplayForm = (state: SurveyWrapperState): boolean => {
    return (
      this.state.status !== StatusEnum.ERROR_CRITICAL &&
      this.state.status !== StatusEnum.SUBMIT_SUCCESS &&
      state.formSchema &&
      state.formUiSchema &&
      state.formNavSchema &&
      state.formData
    )
  }

  renderLoader = (
    state: SurveyWrapperState,
    props: SurveyWrapperProps,
  ): JSX.Element => {
    if (
      includes([StatusEnum.ERROR, StatusEnum.ERROR_CRITICAL], state.status) &&
      state.isLoading
    ) {
      return (
        <div className="text-center">
          <CircularProgress color="primary" />
        </div>
      )
    } else {
      return <></>
    }
  }

  renderNotification = (notification?: Notification): JSX.Element => {
    if (!notification) {
      return <></>
    }
    if (notification.type === StatusEnum.ERROR) {
      return (
        <Alert
          variant="danger"
          onClose={() => this.setState({ status: undefined })}
        >
          <Alert.Heading>{this.props.t('surveys.error')}</Alert.Heading>

          <p>
            {notification.name} {notification.message}
          </p>
        </Alert>
      )
    }

    return <></>
  }

  removeKeys = (obj: any, keys: string[]) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        switch (typeof obj[prop]) {
          case 'object':
            if (keys.indexOf(prop) > -1) {
              delete obj[prop]
            } else {
              this.removeKeys(obj[prop], keys)
            }
            break
          default:
            if (keys.indexOf(prop) > -1) {
              delete obj[prop]
            }
            break
        }
      }
    }
  }

  cleanData = (data: any) => {
    const obj = cloneDeep(data)
    this.removeKeys(obj, ['included'])
    for (var propName in obj) {
      if (
        Object.keys(obj[propName]).length === 0 &&
        obj[propName].constructor === Object
      ) {
        delete obj[propName]
      }
    }
    return obj
  }

  render() {
    if (this.state.isFormSubmitted) {
      if (this.props.onDoneCallback) {
        //if we need to do something when done -- do it. otherwise redirect
        this.props.onDoneCallback()
      } else {
        return this.props.surveyName === 'CONTACT' ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to={`/done?surveyname=${this.props.surveyName}`} />
        )
      }
    }
    return (
      <div className={`theme-${this.props.formClass}`}>
        <div className="SRC-ReactJsonForm">
          {this.renderNotification(this.state.notification)}
          {this.renderLoader(this.state, this.props)}

          {this.isReadyToDisplayForm(this.state) && (
            <div>
              <SynapseForm
                schema={this.state.formSchema}
                uiSchema={this.state.formUiSchema!}
                formData={this.state.formData}
                navSchema={this.state.formNavSchema}
                isWizardMode={true}
                formTitle={this.props.formTitle}
                formClass={this.props.formClass}
                cardClass={this.props.cardClass}
                callbackStatus={this.state.status}
                onSave={(data: any) => this.saveSurvey(data)}
                onSubmit={async (data: any) => {
                  this.setState({ status: undefined })
                  this.props.surveyName !== 'CONTACT'
                    ? this.submitForm(
                        data,
                        this.cleanData(data),
                        this.props.surveyName,
                      )
                    : this.updateUserContactInfo(data, this.cleanData(data))
                }}
                isSubmitted={
                  this.isSurveySubmitted(this.props.surveyName) &&
                  !window.location.search.includes('debug')
                }
                extraUIProps={extraUIProps}
              >
                {this.props.children}
              </SynapseForm>
            </div>
          )}
          {this.state.status === StatusEnum.SUBMIT_SUCCESS && (
            <div>
              {' '}
              You have registered successfully. You will need to verify your
              email before you can log in{' '}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const SurveyWrapper = withTranslation()(SurveyWrapperComponent)

export default SurveyWrapper
