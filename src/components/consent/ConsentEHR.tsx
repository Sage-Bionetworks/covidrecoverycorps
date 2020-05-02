import React, { useState, ChangeEvent } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretUp,
  faCaretDown,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import useForm from '../useForm'
import { getAge, getMomentDate, callEndpoint } from '../../helpers/utility'
import moment from 'moment'
import { ENDPOINT, SHARE_SCOPE_PARTNERS, SUBPOP_GUID } from '../../types/types'
import { Redirect } from 'react-router'

import Button from '@material-ui/core/Button/Button'
import { Typography, Checkbox, TextField } from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import ConsentCopy from './ConsentCopy'
import { Nav } from '../Nav'
import { SizeMe } from 'react-sizeme'
import ConsentInfo from './ConsentInfo'

export type ConsentEHRProps = {
  setConsentEHRFn?: Function
}



export const ConsentEHR: React.FunctionComponent<ConsentEHRProps> = ({
  setConsentEHRFn,
}: ConsentEHRProps) => {

  const [currentStep, setCurrentStep] = useState(0)
  const [isConsentEHRDone, setIsConsentEHRDone] = useState<boolean>(false)
  const [isHIPAAConsented, setIsHIPAAConsented] = useState<boolean | undefined>(
    undefined
  )
const[name, setName] = useState('')
 



if (isConsentEHRDone) {
  return <Redirect to="Dashboard"></Redirect>
}

const renderStep0 = () => {
  const element = (
    <>
      <ConsentCopy stepInfo={{ step: 0, isSummary: false }} isEHR={true} />
      <Button
        type="button"
 
        variant="contained"
        fullWidth
        color="primary"
        onClick={() => setCurrentStep((_prev) => _prev + 1)}
      >
        Start HIPAA
      </Button>
    </>
  )
  return element
}

const renderStep1 = () => {
  const element = (
    <>
      <ConsentCopy stepInfo={{ step: 1, isSummary: false }} isEHR={true} />
      <Button
        color="primary"
        variant="contained"
        style={{ float: 'right' }}
        onClick={() => setCurrentStep((_prev) => _prev + 1)}
      >
        &nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </>
  )
  return element
}


const handleSubmit = () => {
  
}

const change=(e: any) =>{
  const x = e;
  console.log(e.target.value)
  
}
const renderStep2 = (): JSX.Element => {

  const element = ( <div>
    <ConsentCopy screen="HIPA_LAST_INTRO"></ConsentCopy>
    <div className="Consent__inset">
      <p>I know and agree that:</p>
      <ConsentCopy screen="HIPA_LAST_TERMS"></ConsentCopy>
      Please check the box below if you agree to take part:
      <form className="Consent__form" onSubmit={()=>{/*handleOnSubmit*/}}>
     
        
        <div
          className="form-group checkbox--indented"
          style={{
           
          }}
        >
          <Checkbox
            color="primary"
            style={{ paddingTop: '3px' }}
            value={isHIPAAConsented}
            onChange={(_val, isChecked) => setIsHIPAAConsented(isChecked)}
          />
          <p>
          <ConsentCopy screen="HIPAA_LAST_CHECKBOX"></ConsentCopy>
          </p>
        </div>
        <p>{moment().format('MMMM Do, YYYY')}</p>
        <div className="form-group">
          <TextField
            label="Full Name of adult participant:"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={(e)=> setName(e.target.value)}
            value={name}
            name="fullName"
            variant="outlined"
          />
        </div>
     
        <div className="twoButtons"
        >
          <Button
            onClick={() => alert('todo')}
            variant="outlined"
            color="primary"
          >
            Disagree
          </Button>
          <Button
            type="submit"
            disabled={!name || !isHIPAAConsented}
            variant="contained"
            color="primary"
          >
            Agree
          </Button>
        </div>
      </form>
   
    </div>
  </div>)
  return element
}



return (
  <div>
    <SizeMe>
      {({ size }) => (
        <div className="Consent">
      
         
          {currentStep == 0 && (
            <>
              <Nav width={size.width}>HIPAA Authorization</Nav>
              {renderStep0()}
            </>
          )}
          {currentStep == 1 && renderStep1()}
          {currentStep == 2 && renderStep2()}
        </div>
      )}
    </SizeMe>
  </div>
)
 
}

export default ConsentEHR
