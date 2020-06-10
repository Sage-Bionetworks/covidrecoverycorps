import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Button,
  Grid,
  Hidden,
  Container,
  IconButton,
} from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import LandingPageAboveFold from '../../assets/LandingPageAboveFold.png'
import LandingPageAboveFold2 from '../../assets/LandingPageAboveFold2.png'
import LandingPageAboveFold3 from '../../assets/LandingPageAboveFold3.png'
import LandingPageAboveFoldMobile from '../../assets/LandingPageAboveFold_mobile.png'
import LandingPageAboveFold2Mobile from '../../assets/LandingPageAboveFold2_mobile.png'
import LandingPageAboveFold3Mobile from '../../assets/LandingPageAboveFold3_mobile.png'

import LandingPageLab from '../../assets/LandingPageLab.png'
import { ReactComponent as ColumbiaLogo } from '../../assets/columbia_logo.svg'
import { ReactComponent as SageLogo } from '../../assets/sage_logo.svg'
import { ReactComponent as Tablet } from '../../assets/tablet.svg'
import { ReactComponent as TestTubes } from '../../assets/test_tubes.svg'
import { ReactComponent as BooksApple } from '../../assets/books_apple.svg'
import { ReactComponent as ShareIcon } from '../../assets/share_icon.svg'

import { NavLink, Link } from 'react-router-dom'
import BlueSeparator from './BlueSeparator'
import ShareModal from '../widgets/ShareModal'

import { useTranslation } from 'react-i18next'

type IntroProps = {
  token: string | null
}

