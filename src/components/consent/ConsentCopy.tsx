import React from 'react'

export type StepInfo = {
  isSummary: boolean
  step: number
}

export type ConsentCopyProps = {
  stepInfo?: StepInfo
  screen?: string
  isEHR?: boolean
}

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eu orci quis posuere. Maecenas pulvinar nulla vel lacus malesuada, nec dapibus ipsum egestas. Integer vitae nunc iaculis, rhoncus neque a, imperdiet diam. Sed vulputate rhoncus elit eu pellentesque. In aliquam dui tellus, eu pellentesque massa dictum quis. Nulla facilisi. Ut quis augue ac diam ullamcorper commodo et vitae tellus. Maecenas quis laoreet mauris, a volutpat odio. Nam quis tellus a turpis accumsan rutrum. Nulla sed mi id augue pretium bibendum. Sed mollis, metus eu egestas mattis, nibh metus mollis odio, nec cursus arcu lectus a diam. Nunc hendrerit nibh ac pharetra semper. Nulla vel est sem.


Pellentesque semper pharetra ligula, ac faucibus lorem fermentum et. Morbi ultrices nulla quis iaculis mollis. Praesent molestie mi at pretium consectetur. Ut malesuada lacinia malesuada. Curabitur efficitur dolor at cursus tincidunt. Sed dictum ligula hendrerit ultrices ornare. Quisque quis ligula sit amet est dictum volutpat vitae consequat ipsum. Nam auctor, mauris eget ullamcorper eleifend, nunc nibh sodales odio, vel eleifend magna velit et nibh. Suspendisse lectus dui, dictum eget elementum ut, sodales sit amet nunc. Nulla ex diam, tincidunt a velit eu, rutrum lobortis turpis. Duis consectetur lorem vitae arcu lobortis, vel egestas libero viverra. Nullam lacinia bibendum leo id mattis. Duis interdum augue eros, id luctus velit finibus eleifend. Aliquam sapien purus, condimentum vel lacus vehicula, commodo imperdiet dolor.
 vitae velit semper, vel sagittis leo lobortis. Sed ultrices libero justo, vitae efficitur nulla egestas in. Vivamus ac lacinia mauris, et vulputate neque. Vivamus eros nisi, porttitor sit amet tellus ac, vulputate auctor lorem. Cras laoreet felis mauris, vel tincidunt eros interdum tincidunt. Quisque odio justo, pharetra sed facilisis sed, egestas congue mi. Aliquam ex tortor, fermentum egestas tellus at, lobortis dapibus elit. Curabitur tincidunt turpis lorem.`

const summaryScreens = [
  <div>
    <h2>About the Study</h2>

    <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>.
    </p>

  </div>
  ,

  <div>
    <h2>What will I be asked to do?</h2>
    <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>.
    </p>
 
  </div>
  ,
  <div>[intentionally blank -  quiz screen]</div>
  ,
  <div>
    <h2>What are the benefits?</h2>
    <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>.
    </p>
  
  </div>,

<div>[intentionally blank -  quiz screen]</div>

  ,
  <div>
    <h2>What are the risks?</h2>
    <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>.
    </p>
  
  </div>
  ,
  <div>
    <h2>Your Data and Privacy</h2>
    <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>.
    </p>
 
  </div>,
    <div>[intentionally blank -  quiz screen]</div>
    ,
   <div>
   <h2>Sharing your data with future researchers</h2>
   <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

   <p className="Consent__copy">
     The goal of the study is to collect information from participants on how
     the <b> body fights COVID-19</b>.
   </p>
   <p className="Consent__copy">
     If you decide to join this study, we will ask you to complete a
     <b> survey</b>.
   </p>
   <p className="Consent__copy">
     We may also ask you to provide a spit, blood, nasal or fecal swab sample.
     This study will last at least for <b>12 months</b>.
   </p>

 </div>
 ,
 <div>[intentionally blank -  quiz screen]</div>
 ,
 <div>
   <h2>Not Medical Care</h2>
   <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

   <p className="Consent__copy">
     The goal of the study is to collect information from participants on how
     the <b> body fights COVID-19</b>.
   </p>
   <p className="Consent__copy">
     If you decide to join this study, we will ask you to complete a
     <b> survey</b>.
   </p>
   <p className="Consent__copy">
     We may also ask you to provide a spit, blood, nasal or fecal swab sample.
     This study will last at least for <b>12 months</b>.
   </p>
 
 </div>
 ,

 <div>
   <h2>Leaving the study</h2>
   <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

   <p className="Consent__copy">
     The goal of the study is to collect information from participants on how
     the <b> body fights COVID-19</b>.
   </p>
   <p className="Consent__copy">
     If you decide to join this study, we will ask you to complete a
     <b> survey</b>.
   </p>
   <p className="Consent__copy">
     We may also ask you to provide a spit, blood, nasal or fecal swab sample.
     This study will last at least for <b>12 months</b>.
   </p>

 </div>,
 <div>
 <h2>Things you should consider before you say yes</h2>
 <p className="Consent__copy">COVID Recovery Corps is a <b>research study.</b></p>

 <p className="Consent__copy">
   The goal of the study is to collect information from participants on how
   the <b> body fights COVID-19</b>.
 </p>
 <p className="Consent__copy">
   If you decide to join this study, we will ask you to complete a
   <b> survey</b>.
 </p>
 <p className="Consent__copy">
   We may also ask you to provide a spit, blood, nasal or fecal swab sample.
   This study will last at least for <b>12 months</b>.
 </p>

</div>
,

<div>
 <h2>How to contact us?</h2>
 <p className="Consent__copy">sCOVID Recovery Corps is a <b>research study.</b></p>

 <p className="Consent__copy">
   The goal of the study is to collect information from participants on how
   the <b> body fights COVID-19</b>.
 </p>
 <p className="Consent__copy">
   If you decide to join this study, we will ask you to complete a
   <b> survey</b>.
 </p>
 <p className="Consent__copy">
   We may also ask you to provide a spit, blood, nasal or fecal swab sample.
   This study will last at least for <b>12 months</b>.
 </p>
 .
</div>
]

const fullTextScreens = [
  <div>
    <h2>About the Study</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study</b>. If you join, we will <b>gather data about you </b>.
    </p>

    <p className="Consent__copy">
      We will ask you to fill out a <b>survey</b>. We might invite you to send
      us your <b>electronic health data</b>, this is <b>optional</b>.
    </p>
    <p className="Consent__copy">
      We might invite you to give a <b> blood sample</b>, have your nose or
      rectum swabbed, to spit, or to pee in a cup.
    </p>
    <p className="Consent__copy">
      Researchers will use this data to
      <b>study how the body fights</b> COVID-19.
    </p>
    <p className="Consent__copy">
      Researchers may also use it to<b> study other diseases</b> like high blood
      pressure, diabetes, and lung diseases that seem connected to how the body
      responds to COVID-19.
    </p>

    <p className="Consent__copy">
      Researchers will have to be <b> approved by NY Strong </b> to use these
      data. These researchers may be from <b>anywhere </b>in the world.
    </p>
    <p className="Consent__copy">
      They may work for <b>commercial </b>companies, like
      <b>drug companies</b>. Their research will be on COVID-19 and related
      viruses.
    </p>
    <p className="Consent__copy">
      This study will last for <b> at least twelve months</b>.
    </p>
  </div>,
  <div>
    <h2>What will I be asked to do?</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>What are the benefits?</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>What are the risks?</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>Your Data and Privacy</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>Sharing your data with future researchers</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>Not Medical Care</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>Leaving the study</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>Things you should consider before you say yes</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
  <div>
    <h2>How to contact us?</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is a <b>research study.</b>
    </p>
    <p className="Consent__copy">
      The goal of the study is to collect information from participants on how
      the <b> body fights COVID-19</b>.
    </p>
    <p className="Consent__copy">
      If you decide to join this study, we will ask you to complete a
      <b> survey</b>.
    </p>
    <p className="Consent__copy">
      We may also ask you to provide a spit, blood, nasal or fecal swab sample.
      This study will last at least for <b>12 months</b>
    </p>
    .
  </div>,
]

const ehrScreens = [
  <div>
    <h2>
      Please understand the benefits &amp; risks of sharing your electronic
      health records{' '}
    </h2>
    <p className="Consent__copy">
      HIPAA stands for Health Insurance Portability and Accountablity Act of
      1996, a federal law to protect your health information from being
      disclosed without your consent or knowledge. The following sections will
      outline the benefits and risks. Please take your time to go over it.{' '}
    </p>
  </div>,
  <div>
    <h2> HIPAA Authorization</h2>
    <p className="Consent__copy">
      This form tells about giving NY Strong access to your EHR (electronic
      health records). We will only be able to access your EHR if you sign this
      form. Health records are the data collected when you get healthcare.
      Electronic health records, or EHR, are when these data are kept in secure
      electronic systems. Please read this form carefully. Take all the time you
      need to decide if you would like to give us access to your EHR. Ask any
      questions you have. You can say yes or no to signing this form. Your
      choice will not affect your medical care. You can still be part of{' '}
      <b>NY Strong</b> study if you say no.{' '}
    </p>
  </div>,
]

const screens: { [key: string]: JSX.Element } = {
  INTRO:   <p className="Consent__copy">intro + {loremIpsum}</p>,
  CONSENT_SIGNATURE1: <p className="Consent__copy">If you understand and agree to the benefits &amp; risk of participating in this study. Please sign below.</p>,
  CONSENT_SIGNATURE2: <p className="Consent__copy">My data will be stored in the NY Strong databases. If I give a blood, urine, nose, anal, or saliva sample, it will be stored at the NY Strong biobank. This includes my DNA or genetic material. Information that researchers learn by studying my samples will be stored in the NY Strong databases. Researchers will do COVID-19 studies using the NY Strong databases and biobank. They may also do research on other health conditions that are related to how the body responds to COVID-19. If my sample is used up, I may be asked to give another blood sample. I can say yes or no. My contact information may be used to tell me about other studies. I can withdraw (quit) at any time. There is no penalty if I withdraw. </p>,
  CONSENT_SHARING: <div><p >By default, you are sharing your data with this study only. </p><p>
    Would you like to share your study data with other qualified researchers for future research on COVID related work?</p></div>,
  HIPAA_LAST_INTRO: (
    <p className="Consent__copy">
      If you understand and agree to the benefits &amp; risk of participating in
      this study. Please sign below.
    </p>
  ),
  HIPAA_LAST_TERMS: (
    <p className="Consent__copy">
      My data will be stored in the NY Strong databases. If I give a blood,
      urine, nose, anal, or saliva sample, it will be stored at the NY Strong
      biobank. This includes my DNA or genetic material. Information that
      researchers learn by studying my samples will be stored in the NY Strong
      databases. Researchers will do COVID-19 studies using the NY Strong
      databases and biobank. They may also do research on other health
      conditions that are related to how the body responds to COVID-19. If my
      sample is used up, I may be asked to give another blood sample. I can say
      yes or no. My contact information may be used to tell me about other
      studies. I can withdraw (quit) at any time. There is no penalty if I
      withdraw.
    </p>
  ),
  HIPAA_LAST_CHECKBOX: (
    <>
      I have read this consent form (or someone read it to me). I understand the
      information in this form. All of my questions have been answered. I freely
      and willingly choose to take part in NY Strong.
    </>
  ),
}

export const ConsentCopy: React.FunctionComponent<ConsentCopyProps> = ({
  stepInfo,
  screen,
  isEHR,
}: ConsentCopyProps) => {
  if (screen) {
 
      return screens[screen]
  
  }

  if (stepInfo && !isEHR) {
    return stepInfo.isSummary
      ? summaryScreens[stepInfo.step]
      : fullTextScreens[stepInfo.step]
  }
  if (stepInfo && isEHR) {
    return ehrScreens[stepInfo.step]
  }

  return <></>
}

export default ConsentCopy
