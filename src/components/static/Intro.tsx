import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Grid, Hidden } from '@material-ui/core'
import {playfairDisplayFont, openSansFont} from '../../App'
import LandingPageAboveFold from '../../assets/LandingPageAboveFold.png'
import LandingPageAboveFold2 from '../../assets/LandingPageAboveFold2.png'
import LandingPageAboveFold3 from '../../assets/LandingPageAboveFold3.png'
import LandingPageAboveFoldMobile from '../../assets/LandingPageAboveFold_mobile.png'
import LandingPageAboveFold2Mobile from '../../assets/LandingPageAboveFold2_mobile.png'
import LandingPageAboveFold3Mobile from '../../assets/LandingPageAboveFold3_mobile.png'

import LandingPageLab from '../../assets/LandingPageLab.png'
import {ReactComponent as Logos} from '../../assets/columbia_and_sage_logo.svg'
import {ReactComponent as Tablet} from '../../assets/tablet.svg'
import {ReactComponent as TestTubes} from '../../assets/test_tubes.svg'
import {ReactComponent as BooksApple} from '../../assets/books_apple.svg'

import { NavLink, Link } from 'react-router-dom'
import BlueSeparator from './BlueSeparator'

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
    background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,1,0) 70%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,1,0) 90%)',
    }
  },
  heroImage: {
    transition: 'opacity 2s ease-in-out',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto',
  },
  heroText: {
    color: '#F2F2F2',
  },
  heroTextDiv: {
    zIndex: 2,
    position: 'relative',
    maxWidth: '650px',
    [theme.breakpoints.up('xs')]: {
      padding: '0px 20px 0px 30px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 20px 80px 40px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '120px 20px 100px 40px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '180px 20px 130px 40px'
    }
  },
  joinButton: {
    height: '36px',
    width: '100px',
    marginBottom: '5px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
      marginBottom: '10px'
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
    justifyContent: 'center'
  },
  content1TextDiv: {
    maxWidth: '940px',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontSize: '20px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '24px',
    },
  },
  logosDiv: {
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  labImageDiv: {
    maxWidth: '550px',
    paddingBottom: '90px',
    [theme.breakpoints.up('md')]: {
      float: 'right',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '25px'
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
    paddingTop: '0px'
  },
  labTextBodyDiv: {
    padding: '20px 0px',
  },
  photographyNote: {
    fontSize: '12px',
    fontFamily: openSansFont,
    fontStyle: 'italic',
    float: 'right',
    paddingTop: '3px'
  },
  paperHeaderDiv: {
    backgroundColor: '#3A3A3A',
    padding: '60px 25px 200px 25px',
  },
  paperHeaderText: {
    color: '#ffffff',
    maxWidth: '700px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paperPanelWrapper: {
    padding: '20px 20px 90px 20px',
    marginTop: '-170px'
  },
  paperPanel: {
    backgroundColor: '#FCFCFC',
    border: '2px #EEEEEE solid',
    padding: '30px 50px',
  },
  paperPanelTitle: {
    textAlign: 'center',
    padding: '40px 20px 0px 20px'
  },
  pink: {
    color: '#FC9090',
  },
  paperPanelStepNumber: {
    color: '#FC9090',
    fontFamily: openSansFont,
    fontSize: '12px',
    fontWeight: 'bold',
    paddingBottom: '5px'
  },
  paperPanelStepTitle: {
    color: '#2A2A2A',
    marginTop: '0px'
  },
  paperPanelStepBody: {
    color: '#3A3A3A',
    paddingBottom: '50px'
  },
  paperPanelStepIconDiv: {
    paddingLeft: '50px'
  },
  paperPanelStepIconMobileDiv: {
    textAlign: 'center',
    padding: '20px'
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

}))
export const Intro: React.FunctionComponent<IntroProps> = ({

}: IntroProps) => {
  const classes = useIntroStyles()
  const [heroImage1Opacity, setHeroImage1Opacity] = useState(1)
  const [heroImage2Opacity, setHeroImage2Opacity] = useState(0)
  const [heroImage3Opacity, setHeroImage3Opacity] = useState(0)

  const selectNextHeroBackground = () => {
    // get next image
    let nextHeroBackgroundImage:string
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
    const interval = setInterval(selectNextHeroBackground, 8000);
    return () => clearInterval(interval);
  }, [heroImage1Opacity, heroImage2Opacity, heroImage3Opacity]);

  const heroTextContent = 
    <div className={classes.heroTextDiv}>
      <h1 className={classes.heroText}>A citizen-powered movement to drive scientific breakthroughs and save lives in the fight against COVID-19.</h1>
      <div>
        <NavLink
          to="/eligibility"
          className={classes.navLink}
        >
          <Button
            color="primary"
            variant="contained"
            className={classes.joinButton}
          >
          Join us
          </Button>
        </NavLink>
      </div>
    </div>
  return (
    <div className="Intro">
       <div>
         <div className={classes.heroContainer}>
            <div className={classes.heroTextGradiant}></div>
            <Hidden smUp>
              <img className={classes.heroImage} src={LandingPageAboveFoldMobile} style={{opacity: heroImage1Opacity}}/>
              <img className={classes.heroImage} src={LandingPageAboveFold2Mobile} style={{opacity: heroImage2Opacity}}/>
              <img className={classes.heroImage} src={LandingPageAboveFold3Mobile} style={{opacity: heroImage3Opacity}}/>       
            </Hidden>
            <Hidden xsDown>
              <img className={classes.heroImage} src={LandingPageAboveFold} style={{opacity: heroImage1Opacity}}/>
              <img className={classes.heroImage} src={LandingPageAboveFold2} style={{opacity: heroImage2Opacity}}/>
              <img className={classes.heroImage} src={LandingPageAboveFold3} style={{opacity: heroImage3Opacity}}/>       
            </Hidden>
           
            {heroTextContent}
         </div>
        <div className={classes.content1}>
          <div className={classes.content1TextDiv}>
            <h3>If you live in the New York City metro area and have recovered from COVID-19, you can help scientists make progress in the global fight against this disease.</h3>            
          </div>
        </div>
        <div className={classes.logosDiv}>
          <Logos />
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <div className={classes.labImageDiv}>
              <img src={LandingPageLab} alt="Lab" width="100%" />
              <p className={classes.photographyNote}>Photography by Noah Berger</p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.labTextDiv}>
              <h2 className={classes.labTextTitle}>There is an urgent need to come together as a survivor community to rapidly advance our understanding of COVID-19.</h2>
              <div className={classes.labTextBodyDiv}>
                <p>You recovered. So have thousands of others. Your experiences could help unlock the mysteries behind this disease. Our mission is to learn more about COVID-19 by bringing your experiences together. </p>                
              </div>
            </div>
          </Grid>
        </Grid>
        <div className={classes.paperHeaderDiv}>
          <h3 className={classes.paperHeaderText}>By sharing your experience in recovering from COVID-19, you can help answer critical questions. </h3>
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.paperPanelWrapper}
        >
          <Grid item xs={12} md={10} lg={8}>
            <div className={classes.paperPanel}>
              <div className={classes.paperPanelTitle}>
                <span>Participation is simple.&nbsp;</span>
                <Hidden smUp>
                  <br></br>
                </Hidden>
                <span className={classes.pink}>Here’s how it works.</span>
              </div>
              <Hidden xsDown>
                <BlueSeparator />
              </Hidden>

              {/* Step one               */}
              <Hidden smUp>
                <div className={classes.paperPanelStepIconMobileDiv}>
                  <Tablet />
                </div>
              </Hidden>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={9}>
                  <div className={classes.paperPanelStepNumber}>
                    STEP ONE
                  </div>
                  <h3 className={classes.paperPanelStepTitle}>Register and take the survey</h3>
                  <div className={classes.paperPanelStepBody}>
                    <p>To get started, click <Link to="/eligibility" style={{fontWeight: 'bold'}}>Join Us</Link> and review information about what will happen in the study. After registering, you will be invited to take brief surveys that may help scientists begin to answer questions like: Why do some people experience very mild symptoms while others get very sick? How does recovering from COVID-19 impact your health over time?</p>
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
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={9}>
                  <div className={classes.paperPanelStepNumber}>
                    STEP TWO
                  </div>
                  <h3 className={classes.paperPanelStepTitle}>Share your samples</h3>
                  <div className={classes.paperPanelStepBody}>
                    <p>We will invite some participants to visit clinical sites in New York City to donate a sample.  In the future, other participants will be invited to donate a sample from home.  Sharing your samples will help researchers develop more reliable antibody tests that can make antibody testing accessible to more people, and in turn, may help answer important questions  including: Who was really infected with COVID-19?  What levels of antibodies are needed to protect us from reinfection? Is it possible for people to develop full immunity to COVID-19?</p>
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
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={9}>
                  <div className={classes.paperPanelStepNumber}>
                    STEP THREE
                  </div>
                  <h3 className={classes.paperPanelStepTitle}>Learn with us along the way</h3>
                  <div className={classes.paperPanelStepBody}>
                    <p>If you are asked to provide a sample, we will return results of the antibody test approved by the New York State Department of Health and share information about what those results mean. As we learn more about the impact of COVID-19 across study participants, we will share regular updates with the broader scientific and patient community. We may also ask if you are interested in joining other related studies. For instance, some participants may choose to be notified of opportunities to donate plasma and help those still fighting for survival from COVID-19.</p>
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
          </Grid>
        </Grid>
      </div>
      <div className={classes.fightTogetherDiv}>
        <h2 className={classes.fightTogetherDivText}>Together, we can fight COVID-19.</h2>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <NavLink
              to="/eligibility"
              className={classes.navLink}
          >
            <Button
              color="primary"
              variant="contained"
              className={classes.joinButton}
            >
            Join us
            </Button>
          </NavLink>
        </Grid>
      </div>
    </div>
  )
}

export default Intro
