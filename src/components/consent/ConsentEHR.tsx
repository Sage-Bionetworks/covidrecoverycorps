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
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import Button from '@material-ui/core/Button/Button'
import { Typography } from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import { Nav } from '../Nav'
import { SizeMe } from 'react-sizeme'

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
        <h2>
          Please understand the benefits &amp; risks of sharing your electronic
          health records{' '}
        </h2>
        <p>
          HIPAA stands for Health Insurance Portability and Accountablity Act of
          1996, a federal law to protect your health information from being
          disclosed without your consent or knowledge. The following sections
          will outline the benefits and risks. Please take your time to go over
          it.{' '}
        </p>
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
        <h2> HIPAA Authorization</h2>
        <p>
          This form tells about giving NY Strong access to your EHR (electronic
          health records). We will only be able to access your EHR if you sign
          this form. Health records are the data collected when you get
          healthcare. Electronic health records, or EHR, are when these data are
          kept in secure electronic systems. Please read this form carefully.
          Take all the time you need to decide if you would like to give us
          access to your EHR. Ask any questions you have. You can say yes or no
          to signing this form. Your choice will not affect your medical care.
          You can still be part of <p>NY Strong</p> study if you say no.{' '}
        </p>
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
              <Typography variant="h2">
                Do you want to share your electronic health records with us?{' '}
              </Typography>
              <p>Sharing your EHR (electronic health records) is optional </p>
              <div
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
