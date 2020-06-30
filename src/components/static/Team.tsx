import React from 'react'
import { makeStyles, Grid, Hidden, Container } from '@material-ui/core'
import TeamPageAboveFold from '../../assets/TeamPageAboveFold.jpg'
import TeamPageAboveFoldMobile from '../../assets/TeamPageAboveFold_mobile.jpg'
import Wendy from '../../assets/Wendy.png'
import Lara from '../../assets/Lara.jpg'
import { ReactComponent as ColumbiaLogo } from '../../assets/columbia_logo.svg'
import { ReactComponent as SageLogo } from '../../assets/sage_logo.svg'
import { ReactComponent as CZILogo } from '../../assets/czi_logo_dark.svg'
import BlueSeparator from './BlueSeparator'
import { useIntroStyles } from './Intro'

import { useTranslation } from 'react-i18next'

type TeamProps = {}

export const useStyles = makeStyles(theme => ({
  heroImage: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    margin: '0px auto -30% auto',
    verticalAlign: 'middle',
  },
  profile: {
    padding: '50px 10px',
  },
  profileImage: {
    width: '100%',
    padding: '20px 0px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 40px',
    },
  },
  paddingBottom20: {
    paddingBottom: '20px',
  },
  greenBox: {
    backgroundColor: '#90CCCC',
    padding: '50px 30px 50px 30px',
    display: 'flex',
    justifyContent: 'center',
  },
  paperPanelWrapper: {
    padding: '50px 20px 90px 20px',
  },
  survivorCorpsLogo: {
    height: '80px',
    maxWidth: '164px',
  },
}))
export const Team: React.FunctionComponent<TeamProps> = ({}: TeamProps) => {
  const introClasses = useIntroStyles()
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div className="Intro">
      <div>
        <div className={introClasses.heroContainer}>
          <Hidden smUp>
            <img className={classes.heroImage} src={TeamPageAboveFoldMobile} />
          </Hidden>
          <Hidden xsDown>
            <img className={classes.heroImage} src={TeamPageAboveFold} />
          </Hidden>
        </div>

        <div className={introClasses.paperHeaderDiv}>
          <Container maxWidth="md">
            <h3 className={introClasses.paperHeaderText}>{t('team.title')}</h3>
          </Container>
        </div>
        <Container maxWidth="md" className={introClasses.paperPanelWrapper}>
          <div className={introClasses.paperPanel}>
            <div className={introClasses.paperPanelTitle}>
              <h2>{t('team.text1')}</h2>
            </div>
            <Hidden xsDown>
              <BlueSeparator />
            </Hidden>
            <div className={introClasses.paperPanelStepContainer}>
              <div className={introClasses.paperPanelStepBody}>
                <p>{t('team.text2')}</p>
              </div>
            </div>
            {/* Wendy's profile */}
            <Grid
              className={classes.profile}
              container
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={12} sm={6}>
                <img className={classes.profileImage} src={Wendy} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className={introClasses.paperPanelStepTitle}>
                  {t('team.text3')}
                </h3>
                <div className={introClasses.paperPanelStepBody}>
                  <p>{t('team.text4')}</p>
                  <p>
                    {t('team.text5')}&nbsp;
                    <a href="https://www.pbs.org/show/gene/" target="_blank">
                      {t('team.text6')}
                    </a>
                    .
                  </p>
                  <p>
                    {t('common.moreInfoVisit')}&nbsp;
                    <a href="http://www.columbia.edu/" target="_blank">
                      {t('team.text61')}
                    </a>
                    .
                  </p>
                </div>
                <ColumbiaLogo />
              </Grid>
            </Grid>

            {/* Lara's profile */}
            <Grid
              className={classes.profile}
              container
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={12} sm={6}>
                <img className={classes.profileImage} src={Lara} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className={introClasses.paperPanelStepTitle}>
                  {t('team.text7')}
                </h3>
                <div className={introClasses.paperPanelStepBody}>
                  <div className={classes.paddingBottom20}>
                    <p>{t('team.text8')}</p>
                  </div>
                  <div className={classes.paddingBottom20}>
                    <p>{t('team.text9')}</p>
                  </div>
                  <div>
                    <p>
                      {t('common.moreInfoVisit')}&nbsp;
                      <a href="https://www.sagebionetworks.org" target="_blank">
                        {t('team.text10')}
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <SageLogo />
              </Grid>
            </Grid>
          </div>
        </Container>

        <div className={classes.greenBox}>
          <Container maxWidth="md">
            <h2>{t('team.text14')}</h2>
            <div className={introClasses.labTextBodyDiv}>
              <p>{t('team.text15')}</p>
            </div>
            <p className={classes.paddingBottom20}>
              {t('common.moreInfoVisit')}{' '}
              <a href="https://www.chanzuckerberg.com" target="_blank">
                {t('team.text16')}
              </a>
              .
            </p>
            <CZILogo />
          </Container>
        </div>
      </div>
    </div>
  )
}

export default Team
