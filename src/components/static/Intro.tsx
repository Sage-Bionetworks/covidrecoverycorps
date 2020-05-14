import React from 'react'
import { makeStyles, Button, Grid, Hidden } from '@material-ui/core'
import {playfairDisplayFont, openSansFont} from '../../App'
import LandingPageAboveFold from '../../assets/LandingPageAboveFold.png'
import LandingPageLab from '../../assets/LandingPageLab.png'
import {ReactComponent as Logos} from '../../assets/columbia_and_sage_logo.svg'
import { NavLink } from 'react-router-dom'
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
    maxWidth: '500px',
    [theme.breakpoints.up('md')]: {
      float: 'right',
    },
  },
  labTextDiv: {
    padding: '40px 25px',
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
    border: '2px #EEEEEE solid'
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
          alignItems="center"
          spacing={2}
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
          spacing={2}
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
              <BlueSeparator></BlueSeparator>
              
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Intro
