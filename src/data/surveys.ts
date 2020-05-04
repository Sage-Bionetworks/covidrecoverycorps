import { UiSchema } from 'react-jsonschema-form'
import { FormSchema } from '../components/surveys/synapse_form_wrapper/types'

import demographic_FormSchema from './demographic_formSchema.json'
import demographic_UiSchema from './demographic_uiSchema.json'
import demographic_NavSchema from './demographic_navSchema.json'
import covid_FormSchema from './covid_formSchema.json'
import covid_UiSchema from './covid_uiSchema.json'
import covid_NavSchema from './covid_navSchema.json'
import { SurveyConfigObject } from '../types/types'

export type SurveyConfigData = {
  formSchema: FormSchema
  uiSchema: UiSchema
  navSchema: any[]
}

export const SURVEYS: SurveyConfigObject = {
  DEMOGRAPHIC: {
    formSchema: demographic_FormSchema,
    uiSchema: demographic_UiSchema,
    navSchema: demographic_NavSchema,
  },
  COVID_EXPERIENCE: {
    formSchema: covid_FormSchema,
    uiSchema: covid_UiSchema,
    navSchema: covid_NavSchema,
  },
  HISTORY: {
    formSchema: covid_FormSchema,
    uiSchema: covid_UiSchema,
    navSchema: covid_NavSchema,
  },
  MORE: {
    formSchema: covid_FormSchema,
    uiSchema: covid_UiSchema,
    navSchema: covid_NavSchema,
  },
}
