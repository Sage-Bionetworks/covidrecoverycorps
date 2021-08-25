import React from 'react'
import { makeStyles, Grid, Hidden, Container } from '@material-ui/core'
import { useIntroStyles } from './Intro'
import BlueSeparator from './BlueSeparator'
import LearnMore from '../widgets/LearnMore'
import { ReactComponent as Graphic } from '../../assets/faqs_graphic.svg'
import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

type FAQProps = {
  reason?: string
}

export const useStyles = makeStyles(theme => ({
  paperHeaderDiv: {
    backgroundColor: '#FC9090',
  },
  graphicDiv: {
    textAlign: 'center',
    padding: '50px 0px 0px 30px',
  },
}))
export const FAQs: React.FunctionComponent<FAQProps> = ({}: FAQProps) => {
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
            <h1>{t('faqs.title')}</h1>
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
                <div className="FAQ__content1">
                  <LearnMore
                    learnMoreText=""
                    defaultIsShowing={true}
                    clickableElement={<h3>{t('faqs.text1')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text2')}</p>
                      <p>{t('faqs.text3')}</p>
                    </div>
                  </LearnMore>
                </div>

                <div className="FAQ__content2">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text4')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text5')}</p>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content21">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text41')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="faqs.text51">
                        [translate]<p></p>
                      </Trans>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content3">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text6')}</h3>}
                  >
                    <div>
                      <p>
                        <Trans i18nKey="faqs.text12">
                          <p>[translate]</p>
                          <ul>
                            <li>[translate]</li>
                            <li>[translate]</li>
                            <li>[translate]</li>
                            <li>[translate]</li>
                          </ul>
                        </Trans>
                      </p>
                    </div>
                  </LearnMore>
                </div>

                <div className="FAQ__content4">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text8')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text9')}</p>
                    </div>
                  </LearnMore>
                </div>

                <div className="FAQ__content5">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text10')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text11')}</p>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content6">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text13')}</h3>}
                  >
                    <div>
                      <p>
                        <Trans i18nKey="faqs.text14">
                          [translate]
                          <Link to="/team"> [translate]</Link>
                          [translate]
                        </Trans>
                      </p>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content71">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text151')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text161')}</p>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content10">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text20')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text21')}</p>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content7">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text15')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="faqs.text16">
                        <p>[translate]</p>
                        <p>[translate]</p>
                        <p>[translate]</p>
                        <p>[translate]</p>
                      </Trans>
                    </div>
                  </LearnMore>
                </div>

                <div className="FAQ__content8">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text17')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text7')}</p>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content9">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text18')}</h3>}
                  >
                    <div>
                      <p>{t('faqs.text19')}</p>
                    </div>
                  </LearnMore>
                </div>
                <div className="FAQ__content91">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text181')}</h3>}
                  >
                    <div>
                      <Trans i18nKey="faqs.text191">
                        <p>[translate]</p>
                      </Trans>
                    </div>
                  </LearnMore>
                </div>

                <div className="FAQ__content11">
                  <LearnMore
                    learnMoreText=""
                    clickableElement={<h3>{t('faqs.text22')}</h3>}
                  >
                    <div>
                      <p>
                        <Trans i18nKey="faqs.text23">
                          [translate]<strong></strong> [translate]
                          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
                            [translate]
                          </a>
                        </Trans>
                      </p>
                    </div>
                  </LearnMore>
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

export default FAQs
