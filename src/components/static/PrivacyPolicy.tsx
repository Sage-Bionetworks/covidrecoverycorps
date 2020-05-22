import React from 'react'
import { makeStyles, Grid, Hidden, Container } from '@material-ui/core'
import { useIntroStyles } from './Intro'
import BlueSeparator from './BlueSeparator'
import LearnMore from '../widgets/LearnMore'
import { ReactComponent as Graphic } from '../../assets/privacy_policy_graphic.svg'

export const useStyles = makeStyles(theme => ({
  paperHeaderDiv: {
    backgroundColor: '#FC9090',
  },
  graphicDiv: {
    textAlign: 'center',
    padding: '50px 0px 0px 30px',
  },
  subHeading: {
    color: '#FC9090',
    marginTop: '25px',
    fontWeight: 'bold',
  },
  address: {
    paddingLeft: '30px'
  }
}))
export const PrivacyPolicy: React.FunctionComponent = ({}) => {
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
            <h1>Privacy Policy</h1>
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
              <div>
                <div>
                  <p>
                    The COVID Recovery Corps study (the “Study”) is a
                    collaboration between Sage Bionetworks and Columbia
                    University. The Study is sponsored by the Chan Zuckerberg
                    Initiative. The goal of the Study is to collect information from
                    participants who have been diagnosed or believe they have
                    had COVID-19. Researchers will use this information to
                    better understand how the body fights COVID-19.
                  </p>
                  <p>
                    The Study is committed to protecting your online privacy.
                    This Privacy Policy explains the personal information we
                    collect about you through the Website (defined below), how
                    we use and share it, and the choices you have regarding this
                    information.
                  </p>
                  <p>
                    This Privacy Policy applies to visitors to <a href="www.covidrecoverycorps.org">www.covidrecoverycorps.org</a> (the “Website”), including
                    participants in the Study. If you don’t agree with this Privacy
                    Policy, please do not access the Website or participate in the
                    Study.
                  </p>
                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> Data We Collect From You</h3>
                    }
                  >
                    <div>
                      <p>
                        “Personal information” or “personal data” means any direct
                        information about you such as your name and contact
                        information or indirect information that could be reasonably
                        linked to you such as your device’s internet protocol address
                        (IP Address). When you visit the Website, we collect the
                        following information (collectively, “Personal Data”):
                      </p>
                      <p className={classes.subHeading}>Who You Are (“User Information”)</p>
                      <p>
                        We collect information that you provide to us during the
                        informed consent and account creation process, and in any
                        correspondence you have with us. For example, this could
                        include your name, email, and any other contact information
                        you share with us.
                      </p>
                      <p className={classes.subHeading}>Where you go on the Website (“Usage Data”)</p>
                      <p>
                        Whenever you use any online service, certain information
                        gets created and logged automatically; the same is true
                        when you visit the Website. We may collect technical data on the different
                        pages you visit on the Website. For example, we may collect
                        the date and time when you visit the Website.
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> Why We Collect This Data </h3>
                    }
                  >
                    <div>
                      <p className={classes.subHeading}>User Information</p>
                      <p>
                        We use user-reported information for any of the following:
                        <ul>
                          <li> Authenticating/administering your account </li>
                          <li> Responding to user requests, questions, and concerns</li>
                          <li> Requesting user feedback to enhance and improve the website </li>
                          <li> Sending study communications such as newsletters and other materials that may be of interest to you.</li>
                        </ul>
                      </p>
                      <p className={classes.subHeading}>Usage Data</p>
                      <p>
                        We use usage data for the following purposes:
                        <ul>
                          <li> Maintaining, securing, and enhancing the website </li>
                          <li> Detecting and remedying disruptions in our systems </li>
                          <li> Performing statistical analysis of usage patterns </li>
                          <li> Operating, maintaining, enhancing, and providing all the features of the website </li>
                        </ul>
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> To Whom/When We Disclose Data </h3>
                    }
                  >
                    <div>
                      <p>
                        We work with vendors, service providers, and other partners
                        that help us support and maintain the Website by providing
                        services on our behalf.
                      </p>
                      <p className={classes.subHeading}>Vendors/Service Providers</p>
                      <p>
                        We may rely on vendors and service providers to provide the
                        necessary hardware, software, networking, storage, and
                        related technology required to operate, support and
                        maintain the website. We required that all service providers
                        agree to put in place reasonable security to keep users
                        information confidential and secure, and to process
                        information only for performing tasks on Sage Bionetwork’s
                        behalf. We do not permit service providers to use or disclose
                        users’ information, except as necessary to their work on the
                        website.
                      </p>
                      <p>The COVID Recovery Corps website uses the following service providers:
                        <ul>
                          <li> Amazon Web Services </li>
                          <li> Google Analytics </li>
                        </ul>
                      </p>
                      <p className={classes.subHeading}>Statistical and Aggregate Information</p>
                      <p>
                        In accordance with applicable law, we may share aggregate
                        and statistical information derived from users’ information
                        with third parties for analysis.
                      </p>
                      <p className={classes.subHeading}>Compliance with Laws</p>
                      <p>
                        We may be required by law to give your user information in
                        the case of any civil, criminal, administrative, legislative, or
                        other proceedings. We will protect your privacy as much as
                        possible.
                      </p>
                      <p className={classes.subHeading}>Business Transfers</p>
                      <p>
                        If Sage Bionetworks (website’s host) goes through a
                        management or business transition such as a merger,
                        closure, sale, joint venture, assignment, transfer,
                        management reorganization, or other disposition of all or
                        any portion of Sage Bionetworks’ business, assets, or stock,
                        information or data may be transferred to a third party. In
                        such cases, we will take reasonable steps to direct the
                        transferee to use the information and data in a manner
                        consistent with this Privacy Policy.
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> How Long We Keep this Data </h3>
                    }
                  >
                    <div>
                      <p>
                        We keep the information, including personal information,
                        for as long as necessary to provide our services and to fulfill
                        any other purposes for which the information was initially
                        collected, unless otherwise required by applicable law. For
                        instance, we will keep personally identifiable information
                        related to authentication of user identity only for as long as
                        is necessary for authentication.
                      </p>
                      <p>
                        Users may edit their information or remove their
                        information by withdrawing from the study in the profile
                        settings. We will retain and archive a record of user’s
                        activities performed while the account was active to use for
                        audit purposes, legitimate business purposes, to keep with
                        our legal obligations, resolve disputes, and enforce our
                        agreements and policies.
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> Information/Data Security </h3>
                    }
                  >
                    <div>
                      <p>
                        Sage Bionetworks maintains industry standard physical,
                        organizational, technical, and administrative measures to
                        protect the personal identifiable information we collect,
                        store, or otherwise process in connection to the study
                        against accidental, unlawful, or unauthorized access,
                        destruction, disclosure, misuse, alteration, or loss.
                      </p>
                      <p>
                        The data security measures are a combination of
                        Privacy-Enhancing Technologies (PET) options and
                        policies/processes for data handling. Still, no environment is
                        100% secure. There is some risk that an unauthorized third
                        party may find a way to circumvent our security systems.
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> What We Do Not Do </h3>
                    }
                  >
                    <div>
                      <p>
                        We do not use your personal information for advertising
                        purposes. We do not sell or lease your information.
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3>Your Rights</h3>
                    }
                  >
                    <div>
                      <p>
                        You may request to access, update, correct, restrict or delete
                        the personal information you provide to us. You also have
                        the right to object to the processing of your personal
                        information under certain conditions. For all such inquiries,
                        we can be reached at the following:
                      </p>
                      <p className={classes.address}>
                        <b>Sage Bionetworks</b><br />
                        Attention: Data Protection Officer <br />
                        2901 Third Avenue, Suite 330, <br />
                        Seattle, WA 98121 <br />
                        United States of America <br /> <br />
                        <a href="mailto:privacyofficer@sagebionetworks.org">privacyofficer@sagebionetworks.org</a>
                      </p>
                      <p>
                        Upon request, we will provide you with reasonable access to
                        the personal information about you that we hold. If your
                        personal account information is deleted, your account
                        becomes deactivated.
                      </p>
                      <p>
                        You may opt-out of receiving study communications from us
                        by clicking on the “unsubscribe” link included in each such
                        communication or by notifying us by email 
                        at <a href="mailto:privacyofficer@sagebionetworks.org">privacyofficer@sagebionetworks.org</a> with 
                        the word “remove” in the subject header, and we will remove your
                        contact details from our mailing list.
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> Cross-Border Transfer of Your Information </h3>
                    }
                  >
                    <div>
                      <p>
                        Although you may access the website from a location
                        outside of the United States, the website is primarily
                        operated and managed within the United States. When we
                        transfer information and data, we will protect the
                        information and data as described in this Privacy Policy.
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> How to Contact Us </h3>
                    }
                  >
                    <div>
                      <p>
                        Sage Bionetworks is the controller of your information when
                        it is collected and processed in the context of our sites and
                        services. Our Data Protection Officer (DPO) is responsible for
                        overseeing what we do with your information and ensuring
                        we comply with applicable data protection laws. Our Data
                        Protection Officer may be contacted by emailing
                        emailing <a href="mailto:privacyofficer@sagebionetworks.org">privacyofficer@sagebionetworks.org</a> or 
                        by writing to:                        
                      </p>
                      <p className={classes.address}>
                        <b>Sage Bionetworks</b><br />
                        Attention: Data Protection Officer <br />
                        2901 Third Avenue, Suite 330, <br />
                        Seattle, WA 98121 <br />
                        United States of America <br /> <br />
                      </p>
                    </div>
                  </LearnMore>

                  <LearnMore
                    learnMoreText=""
                    clickableElement={
                      <h3> Updates </h3>
                    }
                  >
                    <div>
                      <p>
                        We may update our Privacy Policy from time to time to
                        clarify how we collect, process, store, use and disclose
                        information. We want to be as transparent as possible about
                        the changes we make to our Privacy Policy.                      
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
      </Container>
    </div>
  )
}

export default PrivacyPolicy
