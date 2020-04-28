
import {

    UiSchema,
    
  } from 'react-jsonschema-form'
  import {FormSchema} from '../synapse_form_wrapper/types'


import jsonFormSchema from './formSchema.json'
import jsonUiSchema from './uiSchema.json'
import jsonNavSchema from './navSchema.json'


export type SurveyConfigData = {
    formSchema: FormSchema
    uiSchema: UiSchema
    navSchema:  any[]


}

export type SurveyType = 'DEMOGRAPHIC'| 'COVID_EXPERIENCE'


export const SURVEYS = {
    DEMOGRAPHIC: {
        formSchema: jsonFormSchema,
        uiSchema: jsonUiSchema ,
        navSchema: jsonNavSchema,
    },
    COVID_EXPERIENCE: {
        formSchema: jsonFormSchema,
        uiSchema: jsonUiSchema ,
        navSchema: jsonNavSchema,
    }

}