import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { blue } from '@material-ui/core/colors';
import { Button, Icon, withStyles } from '@material-ui/core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FloatingToolbar from './widgets/FloatingToolbar';
import LearnMore from './widgets/LearnMore';
import ConfirmationModal from './widgets/ConfirmationModal';
import { Link, Redirect } from 'react-router-dom';
import MaterialUiLink from '@material-ui/core/Link';
import { ConsentService } from '../services/consent.service'
import { UserService } from '../services/user.service';
import { LoggedInUserData, Response } from '../types/types';
import Alert from '@material-ui/lab/Alert';
import {
  Card,
  CardContent,
} from '@material-ui/core'
import { setSession, getSession } from '../helpers/utility';

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
  const [isRedirectingHome, setIsRedirectingHome] = useState<boolean | undefined>(false)
  const [userId, setUserId] = useState<string | undefined>()
  const [error, setError] = useState('')

  // initialize check box values
  useEffect(() => {
    let isSubscribed = true
    async function getInfo(token: string | undefined) {
      if (token && isSubscribed) {
        setError('')
        try {
          const userInfoResponse = await UserService.getUserInfo(token)
          const userData:LoggedInUserData = userInfoResponse.data
          const isCurrentlySharingAll = ConsentService.SHARE_SCOPE_ALL == userData.sharingScope
          setIsShareScopeAll(_prev => isCurrentlySharingAll)
          const isEhrConsented = userData.dataGroups && userData.dataGroups.includes('hipaa_consented')
          setIsEhrConsented(_prev => isEhrConsented)
          setUserId(userData.id)
        } catch (e) {
          setError(e.message)
        }
      }
    }
    getInfo(props.token)
    return () => {
      isSubscribed = false
    }
  }, [props.token])
  
  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setError('')
    const newScope = checked ? ConsentService.SHARE_SCOPE_ALL : ConsentService.SHARE_SCOPE_PARTNERS
    console.log(newScope)
    ConsentService.updateMySharingScope(
      newScope,
      props.token
    ).then((participantRecordResponse:Response<LoggedInUserData>)=> {
      const isCurrentlySharingAll = ConsentService.SHARE_SCOPE_ALL == participantRecordResponse.data.sharingScope
      setIsShareScopeAll(_prev => isCurrentlySharingAll)
    }).catch( err => {
      setError(err.message)
    })
  }
  const handleEhrConsentChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setError('')
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
        }).catch( err => {
          setError(err.message)
        })
    }
  }
  if (isRedirectingToEhr) {
    return <Redirect to='/consentehr' />
  }
  if (isRedirectingHome) {
    // need a way to force App to reload the token, because the session is dead after withdrawing from the study!
    window.location.href = '/home?alert=WITHDRAWN_FROM_STUDY'
    // return <Redirect to='/home' />
  }

  const handleOnWithdrawFromStudyClick = () => {
    setError('')
    ConsentService.withdrawFromStudy(userId!, props.token).then(()=> {
      setSession(props.token, getSession()?.name || '', false)
      setIsRedirectingHome(true)
    }).catch( err => {
      setError(err.message)
    })
    setIsShowingWithdrawConfirmation(false)
  }
  
  return (
    <>
      <div>
          <FloatingToolbar closeLinkDestination='/dashboard' closeIcon={faAngleLeft} closeLinkText='Dashboard' />
      </div>
      <Card><CardContent>
      <h1 className="text-center margin-top-std">Account Settings</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <Link to='/contactinfo'>
          Update contact information
      </Link>
      <FormGroup className='margin-top-std'>
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
  
      {userId !== undefined && (
        <MaterialUiLink onClick={() => setIsShowingWithdrawConfirmation(true)}>
          Withdraw from study
        </MaterialUiLink>
      )}
       </CardContent></Card>
      {userId !== undefined && isShowingWithdrawConfirmation && (
          <ConfirmationModal
            show={true}
            content={
              <div>
                <h2 style={{marginTop: '0rem'}}>Withdrawing from COVID Recovery Corps:</h2>
                <p className='margin-top-std'>If you withdraw, your samples will be destroyed. Your data will not be distributed any more.</p>
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