export const useIntroStyles = makeStyles(theme => ({
  heroContainer: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '215px',
  },
  heroTextGradiant: {
    zIndex: 1,
    background:
      'linear-gradient(90deg, rgba(17,17,17,0.4) -30%, rgba(255,255,255,0) 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      background:
        'linear-gradient(90deg, rgba(17,17,17,0.4) -10%, rgba(255,255,255,0) 120%)',
    },
  },
  heroImage: {
    transition: 'opacity 2s ease-in-out',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('xl')]: {
      top: -250,
    },
  },
  heroText: {
    color: '#F2F2F2',
  },
  heroTextDiv: {
    zIndex: 2,
    position: 'relative',

    [theme.breakpoints.up('xs')]: {
      padding: '25px 20px 30px 30px',
      maxWidth: '250px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '30px 20px 45px 40px',
      maxWidth: '450px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '120px 20px 100px 40px',
      maxWidth: '650px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '180px 20px 130px 40px',
    },
  },
  joinButton: {
    height: '36px',
    width: '100px',
    marginBottom: '5px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
      marginBottom: '10px',
    },
  },
  navLink: {
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
    },
  },
  content1: {
    fontFamily: playfairDisplayFont,
    backgroundColor: '#90CCCC',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: '50px',
    paddingBottom: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  content1TextDiv: {
    paddingLeft: '20px',
    paddingRight: '20px',
    fontSize: '20px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '24px',
    },
  },
  logosDiv: {
    padding: '40px 30px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  logosDivSeparator: {
    width: '5px',
    borderRight: '2px #EEEEEE solid',
    margin: '0px 50px',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0px #EEEEEE solid',
      margin: '10px 5px',
    },
  },
  labImageDiv: {
    maxWidth: '550px',
    paddingBottom: '90px',
    [theme.breakpoints.up('md')]: {
      float: 'right',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '25px',
    },
  },
  labTextDiv: {
    paddingRight: '25px',
    paddingBottom: '40px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '90px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '25px',
    },

    maxWidth: '500px',
  },
  labTextTitle: {
    paddingTop: '0px',
  },
  labTextBodyDiv: {
    padding: '20px 0px',
  },
  photographyNote: {
    fontSize: '12px',
    fontFamily: openSansFont,
    fontStyle: 'italic',
    float: 'right',
    paddingTop: '3px',
  },
  paperHeaderDiv: {
    backgroundColor: '#3A3A3A',
    padding: '30px 25px 200px 25px',
  },
  paperHeaderText: {
    color: '#ffffff',
    textAlign: 'center',
    padding: '0px 20px 0px 20px',
    [theme.breakpoints.up('md')]: {
      padding: '0px 80px 0px 80px',
    },
  },
  paperPanelWrapper: {
    padding: '20px 20px 90px 20px',
    marginTop: '-170px',
  },
  paperPanel: {
    backgroundColor: '#FCFCFC',
    border: '2px #EEEEEE solid',
    padding: '30px 50px',
  },
  paperPanelTitle: {
    textAlign: 'center',
    padding: '10px 20px 0px 20px',
  },
  pink: {
    color: '#FC9090',
  },
  paperPanelStepContainer: {
    paddingLeft: '0px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '25px',
    },
  },
  paperPanelStepNumber: {
    color: '#FC9090',
    fontFamily: openSansFont,
    fontSize: '12px',
    fontWeight: 'bold',
    paddingBottom: '5px',
  },
  paperPanelStepTitle: {
    color: '#2A2A2A',
    marginTop: '0px',
  },
  paperPanelStepBody: {
    color: '#3A3A3A',
    paddingBottom: '50px',
  },
  paperPanelStepIconDiv: {
    paddingLeft: '50px',
  },
  paperPanelStepIconMobileDiv: {
    textAlign: 'center',
    padding: '20px',
  },
  fightTogetherDiv: {
    backgroundColor: '#3A3A3A',
    padding: '40px 0px',
  },
  fightTogetherDivText: {
    textAlign: 'center',
    color: '#FFFFFF',
    padding: '0px 25px 0px 25px',
  },
  shareButtonContainer: {
    height: '0px',
  },
  shareButtonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  shareButton: {
    width: '77px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(242, 242, 242, 1)',
    },
    position: 'relative',
    top: '-40px',
    zIndex: 2,
  },
  logo: {
    height: '50px',
    maxWidth: '200px',
  },
}))
export const Intro: React.FunctionComponent<IntroProps> = ({}: IntroProps) => {
  const { t } = useTranslation()

  const classes = useIntroStyles()
  const [isShowingShareDialog, setIsShowingShareDialog] = useState(false)
  const [heroImage1Opacity, setHeroImage1Opacity] = useState(1)
  const [heroImage2Opacity, setHeroImage2Opacity] = useState(0)
  const [heroImage3Opacity, setHeroImage3Opacity] = useState(0)

  const selectNextHeroBackground = () => {
    // get next image
    let nextHeroBackgroundImage: string
    if (heroImage1Opacity > 0) {
      setHeroImage1Opacity(0)
      setHeroImage2Opacity(1)
    } else if (heroImage2Opacity > 0) {
      setHeroImage2Opacity(0)
      setHeroImage3Opacity(1)
    } else {
      setHeroImage3Opacity(0)
      setHeroImage1Opacity(1)
    }
  }
  useEffect(() => {
    const interval = setInterval(selectNextHeroBackground, 8000)
    return () => clearInterval(interval)
  }, [heroImage1Opacity, heroImage2Opacity, heroImage3Opacity])

  const heroTextContent = (
    <Container maxWidth="lg">
      <div className={classes.heroTextDiv}>
        <h1 className={classes.heroText}>{t('home.title')}</h1>
        <div>
          <NavLink to="/eligibility" className={classes.navLink}>
            <Button
              color="primary"
              variant="contained"
              className={classes.joinButton}
            >
             {t('common.joinUs')}
            </Button>
          </NavLink>
        </div>
      </div>
    </Container>
  )
  return (
    <div className="Intro">
      <div>
        <div className={classes.heroContainer}>
          <div className={classes.heroTextGradiant}></div>
          <Hidden smUp>
            <img
              className={classes.heroImage}
              src={LandingPageAboveFoldMobile}
              style={{ opacity: heroImage1Opacity }}
            />
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold2Mobile}
              style={{ opacity: heroImage2Opacity }}
            />
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold3Mobile}
              style={{ opacity: heroImage3Opacity }}
            />
          </Hidden>
          <Hidden xsDown>
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold}
              style={{ opacity: heroImage1Opacity }}
            />
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold2}
              style={{ opacity: heroImage2Opacity }}
            />
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold3}
              style={{ opacity: heroImage3Opacity }}
            />
          </Hidden>

          {heroTextContent}
        </div>
        <Container maxWidth="lg" className={classes.shareButtonContainer}>
          <div className={classes.shareButtonDiv}>
            <IconButton
              aria-label="share"
              className={classes.shareButton}
              onClick={() => {
                setIsShowingShareDialog(true)
              }}
            >
              <ShareIcon />
            </IconButton>
          </div>
        </Container>
        <ShareModal
          show={isShowingShareDialog}
          onClose={() => {
            setIsShowingShareDialog(false)
          }}
        />
        <div className={classes.content1}>
          <Container maxWidth="md">
            <div className={classes.content1TextDiv}>
              <h3>{t('home.text1')}</h3>
            </div>
          </Container>
        </div>
        <Container maxWidth="lg">
          <div className={classes.logosDiv}>
            <ColumbiaLogo className={classes.logo} />
            <div className={classes.logosDivSeparator}></div>
            <SageLogo className={classes.logo} />
          </div>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <div className={classes.labImageDiv}>
                <img src={LandingPageLab} alt="Lab" width="100%" />
                <p className={classes.photographyNote}>{t('home.text2')}</p>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.labTextDiv}>
                <h2 className={classes.labTextTitle}>{t('home.text3')}</h2>
                <div className={classes.labTextBodyDiv}>
                  <p>{t('home.text4')}</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <div className={classes.paperHeaderDiv}>
          
        </div>
        <Container maxWidth="md" className={classes.paperPanelWrapper}>
          <div className={classes.paperPanel}>
            <h2 className={classes.paperPanelTitle}>{t('home.text7')}</h2>
            <Hidden xsDown>
              <BlueSeparator />
            </Hidden>

            {/* Step one               */}
            <Hidden smUp>
              <div className={classes.paperPanelStepIconMobileDiv}>
                <Tablet />
              </div>
            </Hidden>
            <Grid container justify="center" alignItems="center">
              <Grid
                item
                xs={12}
                sm={9}
                className={classes.paperPanelStepContainer}
              >
                <div className={classes.paperPanelStepNumber}>
                  {t('home.text8')}
                </div>
                <h3 className={classes.paperPanelStepTitle}>
                  {t('home.text9')}
                </h3>
                <div className={classes.paperPanelStepBody}>
                  <p>
                    {t('home.text10')}&nbsp;
                    <Link to="/eligibility" style={{ fontWeight: 'bold' }}>
                      {t('common.joinUs')}
                    </Link>{' '}
                    {t('home.text11')}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paperPanelStepIconDiv}>
                  <Hidden xsDown>
                    <Tablet />
                  </Hidden>
                </div>
              </Grid>
            </Grid>

            {/* Step two               */}
            <Hidden smUp>
              <div className={classes.paperPanelStepIconMobileDiv}>
                <TestTubes />
              </div>
            </Hidden>
            <Grid container justify="center" alignItems="center">
              <Grid
                item
                xs={12}
                sm={9}
                className={classes.paperPanelStepContainer}
              >
                <div className={classes.paperPanelStepNumber}>
                  {' '}
                  {t('home.text12')}
                </div>
                <h3 className={classes.paperPanelStepTitle}>
                  {t('home.text13')}
                </h3>
                <div className={classes.paperPanelStepBody}>
                  <p>{t('home.text14')}</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paperPanelStepIconDiv}>
                  <Hidden xsDown>
                    <TestTubes />
                  </Hidden>
                </div>
              </Grid>
            </Grid>

            {/* Step three               */}
            <Hidden smUp>
              <div className={classes.paperPanelStepIconMobileDiv}>
                <BooksApple />
              </div>
            </Hidden>
            <Grid container justify="center" alignItems="center">
              <Grid
                item
                xs={12}
                sm={9}
                className={classes.paperPanelStepContainer}
              >
                <div className={classes.paperPanelStepNumber}>
                  {' '}
                  {t('home.text15')}
                </div>
                <h3 className={classes.paperPanelStepTitle}>
                  {t('home.text16')}
                </h3>
                <div className={classes.paperPanelStepBody}>
                  <p>{t('home.text17')}</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paperPanelStepIconDiv}>
                  <Hidden xsDown>
                    <BooksApple />
                  </Hidden>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className={classes.fightTogetherDiv}>
        <h2 className={classes.fightTogetherDivText}>{t('home.text18')}</h2>
        <Grid container justify="center" alignItems="center">
          <NavLink to="/eligibility" className={classes.navLink}>
            <Button
              color="primary"
              variant="contained"
              className={classes.joinButton}
            >{t('common.joinUs')}
       
            </Button>
          </NavLink>
        </Grid>
      </div>
    </div>
  )
}

export default Intro
