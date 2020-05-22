import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Grid, Hidden, Container } from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import AboutPageAboveFold from '../../assets/AboutPageAboveFold.png'
import AboutPageAboveFoldMobile from '../../assets/AboutPageAboveFold_mobile.png'
import Wendy from '../../assets/Wendy.png'
import Lara from '../../assets/Lara.jpg'
import SurvivorCorps from '../../assets/TeamPageSurvivorCorps.png'
import { ReactComponent as ColumbiaLogo } from '../../assets/columbia_logo.svg'
import { ReactComponent as SageLogo } from '../../assets/sage_logo.svg'
import { ReactComponent as CZILogo } from '../../assets/czi_logo_dark.svg'
import BlueSeparator from './BlueSeparator'
import { useIntroStyles } from './Intro'

type TeamProps = {}

export const useStyles = makeStyles(theme => ({
  heroImage: {
    width: '100%',
    height: 'auto',
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
}))
export const Team: React.FunctionComponent<TeamProps> = ({ }: TeamProps) => {
  const introClasses = useIntroStyles()
  const classes = useStyles()
  return (
    <div className="Intro">
      <div>
        <div>
          <Hidden smUp>
            <img className={classes.heroImage} src={AboutPageAboveFoldMobile} />
          </Hidden>
          <Hidden xsDown>
            <img className={classes.heroImage} src={AboutPageAboveFold} />
          </Hidden>
        </div>
        <div className={introClasses.paperHeaderDiv}>
          <Container maxWidth="md">
            <h3
              className={introClasses.paperHeaderText}
            >
              The COVID Recovery Corps is a citizen-powered research study to
              learn more about COVID-19 and make progress in the global fight.
            </h3>
          </Container>
        </div>
        <Container maxWidth="md" className={introClasses.paperPanelWrapper}>
          <div className={introClasses.paperPanel}>
            <div className={introClasses.paperPanelTitle}>
              <h2>Study Leadership</h2>
            </div>
            <Hidden xsDown>
              <BlueSeparator />
            </Hidden>
            <div className={introClasses.paperPanelStepContainer}>
              <div className={introClasses.paperPanelStepBody}>
                <p>
                  Led by Columbia University and Sage Bionetworks, the study
                  aims to enable those who have recovered from COVID-19 to
                  partner with scientists to answer key questions &mdash; about how
                  the body fights coronavirus and whether and how often
                  infection affords immunity. Starting in the New York
                  metropolitan area &mdash; the epicenter of the pandemic in the
                  United States &mdash; participants will help build a powerful
                  dataset that may significantly advance science and help save
                  lives.
                </p>
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
                  Dr. Wendy Chung
                </h3>
                <div className={introClasses.paperPanelStepBody}>
                  <p>
                    Dr. Wendy Chung is a co-Principal Investigator based at
                    Columbia University with oversight over clinical
                    operations.
                    Dr Chung is an ABMG board certified clinical and molecular
                    geneticist with 20 years of experience in clinical
                    research, largely for rare diseases. She leads the
                    Precision Medicine Resource of the Irving Institute at
                    Columbia University and is the principal investigator of
                    the large U.S. study of autism, SPARK.
                  </p>
                  <p>
                    She works with many organizations to improve the support and 
                    treatment of rare disease for patients and family members. 
                    Dr. Chung was recognized by the National Organization of 
                    Rare Disorders with the Rare Impact Award in 2019.
                    She was recently featured in the documentary,{' '}
                    <a href="https://www.pbs.org/show/gene/" target="_blank">
                      The Gene: An Intimate History
                    </a>.
                  </p>
                  <p>
                    For more information, please visit{' '}
                    <a href="https://www.columbia.edu" target="_blank">www.columbia.edu</a>.
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
                  Dr. Lara Mangravite
                </h3>
                <div className={introClasses.paperPanelStepBody}>
                  <div className={classes.paddingBottom20}>
                    <p>
                      Dr. Lara Mangravite is a co-Principal Investigator with
                      oversight over technology, governance, and data commons.
                      Dr. Mangravite has extensive experience leading projects
                      at Sage Bionetworks. She favors applying collaborative
                      approaches to advance understanding of disease biology and
                      treatment outcomes at a systems level with the overriding
                      goal of improving clinical care.{' '}
                    </p>
                  </div>
                  <div className={classes.paddingBottom20}>
                    <p>
                      Dr. Mangravite obtained a BS in Physics from the
                      Pennsylvania State University and a PhD in Pharmaceutical
                      Chemistry from the University of California, San
                      Francisco. She completed a postdoctoral fellowship in
                      cardiovascular pharmacogenomics at the Children’s Hospital
                      Oakland Research Institute.
                    </p>
                  </div>
                  <div>
                    <p>
                      For more information, please visit{' '}
                      <a href="https://www.sagebionetworks.org" target="_blank">
                        www.sagebionetworks.org
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <SageLogo />
              </Grid>
            </Grid>

            {/* Survivor Corps callout */}
            <Grid
              container
              justify="center"
              alignItems="flex-start"
            >
              <div className={introClasses.paperPanelTitle}>
                <h2>In partnership with Survivor Corps</h2>
              </div>
              <Hidden xsDown>
                <BlueSeparator />
              </Hidden>

              <Grid
                container
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm={6}>
                  <img className={classes.profileImage} src={SurvivorCorps} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={classes.paddingBottom20}>
                    <p>
                      Survivor Corps is a rapidly growing grassroots network of more than 45,000 COVID-19 survivors and family members who have first-hand experience with the virus. They are motivated to help others navigate the illness and find a pathway to recovery. Founded by Diana Berrent, Survivor Corps is mobilizing these survivors to donate plasma and to support ongoing scientific, medical and academic research to identify and improve treatments, understand the disease, and develop a vaccine.
                    </p>
                  </div>
                  <p>
                    For more information, please visit <br></br>
                    <a href="https://www.survivorcorps.com" target="_blank">
                      www.survivorcorps.com
                    </a>
                    .
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Container>

        <div className={classes.greenBox}>
          <Container maxWidth="md">
            <h2>With support from the Chan Zuckerberg Initiative</h2>
            <div className={introClasses.labTextBodyDiv}>
              <p>
                Founded by Dr. Priscilla Chan and Mark Zuckerberg in 2015, the
                Chan Zuckerberg Initiative (CZI) is a new kind of philanthropy
                that’s leveraging technology to help solve some of the world’s
                toughest challenges — from eradicating disease, to improving
                education, to reforming the criminal justice system. Across
                three core Initiative focus areas of Science, Education, and
                Justice &amp; Opportunity, we’re pairing engineering with
                grant-making, impact investing, and policy and advocacy work to
                help build an inclusive, just and healthy future for everyone.
              </p>
            </div>
            <p className={classes.paddingBottom20}>
              For more information, please visit <br></br>
              <a href="https://www.chanzuckerberg.com" target="_blank">
                www.chanzuckerberg.com
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
