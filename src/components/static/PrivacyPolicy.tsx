import React from 'react'
import { makeStyles, Grid, Hidden, Container } from '@material-ui/core'
import { useIntroStyles } from './Intro'
import BlueSeparator from './BlueSeparator'
import LearnMore from '../widgets/LearnMore'
import { ReactComponent as Graphic } from '../../assets/privacy_policy_graphic.svg'
import { useTranslation, Trans } from 'react-i18next'

export const useStyles = makeStyles(theme => ({
  paperHeaderDiv: {
    backgroundColor: '#FC9090',
  },
  graphicDiv: {
    textAlign: 'center',
    padding: '50px 0px 0px 30px',
  },
  subHeading: {
    color: '#FC9090',
    marginTop: '25px',
    fontWeight: 'bold',
  },
  address: {
    paddingLeft: '30px',
  },
  version: {
    padding: '30px 0px',
  },
}))
export const PrivacyPolicy: React.FunctionComponent = ({}) => {
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
            <h1>{t('privacy.title')}</h1>
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
              <div>
                <div>
                  <Trans i18nKey="privacy.text1">
                    <p>[translate]</p>
                    <p> [translate]</p>
                    <p>
                      {' '}
                      [translate]{' '}
                      <a href="www.covidrecoverycorps.org"> [translate]</a>
                      [translate]
                    </p>
                  </Trans>
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text2')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="privacy.text3">
                        <p>[translate]</p>
                        <p className={classes.subHeading}> [translate]</p>
                        <p> [translate]</p>
                        <p className={classes.subHeading}> [translate]</p>
                        <p>[translate]</p>
                      </Trans>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text4')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="privacy.text5">
                        <p className={classes.subHeading}>[translate]</p>
                        <p>
                          [translate]
                          <ul>
                            <li> [translate]</li>
                            <li>[translate]</li>
                            <li>[translate]</li>
                            <li> [translate]</li>
                          </ul>
                        </p>
                        <p className={classes.subHeading}>[translate]</p>
                        <p>
                          [translate]
                          <ul>
                            <li>[translate]</li>
                            <li> [translate]</li>
                            <li> [translate]</li>
                            <li> [translate]</li>
                          </ul>
                        </p>
                      </Trans>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text6')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="privacy.text7">
                        <p>[translate]</p>
                        <p className={classes.subHeading}>[translate]</p>
                        <p>[translate]</p>
                        <p>
                          [translate]
                          <ul>
                            <li>[translate]</li>
                            <li>[translate] </li>
                          </ul>
                        </p>
                        <p className={classes.subHeading}>[translate]</p>
                        <p>[translate]</p>
                        <p className={classes.subHeading}>[translate]</p>
                        <p>[translate]</p>
                        <p className={classes.subHeading}>[translate]</p>
                        <p>[translate]</p>
                      </Trans>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text8')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="privacy.text9">
                        <p>[translate]</p>
                        <p>[translate]</p>
                      </Trans>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text10')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="privacy.text11">
                        <p>[translate]</p>
                        <p>[translate]</p>
                      </Trans>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text12')}</h3>}
                  >
                    <div>
                      <p>{t('privacy.text13')}</p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text14')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="privacy.text15">
                        <p>[tranlsate]</p>
                        <p className={classes.address}>
                          <b>[translate]</b>
                          <br />
                          [translate]
                          <br />
                          [translate]
                          <br />
                          [translate]
                          <br />
                          [translate]
                          <br />
                          <br />
                          <a href="mailto:privacyofficer@sagebionetworks.org">
                            [translate]
                          </a>
                        </p>
                        <p>[translate]</p>
                        <p>
                          [translate]
                          <a href="mailto:privacyofficer@sagebionetworks.org">
                            [translate]
                          </a>
                          [translate]
                        </p>
                      </Trans>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('privacy.text16')}</h3>}
                  >
                    <div>
                      <p>{t('privacy.text17')}</p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3> {t('privacy.text18')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="privacy.text19">
                        <p>
                          [translate]
                          <a href="mailto:privacyofficer@sagebionetworks.org">
                            [translate]
                          </a>
                          [translate]
                        </p>
                        <p className={classes.address}>
                          <b>[translate]</b>
                          <br />
                          [translate]
                          <br />
                          [translate]
                          <br />
                          [translate]
                          <br />
                          [translate]
                          <br />
                          <br />
                        </p>
                      </Trans>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3> {t('privacy.text20')} </h3>}
                  >
                    <div>
                      <p>{t('privacy.text21')}</p>
                    </div>
                  </LearnMore>

                  <div>
                    <p className={classes.version}> {t('privacy.text22')}</p>
                  </div>
                </div>
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

export default PrivacyPolicy
