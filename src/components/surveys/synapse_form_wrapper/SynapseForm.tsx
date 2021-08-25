import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import i18next from 'i18next'
import { Engine } from 'json-rules-engine'
import _ from 'lodash-es'
import * as React from 'react'
import {
  AjvError,
  default as Form,
  ErrorListProps,
  Field,
  UiSchema,
  Widget,
} from 'react-jsonschema-form'
import { getUiOptions } from 'react-jsonschema-form/lib/utils'
import { Prompt } from 'react-router-dom'
import Switch from 'react-switch'
import { GoogleService } from '../../../services/google.service'
import FloatingToolbar from '../../widgets/FloatingToolbar'
import AltDateWidget from './AltDateWidget'
import DataDebug from './DataDebug'
import ExclusiveCheckboxesObjectField from './ExclusiveCheckboxesObjectField'
import ExclusiveCheckboxesWidget from './ExclusiveCheckboxesWidget'
import Header from './Header'
import { NavButtons, NextStepLink } from './NavButtons'
import RadioRangeWidget from './RadioRangeWidget'
import StepsSideNav from './StepsSideNav'
import SummaryTable from './SummaryTable'
import {
  FormSchema,
  IRulesNavigationEvent,
  IRulesValidationEvent,
  NavActionEnum,
  RulesResult,
  StatusEnum,
  Step,
  StepStateEnum,
} from './types'
import WarningModal from './WarningModal'

export interface IFormData {
  [key: string]: {
    included?: boolean
    [key: string]: any
  }
}

export type ExtraUIProps = {
  isLeftNavHidden?: boolean
  isValidateHidden?: boolean
  onNextCallback?: Function
  isHelpHidden?: boolean
  isNoSaveButton?: boolean //if no save button submit will be instead of next
  isNoBackBar?: boolean
}

export type SynapseFormProps = {
  schema: FormSchema
  uiSchema: UiSchema
  navSchema: {
    steps: any[]
  }
  formData: IFormData
  onSubmit: Function

  onSave: Function
  formTitle: string
  cardClass?: string
  formClass?: string
  isWizardMode?: boolean
  callbackStatus?: StatusEnum
  isSubmitted?: boolean
  extraUIProps?: ExtraUIProps
}

type SynapseFormState = {
  formData: IFormData // form data that prepopulates the form
  currentStep: Step
  nextStep?: Step
  steps: Step[]
  previousStepIds: string[]
  hasValidated?: boolean //validation has been called and it passed
  doShowErrors: boolean //if we should show error summary at the top of the page
  doShowHelp: boolean
  modalContext?: { action: Function; arguments: any[] }
  hasUnsavedChanges: boolean
  isSubmitted?: boolean
  isSubmitting?: boolean
  isLoadingSaved: boolean
}

export interface SummaryFormat {
  label: string
  value: string
}

/* The reason behind the custom implementation is to replace the 
/ fieldset w/ div.fieldset since fieldset limits the display options we can have in css.
/ This is purely representational and should not affect performance */

function ObjectFieldTemplate(props: any) {
  const canExpand = function canExpand() {
    const { formData, schema, uiSchema } = props
    if (!schema.additionalProperties) {
      return false
    }
    // @ts-ignore
    const { expandable } = getUiOptions(uiSchema)
    if (expandable === false) {
      return expandable
    }
    // if ui:options.expandable was not explicitly set to false, we can add
    // another property if we have not exceeded maxProperties yet
    if (schema.maxProperties !== undefined) {
      return Object.keys(formData).length < schema.maxProperties
    }
    return true
  }

  const { TitleField, DescriptionField } = props
  return (
    <div className="fieldset" id={props.idSchema.$id}>
      {(props.uiSchema['ui:title'] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema['ui:title']}
          required={props.required}
          formContext={props.formContext}
        />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={
            <div dangerouslySetInnerHTML={{ __html: props.description }}></div>
          }
          formContext={props.formContext}
        />
      )}

      {
        //@ts-ignore
        props.properties.map((prop: { content: any }) => prop.content)
      }
      {canExpand() && (
        <button
          className="object-property-expand"
          onClick={props.onAddClick(props.schema)}
          disabled={props.disabled || props.readonly}
        />
      )}
    </div>
  )
}

const widgets = {
  //@ts-ignore
  CustomDateWidget: AltDateWidget as Widget,
  ExclusiveCheckboxesWidget: ExclusiveCheckboxesWidget as Widget,
  RadioRangeWidget: RadioRangeWidget as Widget,
}

const fields = {
  checkboxExclusiveField: (ExclusiveCheckboxesObjectField as unknown) as Field,
}

export default class SynapseForm extends React.Component<
  SynapseFormProps,
  SynapseFormState
