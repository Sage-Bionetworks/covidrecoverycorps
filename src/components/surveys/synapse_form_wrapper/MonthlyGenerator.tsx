import * as React from 'react'
import DataDebug from './DataDebug'

export type MonthlyGeneratorProps = {}

const pageId="symptoms2"

const questionPage = {
  [pageId]: {
    "type": "object",

  properties: {
    symptoms_list: {
      type: 'object',
      title: '',
      properties: {},
      dependencies: {},
    },
  }
}
}

var page1QuestionsArray = [
  'Fatigue (tired, lack of energy)',
  'Difficulty concentrating or focusing (brain fog)',

	'Headaches or migraines',

  'Confusion',
  'Memory problems',
  'Dizziness / Light-headedness',
  'Mood changes like feeling sad or anxious',
  'Hallucinations',
  'Seizures']


  var page2QuestionsArray = [

  'Shortness of breath or difficulty breathing at rest',
  'Winded or short of breath with exercise',
  'Cough',
'Chest pain or pressure',
'Fast or irregular heart beat',
'Abdominal pain',
'Diarrhea',
'Nausea / Vomiting']



var page3QuestionsArray = [

  'Muscle pain, cramps, or body aches',
  'Tremors or shakiness',
  'Numbness or tingling of feet and hands',
  'COVID toes (discoloration and swelling)',
  'Change in (or loss of) sense of smell',
  'Change in (or loss of) sense of taste',
  'Ringing or humming in ears (tinnitus)',
  'Blurry vision',
  'Dental Issues']


  var page4QuestionsArray = [
 
    'Hair loss',
    'Rash',
    'Weight loss',
    'Weight gain',
    'Difficulty falling or staying asleep (insomnia)',
    'Sleeping more than normal',
    'Night sweats',
    'Fever or chills'
]


const quesitonDependencies = {
  oneOf: [
    {
      properties: {
        _REPLACE_: {
          enum: [false],
        },
      },
    },
    {
      properties: {
        _REPLACE_: {
          enum: [true],
        },
        _REPLACE__detail: {
          $ref: '#/definitions/symptomDetail',
        },
      },
    },
  ],
}

const subDetailUI = {
  how_often: {
  },
  how_much_bothers: {
    'ui:widget': 'RadioRangeWidget',
    classNames: 'radiorange',
    'ui:options': {
      inline: true,
      minLabel: 'Very little',
      maxLabel: 'Very much',
    },
  },
  how_has_changed: {
    'ui:widget': 'RadioRangeWidget',
    classNames: 'radiorange',
    'ui:options': {
      inline: true,
      minLabel: 'Much worse',
      maxLabel: 'Much better',
    },
  },
}
const pageUISchema = {
  [pageId]: {
    classNames: 'symptoms',
    symptoms_list: {
      'ui:order': [],
      // "ui:exclusive": ["no_symptoms", "prefer_not_answer"],
      'ui:dependent_option_postfix': ['_detail'],
      'ui:widget': 'checkboxes',
      'ui:options': {
        inline: false,
      },
 
    },
  },
}




export default function MonthlyGenerator(props: MonthlyGeneratorProps) {
  const makeName = (name: string) => {
    const result = name
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\,/g, '')
      .replace(/\//g, '_')
      .replace(/partial_or_complete_loss_of_or_/g, '')
      .replace(/change_in_or_loss/g, 'change_in')
      
    if (result.length > 25) {
      const result2 = result.substring(0, 25)
      if (result2[result2.length - 1] === '_') {
        return result2.substring(0, result2.length - 1)
      } else {
        return result2
      }
    }
    return result
  }

  const pageQuestionsArray = page3QuestionsArray

  for (const c of pageQuestionsArray) {
    //@ts-ignore
    questionPage[pageId].properties.symptoms_list.properties[makeName(c)] = {
      type: 'boolean',
      title: c,
    }
  }

  for (const c of pageQuestionsArray) {
    const quesitonDependenciesString = JSON.stringify(quesitonDependencies).replace(/_REPLACE_/g, makeName(c))
    //@ts-ignore
    questionPage[pageId].properties.symptoms_list.dependencies[makeName(c)] = JSON.parse(quesitonDependenciesString)
  }

  console.log('----------DOING pageUISchema--------')

  for (const c of pageQuestionsArray) {
    //@ts-ignore
    pageUISchema[pageId].symptoms_list['ui:order'].push(makeName(c))
    //@ts-ignore
    pageUISchema[pageId].symptoms_list['ui:order'].push(`${makeName(c)}_detail`)
    //@ts-ignore
    pageUISchema[pageId].symptoms_list[`${makeName(c)}_detail`] = { ...subDetailUI }
  }

  console.log('questionPage', questionPage)
  console.log('pageUISchema', pageUISchema)

  return <div style={{marginTop: '40px'}} >
    <h3>Form Data</h3>
    <DataDebug hidden={false} formData={questionPage}></DataDebug>
    <h3>UI Data</h3>
    <DataDebug hidden={false} formData={pageUISchema}></DataDebug>
    </div>
}
