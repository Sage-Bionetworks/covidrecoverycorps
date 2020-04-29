import React, { useState, ChangeEvent } from 'react'
import { faCaretUp, faFileExcel } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConsentInfo from './ConsentInfo'

import { FormControl, FormCheck, ToggleButton } from 'react-bootstrap'
import useForm from '../useForm'
import { getAge, getMomentDate, callEndpoint } from '../../helpers/utility'
import moment from 'moment'
import { ENDPOINT, SHARE_SCOPE, SUBPOP_GUID } from '../../types/types'
import { Redirect } from 'react-router'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import Button from '@material-ui/core/Button/Button'
import { Typography } from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'

export type ConsentEHRProps = {
  token: string
  setConsentEHRFn?: Function
  name: string
}

export const ConsentEHR: React.FunctionComponent<ConsentEHRProps> = ({
  token,
  setConsentEHRFn,
  name
}: ConsentEHRProps) => {

  const [isConsentEHRDone, setIsConsentEHRDone] = useState(false)
  const [isHIPAConsented, setIsHIPAConsented] = useState(false)
  

  return (
    <div className="ConsentEHR">
 
      {!isConsentEHRDone && (
<>
          <Typography variant="h1">Do you want to share your electronic health records with us? </Typography>
        <p>Sharing your EHR (electronic health records) is optional </p>
        <Button>Review what it means</Button>
        <div className="X">
            This comes from synapse
            <MarkdownSynapse ownerId="syn21985841" wikiId="602371" />
         </div>   
  
         <ToggleButtonGroup
            value={isHIPAConsented}
            exclusive
            className="verticalToggle"
            onChange={(_event: any, val: boolean) =>
              setIsHIPAConsented(val)
            }
            aria-label="are you over 18"
          >
            ><ToggleButton value={true}>Yes</ToggleButton>
            <ToggleButton value={false}>No</ToggleButton>
          </ToggleButtonGroup>
       
       </>
      )}
      {isConsentEHRDone && (
        <>
    

          <button className="btn">Next</button>
        </>
      )}
    </div>
  )
}

export default ConsentEHR
