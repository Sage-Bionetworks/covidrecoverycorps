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
import ConfirmationModal from './widgets/ConfirmationModal';
import { Link, Redirect } from 'react-router-dom';
import { ConsentService } from '../services/consent.service'
import { UserService } from '../services/user.service';
import { LoggedInUserData } from '../types/types';

type AcountSettingsProps = {
  token: string
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

export const AcountSettings: React.FunctionComponent<AcountSettingsProps> = (props: AcountSettingsProps) => {
  const [isShareScopeAll, setIsShareScopeAll] = useState<boolean | undefined>()
  const [isEhrConsented, setIsEhrConsented] = useState<boolean | undefined>()
  const [isShowingWithdrawConfirmation, setIsShowingWithdrawConfirmation] = useState<boolean | undefined>(false)
  const [isRedirectingToEhr, setIsRedirectingToEhr] = useState<boolean | undefined>(false)
  
  // initialize check box values
  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        const userInfoResponse = await UserService.getUserInfo(token)
        const isCurrentlySharingAll = ConsentService.SHARE_SCOPE_ALL == userInfoResponse.data.sharingScope
        setIsShareScopeAll(_prev => isCurrentlySharingAll)
        const isEhrConsented = userInfoResponse.data.dataGroups && userInfoResponse.data.dataGroups.includes('hipaa_consented')
        setIsEhrConsented(_prev => isEhrConsented)
      }
    }
    getInfo(props.token)
    return () => {
      isSubscribed = false
    }
  }, [])
  
  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const newScope = checked ? ConsentService.SHARE_SCOPE_ALL : ConsentService.SHARE_SCOPE_PARTNERS
    ConsentService.updateMySharingScope(
      newScope,
      props.token
    ).then((participantRecord:any)=> {
      // TODO: this does not properly update the switch state for some reason.
      const isCurrentlySharingAll = ConsentService.SHARE_SCOPE_ALL == participantRecord.sharingScope
      setIsShareScopeAll(_prev => isCurrentlySharingAll)
    })
  }
  const handleEhrConsentChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      //sign
      // we need the full participant name, right?
      // ConsentService.signEhrConsent(fullName,ConsentService.SHARE_SCOPE_PARTNERS, props.token).then(()=> {
      //   setIsEhrConsented(_prev => true)
      // })
      setIsRedirectingToEhr(true)
    } else {
      //unsign
      ConsentService.withdrawEhrConsent(props.token).then(()=> {
          setIsEhrConsented(_prev => false)
        })
    }
  }
  if (isRedirectingToEhr) {
    return <Redirect to='/consentehr' />
  }

  const handleOnWithdrawFromStudyClick = () => {
    alert('handleOnWithdrawFromStudyClick todo')
    setIsShowingWithdrawConfirmation(false)
  }
  
  return (
    <>
      <div>
          <FloatingToolbar closeLinkDestination='/dashboard' closeIcon={faAngleLeft}>Account Settings</FloatingToolbar>
      </div>
      <Link to='/contactinfo'>
        <Button
          style={{width: '100%', marginTop: '4rem'}}
          variant='contained'
          color='primary'
        >
          Update contact info
          <FontAwesomeIcon style={{right:'10px', position: 'absolute'}} color={blue[500]} icon={faAngleRight} />
        </Button>
      </Link>

      <FormGroup style={{ marginTop: '4rem' }}>
        {isShareScopeAll !== undefined && (
          <>
            <FormControlLabel
              control={<BlueSwitch checked={isShareScopeAll} color="primary" onChange={handleConsentChange} name='checkConsent' />}
              label='Share my study data with qualified researchers for future COVID related work'
            />
            <LearnMore learnMoreText='Learn more'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan accumsan vehicula. Donec porttitor ullamcorper dolor at accumsan. Pellentesque id libero blandit, porttitor lectus elementum, rutrum risus. Vivamus at malesuada mi. Suspendisse potenti. Phasellus eget enim porttitor, sagittis massa ac, semper lorem. Integer tortor tortor, volutpat id eros a, mattis tincidunt nisl. Praesent efficitur leo quis ornare mattis.
              </p>
            </LearnMore>
          </>
        )}
        {isEhrConsented !== undefined && (
          <>
            <FormControlLabel
              control={<BlueSwitch checked={isEhrConsented} color='primary' onChange={handleEhrConsentChange} name='checkEhrConsent' />}
              label='Share my electronic health records'
            />
            <LearnMore learnMoreText='Learn more'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan accumsan vehicula. Donec porttitor ullamcorper dolor at accumsan. Pellentesque id libero blandit, porttitor lectus elementum, rutrum risus. Vivamus at malesuada mi. Suspendisse potenti. Phasellus eget enim porttitor, sagittis massa ac, semper lorem. Integer tortor tortor, volutpat id eros a, mattis tincidunt nisl. Praesent efficitur leo quis ornare mattis.
              </p>
            </LearnMore>
        </>
        )}
      </FormGroup>
  
      <Button
        style={{width: '100%', marginTop: '2rem'}}
        variant='contained'
        color='primary'
        onClick={() => setIsShowingWithdrawConfirmation(true)}
      >
        Withdraw from study
        <FontAwesomeIcon style={{right:'10px', position: 'absolute'}} color={blue[500]} icon={faAngleRight} />
      </Button>
      {isShowingWithdrawConfirmation && (
          <ConfirmationModal
            show={true}
            content={
              <div>
                <h2 style={{marginTop: '0rem'}}>Withdrawing from COVID Recovery Corps:</h2>
                <p style={{marginTop: '4rem'}}>If you withdraw, your samples will be destroyed. Your data will not be distributed any more.</p>
                <p style={{marginTop: '2rem', marginBottom: '6rem'}}>However, if researchers already have your data or samples for their studies, the COVID Recovery Corps study cannot get it back.</p>
              </div>}
            onCancel={() => 
              // hide cancel confirmation
              setIsShowingWithdrawConfirmation(false)
            }
            onOK={handleOnWithdrawFromStudyClick}
            confirmCopy={'Yes, withdraw study'}
            cancelCopy={'No, keep me in the study'}
          ></ConfirmationModal>
        )}
    </>
  )
}

export default AcountSettings
