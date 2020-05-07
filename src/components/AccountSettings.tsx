import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup'
import { blue } from '@material-ui/core/colors';
import { Button, Icon, withStyles } from '@material-ui/core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FloatingToolbar from './widgets/FloatingToolbar';
import LearnMore from './widgets/LearnMore';

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
      <div>
          <FloatingToolbar closeLinkDestination='/dashboard' closeIcon={faAngleLeft}>Account Settings</FloatingToolbar>
      </div>
      <FormGroup style={{ marginTop: '4rem' }}>
        <FormControlLabel
          control={<BlueSwitch checked={isConsented} color="primary" onChange={handleConsentChange} name='checkConsent' />}
          label='Share my study data with qualified researchers for future COVID related work'
        />
        <LearnMore learnMoreText='Learn more'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan accumsan vehicula. Donec porttitor ullamcorper dolor at accumsan. Pellentesque id libero blandit, porttitor lectus elementum, rutrum risus. Vivamus at malesuada mi. Suspendisse potenti. Phasellus eget enim porttitor, sagittis massa ac, semper lorem. Integer tortor tortor, volutpat id eros a, mattis tincidunt nisl. Praesent efficitur leo quis ornare mattis.
          </p>
        </LearnMore>
        <FormControlLabel
          control={<BlueSwitch checked={isEhrConsented} color='primary' onChange={handleEhrConsentChange} name='checkEhrConsent' />}
          label='Share my electronic health records'
        />
        <LearnMore learnMoreText='Learn more'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan accumsan vehicula. Donec porttitor ullamcorper dolor at accumsan. Pellentesque id libero blandit, porttitor lectus elementum, rutrum risus. Vivamus at malesuada mi. Suspendisse potenti. Phasellus eget enim porttitor, sagittis massa ac, semper lorem. Integer tortor tortor, volutpat id eros a, mattis tincidunt nisl. Praesent efficitur leo quis ornare mattis.
          </p>
        </LearnMore>
      </FormGroup>
      <Button
        style={{width: '100%', marginTop: '2rem'}}
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