> {
  isDebugHidden = !window.location.search.includes('debug')

  excludeWarningText = (
    <div>
      <p>
        This action will clear any entered data on this page and remove this
        form from your submission. You can include it again at anytime. Only
        this page will be affected.
      </p>
      <p>Are you sure you want to skip this step and clear any entered data?</p>
    </div>
  )
  excludeWarningHeader = 'Skip This Step?'
  unsavedDataWarning = `You might have some unsaved data. Are you sure you want to leave?`
  formRef: any //ref to form for submission
  formDivRef: any // ref to the div containing form (for scrolling on validation failure)
  navAction: NavActionEnum = NavActionEnum.NONE
  uiSchema: {}
  nextStep: Step | undefined
  extraErrors: AjvError[] = []

  isNewForm = (formData: IFormData): boolean => {
    return (
      (Object.keys(formData).length === 1 &&
        Object.keys(formData)[0] === 'metadata') ||
      Object.keys(formData).length === 0
    )
  }

  getFirstStep = (steps: Step[], formData: IFormData): Step => {
    if (!this.isNewForm(formData)) {
      return steps.find(step => step.final === true) || steps[0]
    } else {
      return steps[0]
    }
  }

  constructor(props: SynapseFormProps) {
    super(props)

    //will modify the ui:help to render html vs text
    this.uiSchema = stringToElementForProp(
      _.cloneDeep(props.uiSchema),
      'ui:help',
    )
    //create steps array from the navSchema
    const steps = props.navSchema.steps
      .map((step, i) => {
        return {
          ...step,
          inProgress: i === 0 ? true : false,
        }
      })
      .sort((a, b) => a.order - b.order)

    this.formRef = React.createRef()
    this.formDivRef = React.createRef()
    const currentStep = this.getFirstStep(steps, props.formData)
    this.state = {
      currentStep,
      steps,
      previousStepIds: [],
      formData: props.formData,
      doShowErrors: false,
      doShowHelp: true,
      hasUnsavedChanges: false,
      isSubmitted: props.isSubmitted,
      isLoadingSaved: !this.isNewForm(this.props.formData),
    }
  }
  /* Agendel - replaced by Dashboard return 
  onUnload = (ev: any) => {
    if (this.state.hasUnsavedChanges) {
      ev.preventDefault()
    
      return (ev.returnValue = this.unsavedDataWarning)
    }
    return
  }
  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
    window.addEventListener('beforeunload', this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
  }
  */

  componentDidUpdate(prevProps: SynapseFormProps) {
    const shouldUpdate = this.props.callbackStatus !== prevProps.callbackStatus
    const isSuccess =
      this.props.callbackStatus === StatusEnum.SAVE_SUCCESS ||
      this.props.callbackStatus === StatusEnum.SUBMIT_SUCCESS
    const isError =
      this.props.callbackStatus === StatusEnum.ERROR ||
      this.props.callbackStatus === StatusEnum.ERROR_CRITICAL
    if (shouldUpdate && isSuccess) {
      this.setState({ hasUnsavedChanges: false })
      if (this.props.callbackStatus === StatusEnum.SUBMIT_SUCCESS) {
        this.setState({ isSubmitted: true, isSubmitting: false })
        window.history.back()
      }
    }
    if (shouldUpdate && isError) {
      this.setState({ isSubmitting: false })
    }
  }

  _setIncludedPropInFormDataNonWizard = (
    currentState: SynapseFormState,
    schemaScreens: any,
  ): IFormData => {
    const result = {}
    const currentStateFormData = currentState.formData
    //if there is a top level 'included' property in schema - update the form.
    Object.keys(schemaScreens).forEach((key: string) => {
      if (_.get(schemaScreens[key], `properties.included`)) {
        _.set(result, `${key}.included`, true)
      }
    })
    return { ...currentStateFormData, ...result }
  }

  _setIncludedPropInFormDataWizard = (
    currentState: SynapseFormState,
  ): IFormData => {
    const firstStepId = currentState.currentStep.id
    const newStateData = _.cloneDeep(currentState.formData)
    _.set(newStateData, `${firstStepId}.included`, true)
    return newStateData
  }

  componentDidMount() {
    //this.setupBeforeUnloadListener()
    const isNewForm = this.isNewForm(this.state.formData)
    if (!isNewForm) {
      //when loading saved form - validate to see the steps status
      this.triggerAction(NavActionEnum.VALIDATE)
    } else {
      // for validation of optional forms. Validation is enforced only if included property is set.
      this.setState(prevState => {
        const newFormData = this.props.isWizardMode
          ? this._setIncludedPropInFormDataWizard(prevState)
          : this._setIncludedPropInFormDataNonWizard(
              prevState,
              this.props.schema,
            )
        return {
          formData: newFormData,
        }
      })
    }
  }

  // get the schema slice for the current screen/step
  getSchema = ({ id, final }: Step): FormSchema => {
    if (final) {
      return this.props.schema
    }
    //only get schema for current step. Only the portion of entire form is shown

    const currentStepSlice = _.pick(this.props.schema, [
      'title',
      'type',
      `properties.${id}`,
    ])
    return currentStepSlice
  }

  // find the next step
  getNextStepId = async (
    currentStep: Step,
    formData: any,
    nextStepId?: string,
  ): Promise<string> => {
    if (nextStepId) {
      return nextStepId
    }
    if (!currentStep.rules || currentStep.rules.length === 0) {
      return currentStep.default
    }

    // if there are rules - run the engine and go to the first next step
    const engine = new Engine(currentStep.rules)
    try {
      const result: RulesResult = await engine.run(formData)
      if (result.events.length > 0) {
        return (result.events[0] as IRulesNavigationEvent).params.next
      } else {
        return currentStep.default
      }
    } catch (error) {
      return currentStep.default
    }
  }

  // called when going next, previous or a given step
  moveStep = async (
    formData: any,
    nextStepId: string | undefined,
    isError: boolean,
    previousStack = [...this.state.previousStepIds],
  ) => {
    const currentStep = this.state.currentStep
    let currentStepState: StepStateEnum
    //we don't wnat to display errors on the page - this will be done explicitly in validation
    this.formRef.current.setState({ errorSchema: {} })
    //in wizard mode we can only move forwards (don't know next step yet) or backwards (do know next step)
    const isMoveForwardInWizardMode = this.props.isWizardMode && !nextStepId

    //previousStack is used for 'back' navigation is wizard mode.
    //only need to do it if moving forward i.e. nextStepId is undefined
    if (isMoveForwardInWizardMode) {
      previousStack.push(currentStep.id)
      window.scrollTo(0, 100)
    }

    if (!isError) {
      currentStepState = StepStateEnum.COMPLETED

      if (!isMoveForwardInWizardMode && this.props.isWizardMode) {
        currentStepState = StepStateEnum.TODO
      }
    } else {
      currentStepState = StepStateEnum.ERROR
    }
    // determine next step
    nextStepId = await this.getNextStepId(currentStep, formData, nextStepId)

    const steps = this.state.steps.map(step => {
      if (step.id === currentStep.id) {
        return {
          ...step,
          ...{ state: currentStepState, inProgress: false },
        }
      } else if (step.id === nextStepId) {
        return { ...step, ...{ inProgress: true } }
      }
      return step
    })
    //if we are in wizard mode we want to make sure that we include the step we are about to go to
    if (isMoveForwardInWizardMode) {
      _.set(formData, `${nextStepId}.included`, true)
    }

    //at this point the form is valid and submitted and the data reflects the latest
    const nextStep = this.state.steps.find(step => step.id === nextStepId)!
    // clean up unused screens in wizard before getting to submit
    if (this.props.isWizardMode && nextStep.final) {
      Object.keys(formData).forEach(key => {
        if (formData[key].included === undefined) {
          formData[key] = {}
        }
      })
    }
    window.history.replaceState(
      null,
      nextStep.title,
      `${window.location.pathname}?step=${nextStepId}`,
    )
    GoogleService.sendPageView()
    this.saveStepState(previousStack, steps, nextStep!, formData)
  }

  //save the state of the current screen
  saveStepState = (
    previousStepIds: string[],
    steps: Step[],
    currentStep: Step,
    formData: any,
  ) => {
    this.setState({
      previousStepIds,
      steps,
      currentStep,
      formData,
      hasValidated: false,
      doShowErrors: false,
    })
  }

  //--------- fns to support navigation --------------------//
  goPrevious = async (formData: any, isError: boolean) => {
    let previousStepId: string | undefined
    const previousStack: string[] = [...this.state.previousStepIds]
    // in wizard mode we go to the previously visited screen.
    // In regular mode go to the screen with previous index
    if (this.props.isWizardMode) {
      previousStepId = previousStack.pop()
      if (!this.isSubmitScreen()) {
        //since we don't know if we'll get back to that step again - exclude it. We will include it again if we
        // get to it.
        _.set(formData, `${this.state.currentStep.id}.included`, undefined)
      }
    } else {
      const currentIndex = _.findIndex(this.state.steps, {
        id: this.state.currentStep.id,
      })
      if (currentIndex > 0) {
        previousStepId = this.state.steps[currentIndex - 1].id
      }
    }
    if (!_.isUndefined(previousStepId)) {
      return this.moveStep(formData, previousStepId, isError, previousStack)
    }
  }

  triggerAction = async (navAction: NavActionEnum) => {
    // we don't need to validate on save so bypassing submit
    if (navAction === NavActionEnum.SAVE) {
      window.scrollTo(0, 0)
      return this.props.onSave(this.state.formData)
    } else {
      this.navAction = navAction
      if (navAction === NavActionEnum.PREVIOUS) {
        this.performAction(
          this.navAction,
          this.state.currentStep.state === StepStateEnum.ERROR,
        )
      } else {
        //this.navAction = navAction
        // first run whatever custom validaton we have
        this.extraErrors = await this.runCustomValidation(
          this.state.formData,
          this.state.currentStep,
          this.state.steps,
        )
        if (this.formRef.current) {
          this.formRef.current.submit()
        }
      }
    }
  }

  // triggered when we click on the step name in left nav (doesn't happen in wizard mode)
  triggerStepChange = (step: Step) => {
    this.nextStep = step
    this.triggerAction(NavActionEnum.GO_TO_STEP)
  }

  onError = (args: any) => {
    this.setState({
      doShowErrors: true,
      hasValidated: false,
    })
    if (this.navAction === NavActionEnum.VALIDATE) {
      const modifiedSteps = this.setStepStatusForFailedValidation(
        args.props,
        this.state.steps,
        !!this.props.isWizardMode,
        this.state.formData,
        this.getSchema(this.state.currentStep).properties ||
          this.getSchema(this.state.currentStep),
      )
      this.setState({ steps: modifiedSteps })
      if (this.formDivRef?.current) {
        this.formDivRef.current.scrollTo(0, 0)
      }
      if (this.state.isLoadingSaved) {
        this.moveStep(this.state.formData, modifiedSteps[0].id, true)
        this.setState({ isLoadingSaved: false })
      }
    }
  }

  setStepStatusForFailedValidation = (
    errors: AjvError[],
    steps: Step[],
    isWizard: boolean,
    formData: IFormData,
    currentSchemaProperties: any,
  ): Step[] => {
    //error property is in the format: step.somevalue.etc  .welcome.submission_name example
    //find all the steps where there is an error
    const stepsWithError = errors.map(
      error => _.trimStart(error.property, '.').split('.')[0],
    )
    //find all steps in current schema
    const stepsInCurrentSchema = Object.keys(currentSchemaProperties)
    const updatedSteps: Step[] = steps.map(step => {
      //if there is an error in this step
      if (stepsWithError.indexOf(step.id) > -1) {
        return {
          ...step,
          state: StepStateEnum.ERROR,
        }
        //if no error and included in schema
      } else if (stepsInCurrentSchema.indexOf(step.id) > -1) {
        let state = StepStateEnum.COMPLETED
        //if we are in wizard and possibly have not visited this step
        if (isWizard && !_.get(formData[step.id], 'included')) {
          state = step.state
        }

        return {
          ...step,
          state: state,
        }
      } else {
        return step
      }
    })
    return updatedSteps
  }

  //we are constantly saving form data. Needed to overwrite on-error behavior
  handleOnChange({ formData }: any) {
    //this is just for form updates. submit screen goes different route
    if (!this.isSubmitScreen() && !this.state.currentStep.excluded) {
      const hasUnsavedChanges = !_.isEqual(this.state.formData, formData)
      this.setState({ formData, hasUnsavedChanges })
    }
  }

  performAction(navAction: NavActionEnum, hasError: boolean) {
    const formData = this.state.formData

    switch (navAction) {
      case NavActionEnum.NEXT: {
        return this.moveStep(formData, undefined, hasError)
      }
      case NavActionEnum.PREVIOUS: {
        return this.goPrevious(formData, hasError)
      }
      case NavActionEnum.GO_TO_STEP: {
        //nextStep is returned when clicked on the Steps left nav
        if (!this.nextStep) {
          return
        }
        return this.moveStep(formData, this.nextStep.id, hasError)
      }

      case NavActionEnum.SUBMIT: {
        this.setState({ isSubmitting: true })
        this.props.onSubmit(formData)
        return
      }
      case NavActionEnum.VALIDATE: {
        //we get here is we clicked validate and the data is valid.
        // if it's not valid we handle it in onError fn
        const steps = this.setStepStatusForFailedValidation(
          [],
          this.state.steps,
          !!this.props.isWizardMode,
          this.state.formData,
          this.getSchema(this.state.currentStep).properties ||
            this.getSchema(this.state.currentStep),
        )
        const currentStep = {
          ...this.state.currentStep,
          state: StepStateEnum.COMPLETED,
        }

        this.setState({ hasValidated: true, currentStep, steps })
        if (this.state.isLoadingSaved) {
          this.moveStep(this.state.formData, steps[0].id, false)
          this.setState({ isLoadingSaved: false })
        }
        return
      }
      default:
        return
    }
  }

  //we need to route things through submit - otherwise validation does not kick in
  // it triggers internal library validation and calls the performAction with the params for action
  onSubmit = (): any => {
    this.performAction(
      this.navAction,
      this.state.currentStep.state === StepStateEnum.ERROR,
    )
  }

  isSubmitScreen = (): boolean => {
    return this.state.currentStep.final === true && !this.state.isLoadingSaved
  }

  showExcludeStateWarningModal = (
    stepId: string,
    isUpdateFlattenedData: boolean = false,
  ): void => {
    this.setState({
      modalContext: {
        action: this.toggleExcludeStep,
        arguments: [stepId, true, isUpdateFlattenedData],
      },
    })
  }

  toggleExcludeStep = (stepId: string, isExclude: boolean): void => {
    this.setState((prevState, props) => {
      const steps = prevState.steps.map(stp => {
        if (stp.id === stepId) {
          return { ...stp, ...{ excluded: isExclude } }
        }
        return stp
      })

      const formDataUpdated = _.cloneDeep(prevState.formData)
      const currentStep = _.cloneDeep(prevState.currentStep)
      //we need this because you can exclude on the ifnal screen so the currentStep.id
      //is not always the one we need to exclude
      if (currentStep.id === stepId) {
        currentStep.excluded = isExclude
      }
      //if exluding - blow away the data for the step
      if (isExclude) {
        formDataUpdated[stepId] = {}
        //_.set(formDataUpdated, `${stepId}.included`, false);
      } else {
        _.set(formDataUpdated, `${stepId}.included`, true)
      }
      return {
        steps,
        formData: formDataUpdated,
        modalContext: undefined,
        currentStep,
      }
    })
  }

  private renderNotification = (status?: StatusEnum): JSX.Element => {
    if (status === StatusEnum.SAVE_SUCCESS) {
      return (
        <div className="notification-area">{i18next.t('surveys.saved')}</div>
      )
    }
    if (status === StatusEnum.SUBMIT_SUCCESS) {
      return (
        <div className="notification-area">
          {i18next.t('surveys.submitted')}{' '}
        </div>
      )
    }
    if (status === StatusEnum.PROGRESS) {
      return (
        <div className="notification-area">{i18next.t('surveys.working')}</div>
      )
    }
    return <></>
  }

  // displays the text for screens that don't have any form data
  private renderTextForStaticScreen = (): JSX.Element => {
    if (!this.state.currentStep.copy) {
      return <></>
    }
    const copy = this.state.currentStep.copy
    return (
      <div
        className="static-screen"
        dangerouslySetInnerHTML={{ __html: copy! }}
      />
    )
  }

  // sometimes we need to force the next button to become a submit button
  private getForceSubmitScreen = (
    formData: object,
    forceSubmit:
      | {
          screen: string
          value: boolean | { path: string; value: string | string[] }
        }
      | undefined,
  ): string | undefined => {
    if (!forceSubmit) {
      return undefined
    }

    if (forceSubmit.value === true) {
      return forceSubmit.screen
    }
    if (typeof forceSubmit.value === 'object') {
      let value = _.get(formData, forceSubmit.value.path)
      let compareValue = forceSubmit.value.value
      if (!Array.isArray(compareValue)) {
        if (value == forceSubmit.value.value) {
          return forceSubmit.screen
        }
      } else {
        if (compareValue.includes(value)) {
          return forceSubmit.screen
        }
      }
    }
    return ''
  }

  //displays subheader for forms that can be excluded
  renderOptionalFormSubheader = (isWizard: boolean = false): JSX.Element => {
    if (isWizard) {
      return <></>
    }
    const currentStep = this.state.currentStep

    if (currentStep.excluded === true) {
      return (
        <div className="step-exclude-directions">
          This form is currently not included in the submission.
          <button
            className="btn btn-link"
            onClick={() => this.toggleExcludeStep(currentStep.id, false)}
          >
            INCLUDE
          </button>
        </div>
      )
    } else if (currentStep.excluded === false) {
      return (
        <div className="step-exclude-directions">
          This form is currently included in the submission. Enter some data if
          you have it, or click "Skip".
          <button
            className="btn btn-link"
            onClick={() =>
              this.showExcludeStateWarningModal(this.state.currentStep.id)
            }
          >
            SKIP
          </button>
        </div>
      )
    }
    return <></>
  }

  renderHelpToggle = (
    currentStep: Step,
    showHelp: boolean,
    callbackFn: Function,
  ): JSX.Element => {
    if (currentStep.static || currentStep.final) {
      return <></>
    }
    return (
      <>
        <label className="pull-right toggle-help-label">
          <span>Hide help</span>
          <Switch
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={45}
            className="toggle-help"
            offColor="#ccc"
            onChange={() => callbackFn()}
            checked={showHelp}
          />
          <span>Show help</span>
        </label>
      </>
    )
  }

  runCustomValidation = async (
    formData: IFormData,
    currentStep: Step,
    allSteps: Step[],
  ): Promise<AjvError[]> => {
    const errors: AjvError[] = []

    //default - running on current step
    let rules = currentStep.validationRules || []
    let data = {
      [currentStep.id]: formData[currentStep.id],
    }

    // for final step -- concatenate all rules and run on all data
    if (currentStep.final) {
      rules = allSteps.reduce((acc: any, value: Step) => {
        return value.validationRules && value.validationRules.length > 0
          ? acc.concat(value.validationRules)
          : acc
      }, [])
      data = _.cloneDeep(formData)
    }

    if (rules.length === 0) {
      return []
    }

    //this is a workaround for inability to define a rule to run on all members of the data array
    // we define the generic rule with path e.g."path": ".experiments[*].dose_range.dose_range_min",
    const allRules: any[] = []
    rules.forEach(rule => {
      //take a rule

      const paramProp = rule.event.params.property
      // if it's just a normal rule - add it
      if (paramProp.indexOf('[*]') === -1) {
        allRules.push(rule)
      } else {
        const path = paramProp.split('[*]')[0].substring(1)
        const data = _.get(formData, path)
        console.log(data)
        // generate a rule for each item in the data array by substituting [*] w/ appropriate index
        if (Array.isArray(data) && typeof data !== 'string') {
          for (let i = 0; i < data.length; i++) {
            const newRule = JSON.parse(
              JSON.stringify(rule).replace(/\[\*\]/g, `[${i}]`),
            )
            allRules.push(newRule)
          }
        } else {
          allRules.push(rule)
        }
      }
    })

    const engine = new Engine()
    //this operator checks if any properties match value
    engine.addOperator('notHasChecked', (factValue: any, value: any) => {
      if (!factValue) {
        return true
      }
      const vals = Object.values(factValue).filter(fv => fv === value)
      return vals.length === 0
    })

    engine.addOperator('minPropsLength', (factValue: any, value: any) => {
      if (!factValue) {
        return true
      }
      const vals = Object.values(factValue)
      return vals.length < value
    })

    engine.addOperator('symptomsDates', (factValue: any, value: any) => {
      if (!factValue) {
        return true
      }
      const datesArray = [
        factValue.symptoms_start.symptoms_start_date,
        factValue.symptoms_worst?.symptoms_worst_date,
        factValue.symptoms_recovery?.symptoms_recovery_date,
        factValue.symptoms_none?.symptoms_none_date,
      ]
      const err1 =
        factValue.symptoms_start?.symptoms_start_date &&
        _.min(datesArray) < factValue.symptoms_start?.symptoms_start_date
      const err2 =
        factValue.symptoms_none?.symptoms_none_date &&
        _.max(datesArray) > factValue.symptoms_none?.symptoms_none_date
      const err3 =
        factValue.symptoms_worst?.symptoms_worst_date &&
        factValue.symptoms_recovery?.symptoms_recovery_date &&
        factValue.symptoms_recovery?.symptoms_recovery_date <
          factValue.symptoms_worst?.symptoms_worst_date

      return err1 || err2 || err3
    })

    engine.addOperator('range', (factValue: any, value: number[]) => {
      if (!factValue) {
        return
      }
      if (isNaN(factValue)) {
        return true
      } else {
        const val = Number(factValue)

        return val < value[0] || val > value[1]
      }
    })

    allRules.forEach(rule => {
      engine.addRule(rule)
    })

    try {
      const result: RulesResult = await engine.run(data)
      const validationEvents = result.events as IRulesValidationEvent[]
      console.log(result)
      validationEvents.forEach(event => {
        const msg =
          event.params.name === 'range'
            ? i18next.t('surveys.errors.between', {
                min: event.params.value[0],
                max: event.params.value[1],
              })
            : event.params.message
        const err: AjvError = {
          ...event.params,
          message: msg,
          ...{
            params: {},
            stack: `${event.params.property} ${msg}`,
          },
        }
        errors.push(err)
      })
    } catch (error) {
      console.log(error)
    }

    return errors
  }

  transformErrors = (errors: AjvError[]): AjvError[] => {
    // if we are not in wizard mode and not trying to submit or validate we just want to skip
    // over the errors and just set the step status
    // https://github.com/rjsf-team/react-jsonschema-form/issues/1263
    this.extraErrors.forEach(extraError => {
      if (!errors.find(error => error.stack === extraError.stack)) {
        errors.push(extraError)
      }
    })
    errors.forEach(error => {
      if (error.name === 'minItems') {
        error.message = i18next.t('surveys.errors.required')
      }
    })

    if (
      this.navAction !== NavActionEnum.SUBMIT &&
      this.navAction !== NavActionEnum.VALIDATE &&
      (!this.props.isWizardMode || this.state.currentStep.final)
    ) {
      const currentStep = {
        ...this.state.currentStep,
      }
      if (errors.length > 0) {
        currentStep.state = StepStateEnum.ERROR
      } else {
        currentStep.state = StepStateEnum.COMPLETED
      }

      this.setState({ currentStep })

      return []
    }

    // there is an odd behavior in the lib that in cases when we have additional fields depending on enum
    // value if it's required and not entered we get 3 error: enum, required, and oneOf
    // so if there is an error Oneof on a parent - ignore it and enum on a child. and just output 'required'
    // if there is an enum error and there is required with the same prefix remove it

    const reqErrors = errors.filter(error => error.name === 'required')
    reqErrors.forEach(error => {
      const parentPath = error.property.substring(
        0,
        error.property.lastIndexOf('.'),
      )

      _.remove(errors, (error: AjvError) => {
        //trying to get around the cryptic error with required dependent fields
        return (
          (error.property.indexOf(parentPath) > -1 ||
            parentPath.indexOf(error.property) > -1) &&
          (error.name === 'enum' || error.name === 'oneOf')
        )
      })
    })
    _.remove(errors, (error: AjvError) => {
      return error.name === 'oneOf'
    })
    return errors.map(error => {
      switch (error.name) {
        case 'required': {
          error.message = i18next.t('surveys.errors.required')
          break
        }
        case 'maximum': {
          error.message = i18next.t('surveys.errors.maximum', {
            value: error.params.limit,
          })
          break
        }
        case 'minimum': {
          error.message = i18next.t('surveys.errors.minimum', {
            value: error.params.limit,
          })
          break
        }
        case 'sequence': {
          error.message = i18next.t('surveys.errors.symptomSequence')
          break
        }
      }

      return error
    })
  }

  renderErrorListTemplate = (props: ErrorListProps) => {
    const { errors } = props
    const currentLis = errors
      .map((error, i) => {
        return renderTransformedErrorObject(
          this.state.steps,
          error,
          this.uiSchema,
          i,
          this.props.schema,
        )
      })
      .sort((a, b) => a.order - b.order)
      .map(li => li.element)

    return (
      <div className="form-error-summary">
        <ul className="error-detail">{currentLis}</ul>
      </div>
    )
  }

  render() {
    return (
      <div className={`outter-wrap ${this.props.cardClass}`}>
        {!this.props.extraUIProps?.isNoBackBar && (
          <div>
            <FloatingToolbar
              closeLinkDestination="/dashboard"
              closeIcon={faAngleLeft}
              closeLinkText={i18next.t('footer.dashboard')}
              closeConfirmationText={i18next.t('surveys.exitSurvey')}
              closeConfirmationText2={i18next.t('surveys.dataNotSaved')}
            />
          </div>
        )}
        <Prompt
          when={this.state.hasUnsavedChanges}
          message={this.unsavedDataWarning}
        />
        <Header
          isSubmitted={this.state.isSubmitted}
          bodyText={this.state.currentStep.description}
          title={this.state.currentStep.title}
        ></Header>
        <Card>
          <div className="inner-wrap">
            {!this.props.extraUIProps?.isLeftNavHidden && (
              <StepsSideNav
                stepList={this.state.steps}
                isWizardMode={this.props.isWizardMode}
                onStepChange={this.triggerStepChange}
              ></StepsSideNav>
            )}
            {this.state.isLoadingSaved && (
              <div className="text-center">
                <CircularProgress color="primary" />
              </div>
            )}
            <div className="form-wrap">
              {this.props.children}
              <div className="text-right paging">
                {this.state.currentStep.orderDisplay}
              </div>
              {/*} <div className="form-title">{this.state.currentStep.title}</div>*/}
              {this.renderNotification(this.props.callbackStatus)}
              <div
                className={`right-top-actions ${
                  this.state.isSubmitted ? 'hide' : ''
                }`}
              >
                {!this.state.currentStep.static &&
                !this.props.extraUIProps?.isHelpHidden ? (
                  <button
                    type="button"
                    className="btn btn-action save pull-right"
                    onClick={() => this.triggerAction(NavActionEnum.VALIDATE)}
                  >
                    VALIDATE
                  </button>
                ) : (
                  <></>
                )}
                {!this.props.extraUIProps?.isHelpHidden ? (
                  this.renderHelpToggle(
                    this.state.currentStep,
                    this.state.doShowHelp,
                    () =>
                      this.setState({
                        doShowHelp: !this.state.doShowHelp,
                      }),
                  )
                ) : (
                  <></>
                )}
                {this.isSubmitScreen() &&
                  !this.props.extraUIProps?.isNoSaveButton && (
                    <button
                      type="button"
                      className="btn btn-action save pull-right"
                      disabled={this.state.isSubmitted}
                      onClick={() => this.triggerAction(NavActionEnum.SUBMIT)}
                    >
                      SUBMIT
                    </button>
                  )}
              </div>
              {this.renderOptionalFormSubheader(this.props.isWizardMode)}
              <div
                className={
                  this.isSubmitScreen() || this.state.currentStep.static
                    ? 'hide-form-only'
                    : 'wrap'
                }
              >
                {this.state.hasValidated && (
                  <div className="notification-area">
                    Great! All required data on this form has been entered.
                  </div>
                )}
                <div
                  ref={this.formDivRef}
                  className={`scroll-area ${
                    this.state.currentStep.excluded ? 'disabled' : ' '
                  } `}
                >
                  <Form
                    widgets={widgets}
                    className={
                      this.state.doShowHelp
                        ? 'submissionInputForm'
                        : 'submissionInputForm no-help'
                    }
                    fields={fields}
                    liveValidate={false}
                    formData={this.state.formData}
                    schema={this.getSchema(this.state.currentStep)}
                    uiSchema={this.uiSchema}
                    onSubmit={this.onSubmit}
                    onChange={args => this.handleOnChange(args)}
                    onError={args =>
                      this.onError({
                        props: args,
                        form: this.formRef,
                      })
                    }
                    showErrorList={
                      !!this.state.doShowErrors || !!this.props.isWizardMode
                    }
                    ErrorList={this.renderErrorListTemplate}
                    transformErrors={this.transformErrors}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    ref={this.formRef}
                    disabled={
                      this.state.currentStep.excluded || this.state.isSubmitted
                    }
                  >
                    <div style={{ display: 'none' }}>
                      <button type="submit"></button>
                    </div>
                  </Form>
                  {this.renderTextForStaticScreen()}
                  {this.state.doShowErrors && (
                    <div
                      className="error padded-panel pull-right"
                      style={{ margin: '1rem 0 2rem 0' }}
                    >
                      {i18next.t('surveys.responsesRequired')}
                    </div>
                  )}
                  {!this.props.isWizardMode && (
                    <NextStepLink
                      steps={this.state.steps}
                      nextStepId={this.state.currentStep.default}
                      onNavAction={(step: Step) => this.triggerStepChange(step)}
                    ></NextStepLink>
                  )}
                </div>
              </div>

              {this.isSubmitScreen() && (
                <SummaryTable
                  formData={this.state.formData}
                  steps={this.state.steps}
                  callbackFn={(screenId: string) =>
                    this.showExcludeStateWarningModal(screenId, true)
                  }
                  uiSchema={this.props.uiSchema}
                  schema={this.props.schema}
                ></SummaryTable>
              )}

              <NavButtons
                submitStep={this.getForceSubmitScreen(
                  this.state.formData,
                  this.state.formData.metadata.forceSubmit,
                )}
                currentStep={this.state.currentStep}
                steps={this.state.steps}
                previousStepIds={this.state.previousStepIds}
                isFormSubmitted={this.state.isSubmitted}
                isFormSubmitting={this.state.isSubmitting}
                isNoSaveButton={this.props.extraUIProps?.isNoSaveButton}
                onNavAction={(e: NavActionEnum) => this.triggerAction(e)}
              ></NavButtons>
            </div>
          </div>
        </Card>
        {this.state.modalContext && (
          <WarningModal
            show={true}
            title={this.excludeWarningHeader}
            copy={this.excludeWarningText}
            className={`theme-${this.props.formClass}`}
            callbackArgs={this.state.modalContext.arguments}
            onCancel={() => this.setState({ modalContext: undefined })}
            onOK={(stepId: string, isExclude: boolean) =>
              this.toggleExcludeStep(stepId, isExclude)
            }
          ></WarningModal>
        )}
        <DataDebug
          formData={this.state.formData}
          hidden={this.isDebugHidden}
        ></DataDebug>
      </div>
    )
  }
}

