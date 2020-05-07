import { UiSchema } from 'react-jsonschema-form'
import { FormSchema } from '../components/surveys/synapse_form_wrapper/types'

import demographic_FormSchema from './demographic_formSchema.json'
import demographic_UiSchema from './demographic_uiSchema.json'
import demographic_NavSchema from './demographic_navSchema.json'
import contact_FormSchema from './contact_formSchema.json'
import contact_UiSchema from './contact_uiSchema.json'
import contact_NavSchema from './contact_navSchema.json'
import covid_FormSchema from './covid_formSchema.json'
import covid_UiSchema from './covid_uiSchema.json'
import covid_NavSchema from './covid_navSchema.json'
import healthHistory_FormSchema from './healthHistory_formSchema.json'
import healthHistory_UiSchema from './healthHistory_uiSchema.json'
import healthHistory_NavSchema from './healthHistory_navSchema.json'
import covid2_FormSchema from './covid2_formSchema.json'
import covid2_UiSchema from './covid2_uiSchema.json'
import covid2_NavSchema from './covid2_navSchema.json'
import { SurveyConfigObject } from '../types/types'

export type SurveyConfigData = {
  formSchema: FormSchema
  uiSchema: UiSchema
  navSchema: any[]
}

export const SURVEYS: SurveyConfigObject = {
  CONTACT: {
    formSchema: contact_FormSchema,
    uiSchema: contact_UiSchema,
    navSchema: contact_NavSchema,
  },
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
    formSchema: healthHistory_FormSchema,
    uiSchema: healthHistory_UiSchema,
    navSchema: healthHistory_NavSchema,
  },
  MORE: {
    formSchema: covid2_FormSchema,
    uiSchema: covid2_UiSchema,
    navSchema: covid2_NavSchema,
  },
}
