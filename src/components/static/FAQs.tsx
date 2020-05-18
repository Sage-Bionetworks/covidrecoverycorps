import React from 'react'
import { makeStyles, Grid, Hidden } from '@material-ui/core'
import {useIntroStyles} from './Intro'
import BlueSeparator from './BlueSeparator'
import LearnMore from '../widgets/LearnMore'
import {ReactComponent as Graphic} from '../../assets/faqs_graphic.svg'

type FAQProps = {
  reason?: string
}

export const useStyles = makeStyles(theme => ({
  paperHeaderDiv: {
    backgroundColor: '#FC9090',
  },
  graphicDiv: {
    textAlign: 'center',
    padding: '50px 0px 0px 30px'
  }
}))
export const FAQs: React.FunctionComponent<FAQProps> = ({}: FAQProps) => {
  const introClasses = useIntroStyles()
  const classes = useStyles()
  return (
    <div>
      <div className={`${classes.paperHeaderDiv} ${introClasses.paperHeaderDiv}`}>
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
              <span>FAQs</span>
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
              <Grid item xs={12} md={8}>
                <div>
                  <div className="FAQ__content1">
                    <h2> What is the COVID Recovery Corps study? </h2>
                    <LearnMore learnMoreText="" defaultIsShowing={true}>
                      <div>
                        <p>
                          COVID Recovery Corps is a research study. If you join, we will gather
                          data about you. We will ask you to fill out a survey. We might invite
                          you to send us your electronic health data, this is optional. We might
                          invite you to give a blood sample, have your nose or rectum swabbed,
                          to spit, or to pee in a cup. Researchers will use this data to study
                          how the body fights COVID-19. Researchers may also use it to study
                          other diseases like high blood pressure, diabetes, and lung diseases
                          that seem connected to how the body responds to COVID-19.
                        </p>
                        <p>
                          Researchers will have to be approved by COVID Recovery Corps study to use these data.
                          These researchers may be from anywhere in the world. They may work for
                          commercial companies, like drug companies. Their research will be on
                          COVID-19 and related viruses.
                        </p>
                      </div>
                    </LearnMore>                
                  </div>

                  <div className="FAQ__content2">
                    <h2>What is the goal of this study?</h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          The goal of this study is collect data from people who have recovered
                          from COVID-19 to learn more about how the body fights this disease.
                          Researchers also want to collect information on how other diseases
                          like high blood pressure, diabetes, and lung diseases may be connected
                          to how the body responds to COVID-19.
                        </p>
                      </div>
                    </LearnMore>
                  </div>

                  <div className="FAQ__content2">
                    <h2>What is the goal of this study?</h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          The goal of this study is collect data from people who have recovered
                          from COVID-19 to learn more about how the body fights this disease.
                          Researchers also want to collect information on how other diseases
                          like high blood pressure, diabetes, and lung diseases may be connected
                          to how the body responds to COVID-19.
                        </p>
                      </div>
                    </LearnMore>
                  </div>

                  <div className="FAQ__content3">
                    <h2>Who is eligible to participate</h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          You are eligible to participate in the study, if you: Over the age of
                          18 years old and are able to consent to participate in the study Have
                          access to email or able to receive text messages Have been diagnosed
                          with or believe you have had COVID-19 Read or understand English or
                          Spanish
                        </p>
                      </div>
                    </LearnMore>
                  </div>

                  <div className="FAQ__content4">
                    <h2>
                      I have never been diagnosed with coronavirus. Can I participate?
                    </h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          At this time we are only enrolling participants who have been
                          diagnosed with or believe they have had the symptoms of COVID-19.
                        </p>
                      </div>
                    </LearnMore>
                  </div>

                  <div className="FAQ__content5">
                    <h2>Are there any costs for me to participate?</h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          There are no direct costs to taking part in the COVID Recovery Corps.
                        </p>
                      </div>
                    </LearnMore>
                  </div>
                  <div className="FAQ__content6">
                    <h2>Who is running the COVID Recovery Corps study?</h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          The COVID Recovery Corps study is being led by Columbia University and
                          Sage Bionetworks in collaboration with the Chan Zuckerberg Initiative.
                          The Principal Investigators on this study are Dr. Wendy Chung at
                          Columbia University and Dr. Lara Mangravite at Sage Bionetworks. This
                          study is funded by the Chan Zuckerberg Initiative.
                        </p>
                      </div>
                    </LearnMore>
                  </div>
                  <div className="FAQ__content7">
                    <h2>Who else will have access to my study data?</h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          We will create a scientific database and a biobank for the COVID
                          Recovery Corps study. The scientific database will have
                          individual-level data and the biobank will store your samples like
                          your blood, and pee.
                        </p>
                        <p>
                          Access to this database will be controlled. Researchers will have to
                          be approved by COVID Recovery Corps and will use only de-identified
                          data.
                        </p>
                        <p>
                          The US and state governments might demand access to the data so they
                          can use it for public health activity. This includes law enforcement.
                          We might have to give it to them if they ask, even though we have a
                          Certificate of Confidentiality from the US government.
                        </p>
                        <p>
                          We may offer you the chance to donate your data to other databases or
                          researchers. You will get to decide if you want to share your data
                          beyond this study.
                        </p>
                      </div>
                    </LearnMore>
                    
                  </div>
                  <div className="FAQ__content8">
                    <h2>How is my privacy protected?</h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          We are committed to protecting your privacy. Except as required by
                          law, you will not be identified by your name or by any other direct
                          personal identifier. Your contact information, including your name and
                          e-mail address will be stored separately from the study data. We will
                          use a random code number instead of your name on all your study data.
                          This code cannot be used to directly re-identify you. Information
                          about the code will be kept in a secure system. Only the study staff
                          and some IT staff will have the key to associate your coded study data
                          to your name and account information. Your coded study data (without
                          your name) will be encrypted and stored on a secure cloud server to
                          prevent improper access. Sage, Columbia University or anyone else
                          affiliated with the COVID Recovery Corps will never sell, rent, or
                          lease your contact information.
                        </p>
                      </div>
                    </LearnMore>
                  </div>
                  <div className="FAQ__content9">
                    <h2>
                      Will participating in this study affect my insurance or medical
                      services?
                    </h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          The COVID Recovery Corps is an observational study and not a clinical
                          trial. We will not be asking you to change what you do or take a
                          specific medication. This study will not affect your medical insurance
                          or healthcare.
                        </p>
                      </div>
                      </LearnMore>
                  </div>
                  <div className="FAQ__content10">
                    <h2>
                      I have a question that isn't answered in this FAQ. Who do I contact?
                    </h2>
                    <LearnMore learnMoreText="">
                      <div>
                        <p>
                          If you have any questions or need assistance, you can call 212-305-5700 or email <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">COVIDRecoveryCorps@cumc.columbia.edu</a>.
                        </p>
                      </div>
                    </LearnMore>
                  </div>
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
        </Grid>
      </Grid>
      
    </div>


  )
}

export default FAQs
