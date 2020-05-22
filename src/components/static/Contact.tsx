import React from 'react'
import { makeStyles, Grid, Hidden, Container } from '@material-ui/core'
import { useIntroStyles } from './Intro'
import BlueSeparator from './BlueSeparator'
import { Link } from 'react-router-dom'
import { ReactComponent as Graphic } from '../../assets/contact_us_graphic.svg'

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
  return (
    <div>
      <div
        className={`${classes.paperHeaderDiv} ${introClasses.paperHeaderDiv}`}
      ></div>
      <Container maxWidth="md" className={introClasses.paperPanelWrapper}>
        <div className={introClasses.paperPanel}>
          <div className={introClasses.paperPanelTitle}>
            <h1>Contact Us</h1>
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
            <Grid item xs={12} md={8} className={introClasses.paperPanelStepContainer}>
              <div className="Contact__content1">
                <p>
                  For information about participating and questions related to
                  the study, visit the <Link to="/faqs">FAQ</Link> section of
                  the site. If you have additional questions, please send us a
                  message.
                </p>
                <p>
                  COVID-19 Recovery Corps is a research study. This study does
                  not provide medical advice, diagnosis, or treatment of any
                  kind. If you have questions about your health, talk to your
                  healthcare team. Do not use the information provided on the
                  study website or email correspondence in place of advice
                  from your healthcare team.
                </p>
                <p>
                  Sage Bionetworks, Columbia University, and the Chan
                  Zuckerberg Initiative are not liable or responsible for any
                  advice, course of treatment, diagnosis or any other
                  information, services, or products you obtain through the
                  study.
                </p>
                <h3>
                  If you have any questions at any time before, during, or
                  after the study, contact:
                </h3>
                <p>
                  Dr. Wendy Chung, MD, PhD, Principal Investigator of the
                  study. If you have any questions or need assistance, you can
                  call <b>212-305-5700</b> or email
                  <br></br>
                  <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
                    COVIDRecoveryCorps@cumc.columbia.edu
                  </a>
                  .
                </p>
                <h3>Privacy</h3>
                <p>
                  For questions, comments, or requests regarding 
                  the <Link to='privacypolicy'>privacy policy</Link> or 
                  our processing of your information, please contact:
                  <br></br>
                  <a href="mailto:privacypolicy@sagebionetworks.org">
                    privacypolicy@sagebionetworks.org
                  </a>
                  .
                </p>
                <h3>Independent Review</h3>
                <p>
                  The Western Institutional Review Board (WIRB) oversees the
                  COVID Recovery Corps study. Contact WIRB if you have
                  questions or concerns about your rights as a participant in
                  this study.{' '}
                </p>

                <p>
                  <b>Western Institutional Review Board® (WIRB®)</b>
                  <br></br>
                  1019 39th Avenue SE<br></br>
                  Suite 120<br></br>
                  Puyallup, WA 98374-2115<br></br>
                  <b>800-562-4789</b> or <b>360-252-2500</b> <br></br>
                  <a href="mailto:Help@wirb.com">Help@wirb.com</a>
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
