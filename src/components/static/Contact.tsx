import React from 'react'



type ContactProps = {
  reason?: string
}

export const Contact: React.FunctionComponent<ContactProps> = ({}: ContactProps) => {
  return (

   <div className="Contact__content1">
             <h1>&nbsp;</h1>
        <p>
          For information about participating and questions related to the
          study, please review the FAQ. If you have additional questions, please
          send us a message.
        </p>
        <p>
          [Send us a message]
        </p>
        <p>
          This study is sponsored by:
        </p>
        <p>
          Sage Bionetworks, a 501(c)(3) nonprofit research organization located
          at 2901 3rd Ave, Seattle, WA 98121.
        </p>
        <p>
          Columbia University,
        </p>
        <p>
          Chan Zuckerberg Initiative
        </p>
        <p>
          NAME OF STUDY is a research study. This study does not provide medical
          advice, diagnosis, or treatment of any kind. If you have questions
          about your health, talk to your healthcare team. Do not use the
          information provided on the study website or email correspondence in
          place of advice from your healthcare team.
        </p>
        <p>
          Sage Bionetworks, Columbia University, and the Chan Zuckerberg
          Initiative are not liable or responsible for any advice, course of
          treatment, diagnosis or any other information, services, or products
          you obtain through the study.
        </p>
        <p>
          If you have any questions at any time before, during, or after the
          study, contact:
        </p>
        <p>
          Dr. Wendy Chung, MD, PhD, principal investigator of the study. INSERT
          CONTACT DETAILS FOR WENDY
        </p>
        <p>
          Privacy<br />

          For questions, comments, or requests regarding the privacy policy or
          our processing of your information, please contact:
          privacypolicy@sagebionetworks.org.
        </p>
        <p>
          Technical support<br />

          Please contact our technical support team at JOHN TO INSERT
        </p>
        <p>
          Independent Review
          <br />
          The Western Institutional Review Board (WIRB) oversees the INSERT NAME
          study. Contact WIRB you have questions, concerns, or complaints about
          this study. Contact WIRB if you have questions or concerns about your
          rights as a participant in this study.
        </p>
        <p>
          Western Institutional Review Board® (WIRB®)<br />

          1019 39th Avenue SE Suite 120 Puyallup, WA 98374-2115 <br />

          1-800-562-4789 or 1-360-252-2500<br />

          Help@wirb.com.
        </p>
      </div>
 
  )
}

export default Contact
 