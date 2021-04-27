import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import React, { FunctionComponent, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import iconCheckMark from '../../assets/dashboard/icon_whoohoo.svg'
import { LoggedInUserData } from '../../types/types'
import SurveyWrapper from '../surveys/SurveyWrapper'

type ThankYouHomeTestProps = {
  token: string
  userInfo?: LoggedInUserData
}

const ThankYouHomeTest: FunctionComponent<ThankYouHomeTestProps> = ({
  userInfo,
  token,
}) => {
  const [isShowingDialog, setIsShowingDialog] = useState(false)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useTranslation()

  const handleClose = () => {
    setIsShowingDialog(false)
  }

  const topRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    topRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const elSelectedTestLab = (
    <>
      <img src={iconCheckMark}></img>
      <h2>{t('dashboard.thankYou.surveysDoneTitle')}</h2>
      <Trans i18nKey="dashboard.thankYou.selectedTestText">
        <p>[translate]</p>
      </Trans>
    </>
  )

  if (!userInfo) {
    return <></>
  }

  return (
    <>
      {userInfo.attributes && !isSubmitted && (
        <>
          <Trans i18nKey="dashboard.thankYou.selectedHomeTestText">
            <h2>[translate]</h2>
            <p>[translate]</p>
          </Trans>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingTop="16px"
            paddingBottom="32px"
          >
            <Box textAlign="left" fontWeight="bold">
              <span>{`${userInfo.attributes.address1} ${
                userInfo.attributes.address2 ? userInfo.attributes.address2 : ''
              }`}</span>
              <br />
              <span>{`${userInfo.attributes.city} ${userInfo.attributes.state}, ${userInfo.attributes.zip_code}`}</span>{' '}
            </Box>

            <Button
              variant="outlined"
              color="primary"
              style={{ minWidth: '120px' }}
              onClick={() => setIsShowingDialog(true)}
            >
              {t('common.edit')}
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '200px', marginTop: '24px' }}
            onClick={_e => setIsSubmitted(true)}
          >
            {t('common.submit')}
          </Button>
        </>
      )}

      {isSubmitted && (
        <div style={{ marginBottom: '24px' }}>{elSelectedTestLab}</div>
      )}

      <Dialog
        open={isShowingDialog}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="form-dialog-title"
      >
        <IconButton
          aria-label="close"
          style={{ position: 'absolute', top: '0px', right: '0px' }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box padding="30px" minWidth="400px">
          <div ref={topRef}></div>

          <SurveyWrapper
            formTitle="Tell us about yourself"
            isNoBackBar={true}
            token={token || ''}
            surveyName={'CONTACT'}
            formClass="crc"
            onErrorCallback={(e: any) => {
              /*alert(e);*/ scrollToBottom()
            }}
            onDoneCallback={(e: any) => {
              console.log(e)
              setIsSubmitted(true)
              handleClose()
            }}
          ></SurveyWrapper>
        </Box>
      </Dialog>
    </>
  )
}

export default ThankYouHomeTest
