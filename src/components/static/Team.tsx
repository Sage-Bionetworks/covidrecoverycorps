import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Grid, Hidden } from '@material-ui/core'
import {playfairDisplayFont, openSansFont} from '../../App'
import AboutPageAboveFold from '../../assets/AboutPageAboveFold.png'
import AboutPageAboveFoldMobile from '../../assets/AboutPageAboveFold_mobile.png'
import Wendy from '../../assets/Wendy.png'
import Lara from '../../assets/Lara.jpg'
import {ReactComponent as ColumbiaLogo} from '../../assets/columbia_logo.svg'
import {ReactComponent as SageLogo} from '../../assets/sage_logo.svg'

import { NavLink, Link } from 'react-router-dom'
import BlueSeparator from './BlueSeparator'
import {useIntroStyles} from './Intro'

type TeamProps = {
}

export const useStyles = makeStyles(theme => ({
  heroImage: {
    width: '100%',
    height: 'auto',
  },
  paperHeaderText: {
    maxWidth: '850px'
  },
  profile: {
    padding: '50px 10px'
  },
  profileImage: {
    width: '100%',
    padding: '20px 40px'
  },
  paddingBottom20: {
    paddingBottom: '20px'
  },
  quoteTextContainer: {
    padding: '0px 20px 60px 20px'
  },
  greenBox: {
    backgroundColor: '#90CCCC',
    padding: '50px 30px 50px 30px',
    display: 'flex',
    justifyContent: 'center'
  },
}))
export const Team: React.FunctionComponent<TeamProps> = ({

}: TeamProps) => {
  const introClasses = useIntroStyles()
  const classes = useStyles()
  return (
    
    <div className="Intro">
       <div>
         <div>
            <Hidden smUp>
              <img className={classes.heroImage} src={AboutPageAboveFoldMobile}/>
            </Hidden>
            <Hidden xsDown>
              <img className={classes.heroImage} src={AboutPageAboveFold}/>
            </Hidden>
         </div>
         <div className={introClasses.paperHeaderDiv}>
          <div className={`${classes.paperHeaderText} ${introClasses.paperHeaderText}`}>
            <h3>The COVID Recovery Corps is a citizen-powered research study to learn more about COVID-19 and make progress in the global fight.</h3>            
          </div>
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={introClasses.paperPanelWrapper}
        >
          <Grid item xs={12} md={10} lg={8}>
            <div className={introClasses.paperPanel}>
              <div className={introClasses.paperPanelTitle}>
                <span>Study leadership&nbsp;</span>
              </div>
              <Hidden xsDown>
                <BlueSeparator />
              </Hidden>
              <div className={introClasses.paperPanelStepBody}>
                <p>Led by Columbia University and Sage Bionetworks, the study aims to enable those who have recovered from COVID-19 to help scientists answer key questions - about how the body fights coronavirus and whether and how often infection affords immunity. Starting in the New York metropolitan area - the epicenter of the pandemic in the United States - participants will be part of a powerful dataset that may lead to scientific advances to help save lives. </p>
              </div>
              {/* Wendy's profile */}
              <Grid
                className={classes.profile}
                container
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm={6}>
                <img className={classes.profileImage} src={Wendy}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h3 className={introClasses.paperPanelStepTitle}>Dr. Wendy Chung</h3>
                  <div className={introClasses.paperPanelStepBody}>
                    <p>Dr. Wendy Chung is a co-Principal Investigator based at Columbia University with oversight over clinical operations. Dr Chung is an ABMG board certified clinical and molecular geneticist with 20 years of experience in clinical research, largely for rare diseases.  She leads the Precision Medicine Resource of the Irving Institute at Columbia University and is the principal investigator of the large U.S. study of autism, SPARK.</p>
                    <p>She works with many patient and family led organizations to develop better supports and treatments for rare diseases and was recognized by the National Organization of Rare Disorders with the Rare Impact Award in 2019.  She was recently featured in the documentary, The Gene: An Intimate History.</p>
                    <p>For more information, please visit <a href="https://www.columbia.edu">www.columbia.edu</a>.</p>
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
                <img className={classes.profileImage} src={Lara}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h3 className={introClasses.paperPanelStepTitle}>Dr. Lara Mangravite</h3>
                  <div className={introClasses.paperPanelStepBody}>
                      <div className={classes.paddingBottom20}>Dr. Lara Mangravite is a co-Principal Investigator with oversight over technology, governance, and data commons. Dr. Mangravite has extensive experience leading projects at Sage Bionetworks. She favors applying collaborative approaches to advance understanding of disease biology and treatment outcomes at a systems level with the overriding goal of improving clinical care. </div>
                      <div className={classes.paddingBottom20}>Dr. Mangravite obtained a BS in Physics from the Pennsylvania State University and a PhD in Pharmaceutical Chemistry from the University of California, San Francisco. She completed a postdoctoral fellowship in cardiovascular pharmacogenomics at the Children’s Hospital Oakland Research Institute.</div>
                      <div>For more information, please visit <a href="https://www.sagebionetworks.org">www.sagebionetworks.org</a>.</div>
                  </div>
                  <SageLogo />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={8} lg={6}>
            <div className={classes.quoteTextContainer}>
              <h3 className={introClasses.paperPanelStepTitle}>“As a COVID-19 survivor community, we can give researchers a real shot at understanding - and beating - this disease. Own your recovery. Give back, support science, and save lives!”</h3>                
              <div>
                Diana Berrent, Founder, Survivor Corps
              </div>
            </div>
          </Grid>
        </Grid>

        <div className={classes.greenBox}>
          <Grid item xs={12} md={10} lg={8}>
            <h2>With support from the Chan Zuckerberg Initiative</h2>
            <div className={introClasses.labTextBodyDiv}>
              <p>
                Founded by Dr. Priscilla Chan and Mark Zuckerberg <br></br>in 2015, the Chan Zuckerberg Initiative (CZI) is a new kind of philanthropy that’s leveraging technology to help solve some of the world’s toughest challenges — from eradicating disease, to improving education, to reforming the criminal justice system. Across three core Initiative focus areas of Science, Education, and Justice & Opportunity, we’re pairing engineering with grant-making, impact investing, and policy and advocacy work to help build an inclusive, just and healthy future for everyone. 
              </p>
            </div>
            <p>
              For more information, please visit <br></br>
              <a href="https://www.chanzuckerberg.com">www.chanzuckerberg.com</a>.
            </p>
          </Grid>
        </div>

      </div>
    </div>
  )
}

export default Team
