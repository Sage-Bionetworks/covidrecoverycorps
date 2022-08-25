import { UiSchema } from 'react-jsonschema-form'
import { FormSchema } from '../components/surveys/synapse_form_wrapper/types'
import i18n from '../i18n'
import { SurveyConfigObject } from '../types/types'

export type SurveyConfigData = {
  formSchema: FormSchema
  uiSchema: UiSchema
  navSchema: any[]
}

const postfix = i18n.language === 'es' ? '_es' : ''

export const SURVEYS: SurveyConfigObject = {
  CONTACT: {
    formSchema: async () => await import(`./contact_formSchema${postfix}.json`),
    uiSchema: async () => await import(`./contact_uiSchema${postfix}.json`),
    navSchema: async () => await import(`./contact_navSchema${postfix}.json`),
  },
  DEMOGRAPHIC: {
    formSchema: async () =>
      await import(`./demographic_formSchema${postfix}.json`),
    uiSchema: async () => await import(`./demographic_uiSchema.json`),
    navSchema: async () =>
      await import(`./demographic_navSchema${postfix}.json`),
  },
  COVID_EXPERIENCE: {
    formSchema: async () => await import(`./covid_formSchema${postfix}.json`),
    uiSchema: async () => await import(`./covid_uiSchema${postfix}.json`),
    navSchema: async () => await import(`./covid_navSchema${postfix}.json`),
  },
  HISTORY: {
    formSchema: async () =>
      await import(`./healthHistory_formSchema${postfix}.json`),
    uiSchema: async () =>
      await import(`./healthHistory_uiSchema${postfix}.json`),
    navSchema: async () =>
      await import(`./healthHistory_navSchema${postfix}.json`),
  },
  MORE: {
    formSchema: async () => await import(`./covid2_formSchema${postfix}.json`),
    uiSchema: async () => await import(`./covid2_uiSchema${postfix}.json`),
    navSchema: async () => await import(`./covid2_navSchema${postfix}.json`),
  },
  WITHDRAW: {
    formSchema: () => {},
    uiSchema: () => {},
    navSchema: () => {},
  },
  // agendel 8/20 it is not moved inot survey too. Need for backward compatibility
  TEST_LOCATION: {
    formSchema: () => {},
    uiSchema: () => {},
    navSchema: () => {},
  },
  RESULT_UPLOAD: {
    formSchema: () => {},
    uiSchema: () => {},
    navSchema: () => {},
  },

  /*POST_LAB: {
    formSchema: async () => await import(`./postLab_formSchema${postfix}.json`),
    uiSchema: async () => await import(`./postLab_uiSchema${postfix}.json`),
    navSchema: async () => await import(`./postLab_navSchema${postfix}.json`),
  },*/

  POST_LAB_MONTHLY: {
    //short survey rename to POST_LAB_MONTHLY when in use,  POST_LAB_TEST when not in use
    formSchema: async () =>
      await import(`./postLabShort_formSchema${postfix}.json`),
    uiSchema: async () =>
      await import(`./postLabShort_uiSchema${postfix}.json`),
    navSchema: async () =>
      await import(`./postLabShort_navSchema${postfix}.json`),
  },

  POST_LAB_TEST: {
    //short survey rename to POST_LAB_MONTHLY when in use POST_LAB_TEST when not in use
    // long survey
    formSchema: async () =>
      await import(`./postLabMonthly_formSchema${postfix}.json`),
    uiSchema: async () =>
      await import(`./postLabMonthly_uiSchema${postfix}.json`),
    navSchema: async () =>
      await import(`./postLabMonthly_navSchema${postfix}.json`),
  },
  RESULT_UPLOAD_MONTHLY: {
    formSchema: async () =>
      await import(`./postLabMonthly_formSchema${postfix}.json`),
    uiSchema: async () =>
      await import(`./postLabMonthly_uiSchema${postfix}.json`),
    navSchema: async () =>
      await import(`./postLabMonthly_navSchema${postfix}.json`),
  },
}
