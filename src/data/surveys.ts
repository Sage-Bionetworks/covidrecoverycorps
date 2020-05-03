
import {

    UiSchema,
    
  } from 'react-jsonschema-form'
  import {FormSchema} from '../components/surveys/synapse_form_wrapper/types'




  import jsonFormSchema from './formSchema.json'
import jsonUiSchema from './uiSchema.json'
import jsonNavSchema from './navSchema.json'
import {SurveyConfigObject} from '../types/types'

export type SurveyConfigData = {
    formSchema: FormSchema
    uiSchema: UiSchema
    navSchema:  any[]


}




export const SURVEYS: SurveyConfigObject = {
    'DEMOGRAPHIC': {
        formSchema: jsonFormSchema,
        uiSchema: jsonUiSchema ,
        navSchema: jsonNavSchema,
    },
    'COVID_EXPERIENCE': {
        formSchema: jsonFormSchema,
        uiSchema: jsonUiSchema ,
        navSchema: jsonNavSchema,
    },
    'HISTORY': {
        formSchema: jsonFormSchema,
        uiSchema: jsonUiSchema ,
        navSchema: jsonNavSchema,
    }, 'MORE': {
        formSchema: jsonFormSchema,
        uiSchema: jsonUiSchema ,
        navSchema: jsonNavSchema,
    }

}