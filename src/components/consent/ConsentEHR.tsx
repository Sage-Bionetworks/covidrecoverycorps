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
import { Typography } from '@material-ui/core'
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
  const [isConsentEHRDone, setIsConsentEHRDone] = useState<boolean>(false)
  const [isHIPAConsented, setIsHIPAConsented] = useState<boolean | undefined>(
    undefined
  )
  const [isLearnMore, setIsLearnMore] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  if (isConsentEHRDone) {
    return <Redirect to="Dashboard"></Redirect>
  }

  const renderStep1 = () => {
    const element = (
      <>
       <ConsentCopy stepInfo={{step: 1, isSummary: false}} isEHR={true}/>
        <Button
          type="button"
          disabled={isHIPAConsented === undefined}
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

  const renderStep2 = () => {
    const element = (
      <>
            <ConsentCopy stepInfo={{step: 2, isSummary: false}} isEHR={true}/>
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

  return (
    <SizeMe>
      {({ size }) => (
        <div className="ConsentEHR">
          {currentStep === 0 && (
            <>
                  <ConsentCopy stepInfo={{step: 3, isSummary: false}} isEHR={true}/> <div
                style={{
                  display: isLearnMore ? 'flex' : 'none',
                  borderBottom: '1px solid #ddd',

                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <p>
                  some text about learning
                  <br /> more about <br />
                  reserch sharing
                </p>
                <Button
                  style={{ float: 'right' }}
                  onClick={() => setIsLearnMore(false)}
                >
                  <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
                </Button>
              </div>
              <div
                style={{
                  display: isLearnMore ? 'none' : 'block',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Review what it means
                <Button
                  style={{ float: 'right' }}
                  onClick={() => setIsLearnMore(true)}
                >
                  <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                </Button>
              </div>

              <ToggleButtonGroup
                value={isHIPAConsented}
                exclusive
                className="verticalToggle"
                style={{ marginTop: '20px', marginBottom: '20px' }}
                onChange={(_event: any, val: boolean) =>
                  setIsHIPAConsented(val)
                }
                aria-label="are you over 18"
              >
                ><ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>

              <Button
                type="button"
                disabled={isHIPAConsented === undefined}
                variant="contained"
                color="primary"
                onClick={() => {
                  isHIPAConsented
                    ? setCurrentStep((_prev) => _prev + 1)
                    : setIsConsentEHRDone(true)
                }}
              >
                Submit
              </Button>
            </>
          )}
          {currentStep == 1 && (
            <>
              <Nav width={size.width}>HIPPA Authorization</Nav>
              {renderStep1()}
            </>
          )}
          {currentStep == 2 && renderStep2()}

          {currentStep == 3 && 
        
            <Button onClick={()=> setIsConsentEHRDone(true)}> WILL NEED TO FINISH IT. REDIRECT TO DASHBOARD</Button>
          }
       
        </div>
      )}
    </SizeMe>
  )
}

export default ConsentEHR
