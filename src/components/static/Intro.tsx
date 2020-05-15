import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Grid, Hidden } from '@material-ui/core'
import {playfairDisplayFont, openSansFont} from '../../App'
import LandingPageAboveFold from '../../assets/LandingPageAboveFold.png'
import LandingPageAboveFold2 from '../../assets/LandingPageAboveFold2.png'
import LandingPageAboveFold3 from '../../assets/LandingPageAboveFold3.png'
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

const useStyles = makeStyles(theme => ({
  heroContainer: {
    position: 'relative',
    overflow: 'hidden',
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
    zIndex: 2,
    position: 'relative',
    color: '#F2F2F2',
    fontFamily: playfairDisplayFont,
    maxWidth: '650px',
    lineHeight: '127%',
    [theme.breakpoints.up('xs')]: {
      fontSize: '30px',
      padding: '15px 20px 0px 30px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '50px 20px 80px 40px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px',
      padding: '150px 20px 100px 40px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '200px 20px 130px 40px'
    }
  },
  joinButton: {
    height: '36px',
    width: '100px',
    marginTop: '10px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '40px',
    },
    marginBottom: '10px'
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
    paddingTop: '40px',
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
  labTextTitleDiv: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    color: '#2a2a2a',
    lineHeight: '37px',
    fontSize: '32px'
  },
  labTextBodyDiv: {
    fontFamily: openSansFont,
    lineHeight: '25px',
    padding: '20px 0px',
    fontSize: '16px',
  },
  photographyNote: {
    fontSize: '12px',
    fontFamily: openSansFont,
    fontStyle: 'italic',
    float: 'right',
    paddingTop: '3px'
  },
  participationHeaderDiv: {
    backgroundColor: '#3A3A3A',
    padding: '60px 25px 200px 25px',
  },
  participationHeaderText: {
    color: '#ffffff',
    maxWidth: '700px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: playfairDisplayFont,
  },
  participationPanelWrapper: {
    padding: '20px 20px 90px 20px',
    marginTop: '-170px'
  },
  participationPanel: {
    backgroundColor: '#FCFCFC',
    border: '2px #EEEEEE solid',
    padding: '30px 50px',
  },
  participationPanelTitle: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    fontSize: '32px',
    textAlign: 'center',
    padding: '40px 20px 0px 20px'
  },
  pink: {
    color: '#FC9090',
  },
  participationPanelStepNumber: {
    color: '#FC9090',
    fontFamily: openSansFont,
    fontSize: '12px',
    fontWeight: 'bold',
    paddingBottom: '5px'
  },
  participationPanelStepTitle: {
    fontFamily: playfairDisplayFont, 
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '2.75rem',
    color: '#2A2A2A',
    paddingBottom: '17px'
  },
  participationPanelStepBody: {
    fontFamily: openSansFont, 
    fontSize: '16px',
    lineHeight: '2rem',
    color: '#3A3A3A',
    paddingBottom: '50px'
  },
  participationPanelStepIconDiv: {
    paddingLeft: '50px'
  },
  participationPanelStepIconMobileDiv: {
    textAlign: 'center',
    padding: '20px'
  },
  fightTogetherDiv: {
    backgroundColor: '#3A3A3A',
    padding: '40px 0px',
  },
  fightTogetherDivText: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    padding: '0px 25px 0px 25px',
    fontSize: '32px',
  },

}))
export const Intro: React.FunctionComponent<IntroProps> = ({

}: IntroProps) => {
  const classes = useStyles()
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
    <div className={classes.heroText}>
      A citizen-powered movement to drive scientific breakthroughs and save lives in the <br></br>fight against COVID-19.
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
           <img className={classes.heroImage} src={LandingPageAboveFold} style={{opacity: heroImage1Opacity}}/>
           <img className={classes.heroImage} src={LandingPageAboveFold2} style={{opacity: heroImage2Opacity}}/>
           <img className={classes.heroImage} src={LandingPageAboveFold3} style={{opacity: heroImage3Opacity}}/>
            {heroTextContent}
         </div>
        <div className={classes.content1}>
          <div className={classes.content1TextDiv}>
            If you live in the New York City metro area and have recovered from COVID-19, you can help scientists make progress in the global fight against this disease.
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
              <div className={classes.labTextTitleDiv}>
                There is an urgent need to come together as a survivor community to rapidly advance our understanding of COVID-19.
              </div>
              <div className={classes.labTextBodyDiv}>
                You recovered. So have thousands of others. Your experiences could help unlock the mysteries behind this disease. Our mission is to learn more about COVID-19 by bringing your experiences together. 
              </div>
            </div>
          </Grid>
        </Grid>
        <div className={classes.participationHeaderDiv}>
          <div className={classes.participationHeaderText}>
            By sharing your experience in recovering from COVID-19, you can help answer critical questions. 
          </div>
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.participationPanelWrapper}
        >
          <Grid item xs={12} md={10} lg={8}>
            <div className={classes.participationPanel}>
              <div className={classes.participationPanelTitle}>
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
                <div className={classes.participationPanelStepIconMobileDiv}>
                  <Tablet />
                </div>
              </Hidden>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={9}>
                  <div className={classes.participationPanelStepNumber}>
                    STEP ONE
                  </div>
                  <div className={classes.participationPanelStepTitle}>
                    Register and take the survey
                  </div>
                  <div className={classes.participationPanelStepBody}>
                    To get started, click <Link to="/eligibility" style={{fontWeight: 'bold'}}>Join Us</Link> and review information about what will happen in the study. After registering, you will be invited to take brief surveys that may help scientists begin to answer questions like: Why do some people experience very mild symptoms while others get very sick? How does recovering from COVID-19 impact your health over time?
                  </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <div className={classes.participationPanelStepIconDiv}>
                    <Hidden xsDown>
                      <Tablet />
                    </Hidden>
                  </div>
                </Grid>
              </Grid>

              {/* Step two               */}
              <Hidden smUp>
                <div className={classes.participationPanelStepIconMobileDiv}>
                  <TestTubes />
                </div>
              </Hidden>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={9}>
                  <div className={classes.participationPanelStepNumber}>
                    STEP TWO
                  </div>
                  <div className={classes.participationPanelStepTitle}>
                    Share your samples
                  </div>
                  <div className={classes.participationPanelStepBody}>
                    We will invite some participants to visit clinical sites in New York City to donate a sample.  In the future, other participants will be invited to donate a sample from home.  Sharing your samples will help researchers develop more reliable antibody tests that can make antibody testing accessible to more people, and in turn, may help answer important questions  including: Who was really infected with COVID-19?  What levels of antibodies are needed to protect us from reinfection? Is it possible for people to develop full immunity to COVID-19?
                  </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <div className={classes.participationPanelStepIconDiv}>
                    <Hidden xsDown>
                      <TestTubes />
                    </Hidden>
                  </div>
                </Grid>
              </Grid>

              {/* Step three               */}
              <Hidden smUp>
                <div className={classes.participationPanelStepIconMobileDiv}>
                  <BooksApple />
                </div>
              </Hidden>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={9}>
                  <div className={classes.participationPanelStepNumber}>
                    STEP THREE
                  </div>
                  <div className={classes.participationPanelStepTitle}>
                    Learn with us along the way
                  </div>
                  <div className={classes.participationPanelStepBody}>
                    If you are asked to provide a sample, we will return results of the antibody test approved by the New York State Department of Health and share information about what those results mean. As we learn more about the impact of COVID-19 across study participants, we will share regular updates with the broader scientific and patient community. We may also ask if you are interested in joining other related studies. For instance, some participants may choose to be notified of opportunities to donate plasma and help those still fighting for survival from COVID-19.
                  </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <div className={classes.participationPanelStepIconDiv}>
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
        <div className={classes.fightTogetherDivText}>
          Together, we can fight COVID-19.
        </div>
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
