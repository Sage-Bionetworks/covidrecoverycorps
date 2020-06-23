import React from 'react'
import { makeStyles, Grid, Hidden, Container } from '@material-ui/core'
import { useIntroStyles } from './Intro'
import BlueSeparator from './BlueSeparator'
import { Link } from 'react-router-dom'
import { ReactComponent as Graphic } from '../../assets/contact_us_graphic.svg'
import { useTranslation, Trans } from 'react-i18next'

type ContactProps = {
  reason?: string
}

export const useStyles = makeStyles(theme => ({
  paperHeaderDiv: {
    backgroundColor: '#90CCCC',
  },
  graphicDiv: {
    textAlign: 'center',
    padding: '50px 0px 0px 30px',
  },
}))

export const Contact: React.FunctionComponent<ContactProps> = ({}: ContactProps) => {
  const introClasses = useIntroStyles()
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div>
      <div
        className={`${classes.paperHeaderDiv} ${introClasses.paperHeaderDiv}`}
      ></div>
      <Container maxWidth="md" className={introClasses.paperPanelWrapper}>
        <div className={introClasses.paperPanel}>
          <div className={introClasses.paperPanelTitle}>
            <h1>{t('contact.title')}</h1>
          </div>
          <Hidden xsDown>
            <BlueSeparator />
          </Hidden>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid
              item
              xs={12}
              md={8}
              className={introClasses.paperPanelStepContainer}
            >
              <div className="Contact__content1">
                <p>
                  <Trans i18nKey="contact.text1">
                    [translate]<Link to="/faqs">[translate]</Link>[translate]
                  </Trans>
                </p>
                <Trans i18nKey="contact.text2">
                  <p>[translate]</p>
                  <p>[translate]</p>
                  <h3>[translate]</h3>
                </Trans>
                <p>
                  <Trans i18nKey="contact.text3">
                    [translate]<b>[translate]</b>[translate]
                    <br></br>
                    <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
                      [translate]
                    </a>
                    .
                  </Trans>
                </p>

                <h3>{t('contact.text4')}</h3>
                <p>
                  <Trans i18nKey="contact.text5">
                    [translate]
                    <Link to="privacypolicy">[translate]</Link>&nbsp;[translate]
                    <br></br>
                    <a href="mailto:privacypolicy@sagebionetworks.org">
                      [translate]
                    </a>
                    .
                  </Trans>
                </p>
                <h3>{t('contact.text6')}</h3>
                <p>{t('contact.text7')}</p>

                <p>
                  <Trans i18nKey="contact.text8">
                    <b>[translate]</b>
                    <br></br>
                    [translate]<br></br>
                    [translate]<br></br>
                    [translate]<br></br>
                    <b>[translate]</b> or <b>[translate]</b> <br></br>
                    <a href="mailto:Help@wirb.com"> [translate]</a>
                  </Trans>
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Hidden smDown>
                <div className={classes.graphicDiv}>
                  <Graphic />
                </div>
              </Hidden>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Contact
