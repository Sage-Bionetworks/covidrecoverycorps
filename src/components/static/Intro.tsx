import React from 'react'
import { makeStyles, Button, Grid } from '@material-ui/core'
import {playfairDisplayFont, openSansFont} from '../../App'
import LandingPageAboveFold from '../../assets/LandingPageAboveFold.png'
import LandingPageLab from '../../assets/LandingPageLab.png'
import {ReactComponent as Logos} from '../../assets/columbia_and_sage_logo.svg'
import { NavLink } from 'react-router-dom'

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
  heroJoinButton: {
    height: '36px',
    width: '100px',
    marginBottom: '80px'
  },
  navLink: {
    paddingLeft: '60px',
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
    maxWidth: '600px'
  },
  labTextDiv: {
    padding: '40px 25px'
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
    lineHeight: '25pt'
  }
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
            </div>
            <NavLink
              to="/eligibility"
              className={classes.navLink}
            >
              <Button
                color="primary"
                variant="contained"
                className={classes.heroJoinButton}
              >
              Join Us
              </Button>
            </NavLink>
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
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <div className={classes.labImageDiv}>
              <img src={LandingPageLab} alt="Lab" width="100%" />
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

        <h1>Why Participate? </h1>
        <div className="Intro__content2">
          <p>
            {' '}
            There is an urgent need to come together as a community to rapidly
            advance our understanding of COVID-19. By sharing your experience in
            recovering from COVID-19, you can help scientists answer critical
            questions such as: Why do some people experience very mild symptoms
            while others get very sick? How does the body fight this virus? What
            levels of antibodies are needed to protect us from reinfection and
            how long might any immunity last? How does recovering from COVID-19
            impact your health over time?{' '}
          </p>
          <p>
            Your participation may also help save lives. Participants who
            undergo serological testing and test positive for antibodies can
            choose to donate plasma and help those still fighting for survival
            from COVID-19.
          </p>
        </div>

        <h1> How it works </h1>
        <div className="Intro__content3">
          <p>
            {' '}
            There is an urgent need to come together as a community to rapidly
            advance our understanding of COVID-19. By sharing your experience in
            recovering from COVID-19, you can help scientists answer critical
            questions such as: Why do some people experience very mild symptoms
            while others get very sick? How does the body fight this virus? What
            levels of antibodies are needed to protect us from reinfection and
            how long might any immunity last? How does recovering from COVID-19
            impact your health over time?{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Intro
