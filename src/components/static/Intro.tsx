import React from 'react'
import { makeStyles, Button, Grid, Hidden } from '@material-ui/core'
import {playfairDisplayFont, openSansFont} from '../../App'
import LandingPageAboveFold from '../../assets/LandingPageAboveFold.png'
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
  heroImage: {
    backgroundImage: `url(${LandingPageAboveFold})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '450px'
  },
  heroText: {
    color: '#F2F2F2',
    fontFamily: playfairDisplayFont,
    fontSize: '3.5rem',
    paddingTop: '100px',
    paddingLeft: '60px',
    paddingBottom: '35px',
    maxWidth: '550px',
    lineHeight: '127%'
  },
  joinButton: {
    height: '36px',
    width: '100px',
    marginTop: '40px',
    marginBottom: '80px'
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
    maxWidth: '650px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  logosDiv: {
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  labImageDiv: {
    maxWidth: '500px',
    [theme.breakpoints.up('md')]: {
      float: 'right',
    },
  },
  labTextDiv: {
    padding: '40px 25px 40px 90px',
    maxWidth: '500px',
  },
  labTextTitleDiv: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    color: '#2a2a2a',
    lineHeight: '37pt',
    fontSize: '2.5rem'
  },
  labTextBodyDiv: {
    fontFamily: openSansFont,
    lineHeight: '25pt',
    padding: '20px 0px',
  },
  photographyNote: {
    fontSize: '1rem',
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
    fontSize: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: playfairDisplayFont,
  },
  participationPanelWrapper: {
    padding: '20px',
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
    fontSize: '2.5rem',
    textAlign: 'center',
    padding: '40px 20px 0px 20px'
  },
  pink: {
    color: '#FC9090',
  },
  participationPanelStepNumber: {
    color: '#FC9090',
    fontFamily: openSansFont,
    fontSize: '1rem',
    fontWeight: 'bold',
    paddingBottom: '1px'
  },
  participationPanelStepTitle: {
    fontFamily: playfairDisplayFont, 
    fontWeight: 'bold',
    fontSize: '2rem',
    lineHeight: '2.75rem',
    color: '#2A2A2A',
    paddingBottom: '17px'
  },
  participationPanelStepBody: {
    fontFamily: openSansFont, 
    fontSize: '1.3rem',
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
  },
  fightTogetherDivText: {
    fontFamily: playfairDisplayFont,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    padding: '40px 25px 0px 25px',
    fontSize: '2.7rem',
  },

}))

export const Intro: React.FunctionComponent<IntroProps> = ({

}: IntroProps) => {
  const classes = useStyles()
  return (
    <div className="Intro">
       <div>
         <div className={classes.heroImage}>
            <div className={classes.heroText}>
              A citizen-powered movement<br></br>to drive scientific breakthroughs<br></br>and save lives in the<br></br>fight against COVID-19.
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