// takes in a single validation error and  and displays it in more readable manner
// used by renderErrorListTemplate
function renderTransformedErrorObject(
  steps: Step[],
  error: AjvError,
  uiSchema: UiSchema,
  i: number,
  schema: any,
): { order: number; element: JSX.Element } {
  const propPath = _.trimStart(error.property, '.')
  const propArr = propPath.split('.')

  // some things require labels in schema (e.g. checkboxes) so this is preferred
  const labelFromSchema = `${propArr.join('.properties.')}.title`
  //can be overriden by label in UI
  const labelFromUi = `${propPath}.ui:title`
  //for array fields we need to change the property e.g.
  //  ld50.experiments[0].species_other should look like 'ld50.experiments.items.species_other'
  const arrayLabelFromSchema = labelFromSchema.replace(/\[.*?\]/, '.items')
  const arrayLabelFromUI = labelFromUi.replace(/\[.*?\]/, '.items')
  const indexMatch = labelFromSchema.match(/\[.*?\]/)

  let index = _.first(indexMatch)

  if (index) {
    index = index.substring(1, index.length - 1)
    index = !isNaN(parseInt(index)) ? ` [${parseInt(index) + 1}]` : ''
  }

  const label =
    _.get(uiSchema, labelFromUi) ||
    _.get(schema.properties, labelFromSchema) ||
    _.get(uiSchema, arrayLabelFromUI) ||
    _.get(schema.properties, arrayLabelFromSchema) ||
    error.property

  const screen = _.find(steps, { id: propArr[0] }) || {
    title: propArr[0],
    order: 0,
  }
  const element = (
    <li key={i} className="">
      <div>
        {screen.title && (
          <strong>
            {screen.title}
            {index}:
          </strong>
        )}
        <span className="error-label">{label}</span>&nbsp; {error.message}
      </div>
    </li>
  )
  return { order: screen.order, element }
}

//recursively sets property value to dangerouslySetInnerHTML of that value
function stringToElementForProp(srcObject: any, key: string): object {
  _.keys(srcObject).some(k => {
    if (k === key) {
      const value = srcObject[k]
      srcObject[k] = <span dangerouslySetInnerHTML={{ __html: value }}></span>

      return srcObject
    }
    if (srcObject[k] && typeof srcObject[k] === 'object') {
      stringToElementForProp(srcObject[k], key)
    }
  })
  return srcObject
}
