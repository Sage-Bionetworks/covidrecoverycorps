import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import { blue } from '@material-ui/core/colors';
import { Button, Icon, withStyles } from '@material-ui/core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AcountSettingsProps = {
}

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    '&$checked': {
      color: blue[500],
    },
    '&$checked + $track': {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch)

export const AcountSettings: React.FunctionComponent<AcountSettingsProps> = ({
}: AcountSettingsProps) => {
  const [isConsented, setIsConsented] = useState<boolean | undefined>()
  const [isEhrConsented, setIsEhrConsented] = useState<boolean | undefined>()
  const [isShowingWithdrawConfirmation, setIsShowingWithdrawConfirmation] = useState<boolean | undefined>()
  
  const handleConsentChange = () => {
    alert('handleConsentChange todo')
  }
  const handleEhrConsentChange = () => {
    alert('handleEhrConsentChange todo')
  }
  const handleOnWithdrawFromStudyClick = () => {
    alert('handleOnWithdrawFromStudyClick todo')
  }
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<BlueSwitch checked={isConsented} color="primary" onChange={handleConsentChange} name='checkConsent' />}
          label='Share my study data with qualified researchers for future COVID related work'
        />
        <FormControlLabel
          control={<BlueSwitch checked={isEhrConsented} color='primary' onChange={handleEhrConsentChange} name='checkEhrConsent' />}
          label='Share my electronic health records'
        />
      </FormGroup>
      <Button
        style={{width: '100%'}}
        variant='contained'
        color='primary'
        onClick={handleOnWithdrawFromStudyClick}
      >
        Withdraw from study
        <FontAwesomeIcon style={{right:'10px', position: 'absolute'}} color={blue[500]} icon={faAngleRight} />
      </Button>
    </>
  )
}

export default AcountSettings
