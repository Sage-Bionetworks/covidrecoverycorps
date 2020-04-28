import * as React from 'react'

import * as _ from 'lodash'

import $RefParser from 'json-schema-ref-parser'
import { includes, cloneDeep } from 'lodash-es'
import './style.scss'

import Alert from 'react-bootstrap/Alert'
import { UiSchema } from 'react-jsonschema-form'
import SynapseForm from 'synapse-react-client/dist/containers/synapse_form_wrapper/SynapseForm'
import { StatusEnum } from 'synapse-react-client/dist/containers/synapse_form_wrapper/types'
import jsonFormSchema from './data/formSchema.json'
import jsonUiSchema from './data/uiSchema.json'
import jsonNavSchema from './data/navSchema.json'
import {RegistrationData, ENDPOINT, STUDY_ID} from './types'
import Grid from '@material-ui/core/Grid/Grid'





export type SurveyWrapperProps = {
  formTitle: string //for UI customization
  formClass?: string // to support potential theaming
}

type SurveyWrapperState = {
  notification?: Notification
  isLoading?: boolean
  formDataId?: string // file holding user form data
  formData?: any // form data that prepopulates the form
  formSchema?: any // schema that drives the form
  formUiSchema?: UiSchema // ui schema that directs how to render the form elements
  formNavSchema?: any // drives the steps left panel

  status?: StatusEnum
}

type Error = {
  name?: string
  message?: string
}

interface Notification extends Error {
  type: StatusEnum
}

export default class SurveyWrapper extends React.Component<
  SurveyWrapperProps,
  SurveyWrapperState
> {
  constructor(props: SurveyWrapperProps) {
    super(props)
    this.state = {
      isLoading: true,
  
    }
  }

  async componentDidMount() {
    await this.getData()
  }


  getData = async (): Promise<void> => {
    try {
      const jsonFormSchemaDeref = (await $RefParser.dereference(
        JSON.parse(JSON.stringify(jsonFormSchema)),
      )) as JSON

      //if we are creating a new file - store the versions
  
      this.setState({
        formData: {metadata: {}},
        formSchema: jsonFormSchemaDeref,
        formUiSchema: jsonUiSchema,
        formNavSchema: jsonNavSchema,
        isLoading: false,
      })
    } catch (error) {
      this.onError({ message: error })
    } finally {
      this.setState({
        isLoading: false,
      })
    }
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
  }



///v4/users/self/reports/{identifier}
//Save a participant report record

submitSurvey = async (contact: any, otherInfo: any) => {


  const postData: RegistrationData = { ...contact, clientData: otherInfo, dataGroups: ['test_user'] }

  const response = await fetch(`${ENDPOINT}auth/signUp`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
     // body data type must match "Content-Type" header
  });
  return response
}



  submitForm = async (data: any): Promise<void> => {
    this.setState({
      isLoading: true,
    })
    const { contact, ...otherInfo } = data
    contact.study = STUDY_ID
    contact.phone = {
      number: contact.phone,
      regionCode: 'US',
    }


  if (!contact.phone.number) {
    delete contact.phone
  } else {
    delete contact.email
  }
    try {
   // await(this.submitConsent(contact, otherInfo))
     await(this.submitSurvey(contact, otherInfo))
    }
    catch(error)  {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.onError({name: "registration error", message:  error.response.data.message})
          console.log(error.response.data)
        } else {
          this.onError({name: "registration error", message:  error})
        }
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
          <span className={'spinner'} />
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
          <Alert.Heading>Error</Alert.Heading>

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
    return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={10} md={8} lg={6}>
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
                callbackStatus={this.state.status}
                onSave={() => null}
                onSubmit={(data: any) => this.submitForm(this.cleanData(data))}
                isSubmitted={false}
              ></SynapseForm>
            </div>
          )}
          {this.state.status === StatusEnum.SUBMIT_SUCCESS && (
            <div>
              {' '}
              You have registered succesfully. You will need to verify your
              email before you can log in{' '}
            </div>
          )}
        </div>
      </div>
      </Grid>
      </Grid>
    )
  }
}
