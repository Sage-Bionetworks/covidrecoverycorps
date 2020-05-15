import React from 'react'
import _01 from '../../assets/consent_icons/_0.png'
import _02 from '../../assets/consent_icons/_1.png'
import _03 from '../../assets/consent_icons/_2.png'
import _04 from '../../assets/consent_icons/_3.png'
import _05 from '../../assets/consent_icons/_4.png'
import _06 from '../../assets/consent_icons/_5.png'
import _07 from '../../assets/consent_icons/_6.png'
import _08 from '../../assets/consent_icons/_7.png'
import _09 from '../../assets/consent_icons/_9.png'

export type StepInfo = {
  isSummary: boolean
  step: number
}

export type ConsentCopyProps = {
  stepInfo?: StepInfo
  screen?: string
  isEHR?: boolean
}

const summaryScreens = [
  <div>
    <h2>About the Study</h2>

    <p className="Consent__copy">
      COVID Recovery Corps is a <b> research study</b>.{' '}
    </p>

    <p className="Consent__copy">
      The goal of the study is to collect information from participants who have
      been diagnosed or believe they have had COVID-19.{' '}
    </p>

    <p className="Consent__copy">
      Researchers will use this information to{' '}
      <b>better understand how the body fights COVID-19 </b>.
    </p>

    <p className="Consent__copy">
      This study is being led by Columbia University and Sage Bionetworks. The
      study is being funded by the Chan Zuckerberg Institute.{' '}
    </p>

    <p className="Consent__copy">
      This study will <b> last for 12 months</b>.{' '}
    </p>
    <p className="Consent__copy">
      This study will <b> not provide medical care </b> for COVID-19.
      Participation in this study is <b> voluntary </b>
      and you may leave the study at any time.
    </p>
  </div>,

  <div>
    <h2>What will I be asked to do?</h2>

    <p className="Consent__copy">
      If you join the study, you will be asked to:{' '}
    </p>

    <div className="list">
      <p className="Consent__copy">
        <b>Fill out surveys</b> on your experience with COVID-19, your past and
        current health conditions, and lifestyle.{' '}
      </p>

      <p className="Consent__copy">
        The first 4 surveys may take up to 30-60 minutes total. On a monthly
        basis, we will contact you to complete a 15-minute survey.{' '}
      </p>

      <p className="Consent__copy">
        It is ok, if you don't remember or know the answer to some of the
        questions. You can pick "Prefer not to answer" for any of the questions.{' '}
      </p>
    </div>

    <p className="Consent__copy">We may ask you to provide the following:</p>

    <div className="list">
      <p className="Consent__copy">
        A <b>biosample </b>such as blood, pee, spit, sample from a nose or
        rectal swab. We may contact you to schedule a blood draw or we may mail
        you an at-home testing kit. We will provide you with instructions and
        postage to mail the kit back to our lab.{' '}
      </p>
      <p className="Consent__copy">
        If you have a <b>positive test result for COVID-19</b>, we may ask you
        to upload a picture or a scanned copy of the document to the study
        website. This is<b> optional</b>.
      </p>

      <p className="Consent__copy">
        Access to your <b>electronic health record (EHR)</b>. Your EHR contains{' '}
        <b>sensitive information </b>on your health problems, test results,
        visits to the doctor and medications. This is <b>optional </b>and you
        can still take part in the study without sharing your EHR.{' '}
      </p>

      <p className="Consent__copy">
        If you decide to share your EHR with us, you will receive a prompt to
        complete a HIPAA authorization form after this consent process.{' '}
      </p>

      <p className="Consent__copy">
        We also <b>contact</b> you to invite you to participate in other
        COVID-related research studies.
      </p>
    </div>
  </div>,

  <div>[intentionally blank - quiz 1 screen]</div>,
  <div>
    <h2>What are the benefits?</h2>
    <p className="Consent__copy">
      You may or may not benefit from volunteering for this research study. This
      study is<b> not medical treatment</b>.
    </p>

    <p className="Consent__copy">
      If you are invited to give a biosample, we will provide you with results
      from your test. These results may let you know if you have been or are now
      infected with COVID-19.{' '}
    </p>

    <p className="Consent__copy">
      The primary benefit of this study is helping researchers{' '}
      <b> better understand COVID-19 </b>and help future generations.
    </p>
  </div>,

  <div>
    <h2>What are the risks?</h2>
    <p className="Consent__copy">
      The main risk of participating in this study is to your <b> privacy</b>.
    </p>
    <p className="Consent__copy">
      We understand you are sharing and allowing us to collect sensitive health
      information from you.{' '}
    </p>

    <p className="Consent__copy">
      We take great care to <b> protect your information</b>. However, if there
      is a data breach it may be possible to identify you and your sensitive
      information may be seen by someone without your permission. This risk is{' '}
      <b> low but it is not zero</b>.
    </p>

    <p className="Consent__copy">
      COVID-19 is also a risk to public health.{' '}
      <b>
        Thus we may have to give out your data if public health authorities
        demand it.
      </b>
    </p>
    <p className="Consent__copy">
      If you give a <b>blood sample</b>, the most common risks are{' '}
      <b>brief pain and bruising</b>. Some people may become dizzy or feel
      faint. There is also a small risk of infection.
    </p>

    <p className="Consent__copy">
      If you are asked to provide a sample from a <b> nose or fecal swab </b>you
      may feel <b> brief discomfort</b>.{' '}
    </p>
  </div>,

  <div>[intentionally blank - quiz 2 screen]</div>,

  <div>
    <h2>What will you do with my data and samples?</h2>
    <p className="Consent__copy">
      We will use the data and samples to{' '}
      <b> make discoveries about COVID-19</b>.
    </p>

    <p className="Consent__copy">
      We will study who got infected with the virus and why some people
      responded differently than others.{' '}
    </p>

    <p className="Consent__copy">
      To protect your data, we will <b> use a code to identify your data </b>{' '}
      and samples rather than your name or other personal information. This{' '}
      <b>code cannot be used to directly identify you</b>.{' '}
    </p>

    <p className="Consent__copy">
      This coded data is known as <b> de-identified data</b>. Only key people
      from our study team can link your identity to your study data.{' '}
    </p>

    <p className="Consent__copy">
      Your data and samples will be{' '}
      <b> securely stored and controlled by the COVID Recovery Corps study</b>.
      Your data will be stored in the COVID Recovery Corps study database and
      your samples will be stored in the study's biobank.
    </p>
  </div>,
  <div>
    <h2>Sharing your data with future researchers</h2>
    <p className="Consent__copy">
      You will have the{' '}
      <b> opportunity to share your data with qualified researchers </b>outside
      of the COVID Recovery Corps.{' '}
    </p>

    <p className="Consent__copy">
      All qualified researchers must be{' '}
      <b>approved by the COVID Recovery Corps study team</b> and will only use
      <b>de-identified data</b>.{' '}
    </p>

    <p className="Consent__copy">
      This de-identified data does not contain identifiers like name, date of
      birth, or zip code.{' '}
    </p>

    <p className="Consent__copy">
      These researchers may be from <b>outside the United States</b> and may
      work for a non-profit institution,
      <b>commercial drug or medical</b> device companies, or be a private
      citizen.{' '}
    </p>

    <p className="Consent__copy">
      Sharing your data with qualified researchers is<b> optional </b> and you
      can change your mind at any time by updating your data sharing options in
      your profile.{' '}
    </p>

    <p className="Consent__copy">
      But once we <b>share your data we cannot get it back</b>. If you decide to
      end data sharing, we will not share your <b>future data</b>.
    </p>
  </div>,

  <div>[intentionally blank - quiz 3 screen]</div>,

  <div>
    <h2>Not Medical Care</h2>
    <p className="Consent__copy">
      The COVID Recovery Corps is a <b>research study</b>.{' '}
    </p>

    <p className="Consent__copy">
      The study does <b>not</b> provide <b> medical care, medical advice</b> or
      <b> treatment</b>.{' '}
    </p>

    <p className="Consent__copy">
      If you have questions or concerns related to your health, you should
      contact your doctor.{' '}
    </p>
  </div>,
  <div>
    <h2>Leaving the study</h2>
    <p className="Consent__copy">
      Taking part in COVID Recovery Corps is <b> voluntary</b>. You can choose
      to join or not.
    </p>

    <p className="Consent__copy">
      No matter what you decide, now or in the future, it will
      <b> not affect how your doctor treats you</b>.
    </p>

    <p className="Consent__copy">
      If you decide to withdraw (quit) the study, you can tell us by{' '}
      <b>
        going to the website and by clicking the "Withdraw Study" section in
        your profile setting. You can also use our contact information to email
        or write to us.{' '}
      </b>
    </p>

    <p className="Consent__copy">
      If you withdraw, your samples will be destroyed. Your data will not be
      distributed any more.{' '}
    </p>

    <p className="Consent__copy">
      However, if researchers <b>already have your data or samples </b>for their
      studies, the COVID Recovery Corps study
      <b>cannot</b> get it back.{' '}
    </p>
  </div>,
  <div>
    <h2>Things you should consider before you say yes</h2>
    <p className="Consent__copy">
      <b>Before you say yes</b> to joining the study, <b>please consider </b>the
      following:{' '}
    </p>

    <div className="list">
      <p className="Consent__copy">
        You will<b> not be paid </b>for participating in this study.{' '}
      </p>

      <p className="Consent__copy">
        You will<b> not receive any profit</b> from this or future research.
      </p>
      <p className="Consent__copy">
        Your study information{' '}
        <b>
          will not be shared with insurance companies or your doctor without
          your permission.
        </b>
      </p>

      <p className="Consent__copy">
        The risk of injury is low in this study. You will
        <b> not be compensated for injury</b>.
      </p>
    </div>
  </div>,
  <div>
    <h2>How to contact us?</h2>
    <p className="Consent__copy">
      For <b>general questions</b>, please contact the COVID Recovery Corps
      study at [TODO: Wendy to provide - columbia point of contact]{' '}
    </p>

    <p className="Consent__copy">
      For{' '}
      <b>
        questions related to the website, your account, or other technology
        issues
      </b>
      , please contact Sage Bionetworks at [TODO: John to provide]
    </p>
    <p className="Consent__copy">
      For your<b> rights as a research participant</b>, please contact [TODO:
      contact information at WIRB]
    </p>
  </div>,
]

const fullTextScreens = [
  <div>
    <h2>About the Study</h2>

    <p className="Consent__copy">
      COVID Recovery Corps is a <b> research study</b>.{' '}
    </p>

    <p className="Consent__copy">
      The goal of the study is to collect information from participants who have
      been diagnosed or believe they have had COVID-19.{' '}
    </p>

    <p className="Consent__copy">
      Researchers will use this information to{' '}
      <b>better understand how the body fights COVID-19 </b>.
    </p>

    <p className="Consent__copy">
      This study is being led by Columbia University and Sage Bionetworks. The
      study is being funded by the Chan Zuckerberg Institute.{' '}
    </p>

    <p className="Consent__copy">
      This study will <b> last for 12 months</b>.{' '}
    </p>
    <p className="Consent__copy">
      This study will <b> not provide medical care </b> for COVID-19.
      Participation in this study is <b> voluntary </b>
      and you may leave the study at any time.
    </p>
  </div>,

  <div>
    <h2>What will I be asked to do?</h2>
    <p className="Consent__copy">
      If you decide to join COVID Recovery Corps, we will ask you to answer
      survey questions. We will use the answers you give us to guess when you
      might have been infected to decide if and when to ask you to give a
      biosample such as blood, pee, spit, a sample from a nose or fecal swab.
      You can say no to providing these samples and still take part in COVID
      Recovery Corps study.{' '}
    </p>

    <p className="Consent__copy">
      If you say yes to giving a blood sample, we may use a needle to draw about
      3 tablespoons of blood from your arm. We will contact you to schedule the
      blood sample.
    </p>

    <p className="Consent__copy">
      Some people might get a testing kit sent to their house. Those people
      might use a finger stick to provide a small blood sample on a card. The
      kit may also ask you to provide a sample by using a nose swab, peeing in a
      cup, spit in a cup or by using a fecal swab. We will provide you with
      instructions and postage to mail the kit back to our lab.
    </p>

    <p className="Consent__copy">
      If you have a positive test result for COVID-19, we may ask you to upload
      a picture or a scanned copy of the document to the study website. This is
      optional and not required to take part in the study.{' '}
    </p>

    <p className="Consent__copy">
      We also will ask you if you would like to share your electronic health
      record (EHR) with the study. Your electronic health record is a digital
      version of your medical health record (which may include information like
      your doctor's notes from visits, diagnosis information and medications).
      There will be a separate form called a HIPAA Authorization for you to sign
      if you decide to give us access to your health records. If you say yes to
      sharing, we will see data about your health problems, test results,
      medical procedures, images (such as X-rays), and medicines you take.{' '}
    </p>

    <p className="Consent__copy">
      It is important to remember that health records can contain sensitive
      data. For example, it may tell us about your mental health, genetic
      conditions, or use of alcohol or drugs. They may contain sexual or
      infection data, including HIV status. You can say no to sharing your
      health records and still take part in COVID Recovery Corps.
    </p>

    <p className="Consent__copy">
      We may contact you by email or text to remind you to answer the survey or
      to give you directions about providing a blood sample. We expect it will
      take you about 30-60 minutes to fill out the first four surveys, and then
      15 minutes every month to answer the survey questions to see how you are
      doing. If you are asked and decide to give a blood sample, that will take
      additional time.{' '}
    </p>
  </div>,

  <div>[intentionally blank - quiz 1 screen]</div>,

  <div>
    <h2>What are the benefits?</h2>
    <p className="Consent__copy">
      COVID Recovery Corps is not medical treatment. It is a research study. You
      will not get direct medical benefit from taking part in COVID Recovery
      Corps. That said, you may indirectly benefit from taking part in COVID
      Recovery Corps. These results may be interesting to you.{' '}
    </p>

    <p className="Consent__copy">
      You may learn about your health. This might include results about your
      samples and if you have been or are now infected with COVID-19. Knowing
      about your COVID-19 status might be a benefit to you.
    </p>

    <p className="Consent__copy">
      You will be able to share your COVID Recovery Corps study information with
      your healthcare provider if you choose. You will have the option to learn
      about additional study opportunities. Finally, you will be helping
      researchers and other people make discoveries that may help each other as
      well as future generations.
    </p>
  </div>,
  <div>
    <h2>What are the risks?</h2>
    <p className="Consent__copy">
      The main risk of taking part in COVID Recovery Corps is to your privacy. A
      data breach is when someone sees or uses data without permission. If there
      is a data breach, someone could see or use the data we have about you.
      Even without your name, there is a chance someone could figure out who you
      are. They could misuse your data.{' '}
    </p>

    <p className="Consent__copy">
      Your privacy is very important to us. We will take great care to protect
      it. Here are a few of the steps we will take:
    </p>
    <div className="list">
      <p className="Consent__copy">
        Data we have about you will be stored on protected computers. We will
        limit and keep track of who can see these data.
      </p>
      <p className="Consent__copy">
        We will limit who is allowed to see information that could directly
        identify you, like your name or date of birth.
      </p>

      <p className="Consent__copy">
        In order to work with your health data, researchers must sign a contract
        stating they will not try to find out who you are.
      </p>
      <p className="Consent__copy">
        We will tell you if there is a data breach.
      </p>
      <p className="Consent__copy">
        COVID Recovery Corps has a Certificate of Confidentiality from the U.S.
        government. This will help us fight legal demands (such as a court order
        or a request from federal, state, or local law enforcement) to give out
        information that could identify you.
      </p>

      <p className="Consent__copy">
        However, the Certificate might not stop demands from public health
        authorities like the Health Department or law enforcement because of
        COVID-19.
      </p>
    </div>
    <p className="Consent__copy">
      We believe the chance of this is very small, but it is not zero.
    </p>
    <p className="Consent__copy">
      We will gather data from you through the COVID Recovery Corps website.
      There is a risk to your privacy whenever you use the website.
    </p>
    <p className="Consent__copy">
      Researchers will use basic facts like your race, ethnic group, and sex in
      their studies. These data help researchers learn if the things that affect
      health are the same for different groups of people. These studies could
      one day help people of the same race, ethnic group, or sex as you. It is
      important to have a diverse group of individuals in COVID Recovery Corps
      to make sure the results will help everyone. However, there is a risk that
      someone could use this data to support harmful ideas about certain groups.
    </p>

    <p className="Consent__copy">
      If you give a blood sample, the most common risks are brief pain and
      bruising. Some people may become dizzy or feel faint. There is also a
      small risk of infection. If you are asked to provide a sample from a nose
      or fecal swab you may feel brief discomfort.{' '}
    </p>
  </div>,

  <div>[intentionally blank - quiz 2 screen]</div>,

  <div>
    <h2>What will you do with my data and samples</h2>
    <p className="Consent__copy">
      We will store your data and samples securely, along with the data and
      samples from all the other people who take part in COVID Recovery Corps.
      Your data will be stored in the COVID Recovery Corps database and the
      COVID Recovery Corps Biobank will store your biosamples. We will use the
      data and samples to make discoveries about COVID-19. We will study who got
      infected with the virus and why some people responded differently than
      others. We will study how different people’s bodies fought the virus with
      their immune system. We will also study changes in health after people
      have recovered from COVID-19.
    </p>

    <p className="Consent__copy">
      We will create a scientific database and a biobank for the COVID Recovery
      Corps study. The scientific database will have individual-level data and
      the biobank will store your samples like your blood, and pee.
    </p>
    <p className="Consent__copy">
      To protect your data, we will use a code to identify your data and samples
      rather than your name name or other personal information. This code cannot
      be used to directly identify you. This coded data is known as
      de-identified data.Only key people from our study team can link your
      identity to your study.{' '}
    </p>

    <p className="Consent__copy">
      Access to this database will be controlled. Researchers will have to be
      approved by COVID Recovery Corps and will use only de-identified or coded
      data.
    </p>
  </div>,
  <div>
    <h2>Sharing your data with future researchers</h2>
    <p className="Consent__copy">
      The de-identified data that you donate for COVID Recovery Corps study
      could be used for other COVID- related research. You get to decide if you
      want to share your coded study data with qualified researchers worldwide.
      If you give permission, sharing will be done without additional informed
      consent.
    </p>

    <p className="Consent__copy">
      We have rules to qualify researchers. Qualified researchers must register
      on Synapse, our data analysis platform. To access the data, qualified
      researchers must write a short statement about their research. The
      research could be about any topic. The research could be on topics you
      disagree with or find offensive. We post the researchers’ statements on
      Synapse for anyone to read. They must sign an oath to use the data
      ethically and do no harm. Researchers will not be able to easily figure
      out your identity using your coded study data.
    </p>

    <p className="Consent__copy">
      Anyone in the US or abroad can qualify to be a qualified researcher. The
      person could be from a non-profit institution, commercial drug or medical
      device companies, or be a private citizen.{' '}
    </p>
    <p className="Consent__copy">
      You cannot take back your data once it is used in research. Your data will
      not be destroyed or deleted. Once we share your data, there isn’t a way
      for us to delete it or take it back.
    </p>
  </div>,

  <div>[intentionally blank - quiz 3 screen]</div>,

  <div>
    <h2>Not Medical Care</h2>
    <p className="Consent__copy">
      The COVID Recovery Corps study is a research study. You will not receive
      medical care, medical advice or treatment by taking part in this study.
    </p>

    <p className="Consent__copy">
      If you have questions or concerns related to your health, you should
      contact your doctor.{' '}
    </p>
  </div>,
  <div>
    <h2>Leaving the study</h2>
    <p className="Consent__copy">
      Taking part in COVID Recovery Corps is voluntary. You can choose to join
      or not. No matter what you decide, now or in the future, it will not
      affect how your doctor treats you.
    </p>

    <p className="Consent__copy">
      If you decide to join COVID Recovery Corps, you can change your mind at
      any time. If you decide you want to withdraw (quit), you need to tell us.
      You can tell us by going to the website and clicking the “Withdraw Study”
      section in your profile setting. You can use our contact information to
      email or write to us.{' '}
    </p>

    <p className="Consent__copy">
      If you withdraw, your samples will be destroyed. Your data will not be
      distributed any more.
    </p>
    <p className="Consent__copy">
      However, if researchers already have your data or samples for their
      studies, the COVID Recovery Corps study cannot get it back. Also, we will
      let researchers check the results of past studies. If they need your old
      data to do this work, we will give it to them.
    </p>
    <p className="Consent__copy">
      Even if you withdraw, we will keep your name and contact information. We
      keep this information so we can follow U.S. research laws and regulations.
    </p>
  </div>,
  <div>
    <h2>Things you should consider before you say yes</h2>

    <p className="Consent__copy">
      You will not be paid for joining and/or taking part in the COVID Recovery
      Corps study. Researchers will use your data to make discoveries. If any of
      their studies lead to new tests, drugs, or other commercial products, you
      will not get any profits. These inventions will be the property of the
      researchers who develop them.
    </p>

    <p className="Consent__copy">
      We will keep your data private, and even if public health authorities
      access this data about COVID, it cannot be transferred to an insurance
      company or your healthcare provider without your permission.
    </p>

    <p className="Consent__copy">
      If you think you have been injured because of taking part in COVID
      Recovery Corps, contact us using the information at the end of this form.
      If we find that you were injured as a direct result of taking part in
      COVID Recovery Corps:
    </p>
    <div className="list">
      <p className="Consent__copy">
        Beyond your immediate medical care, we will not pay for your injury.
      </p>
      <p className="Consent__copy">
        If you need follow-up care to treat your injury, you and/or your
        insurance will have to pay for it.
      </p>
      <p className="Consent__copy">
        If you have any long-term costs to treat your injury, you and/or your
        insurance will have to pay them.
      </p>
      <p className="Consent__copy">
        You do not give up any of your legal rights if you take part in COVID
        Recovery Corps.
      </p>
    </div>
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
  </div>,
]

const ehrScreens = [
  <div>
    <h2>HIPAA Consent</h2>
    <p className="Consent__copy">
      Before you decide to share your electronic health record (EHR) with us,
      let’s learn more about how the COVID Recovery Corp will use this
      information.
    </p>
    <p className="Consent__copy">
      The next screens will tell you about why we are asking you to share your
      EHR information, what types of information is collected in your EHR, and
      what we will do with this information.
    </p>
  </div>,

  <div>
    <h2>What is an EHR?</h2>
    Health records are the data collected when you get healthcare. Electronic
    health records, or EHR, are when these data are kept in secure electronic
    systems.
  </div>,
  <div>
    <h2>What data is in my EHR?</h2>
    The information in your EHR depends on what kinds of healthcare providers
    you see. Your EHR tells about the health problems and care you have
    received. It might list the medicines you take. It might have test results.
    It might have images, like X-rays. If you have had a medical procedure,
    notes about it will probably be in your EHR.
  </div>,
  <div>
    <h2>Are there sensitive data in my EHR?</h2>
    <p className="Consent__copy">
      There might be sensitive data in your EHR. For example, about your use of
      alcohol or drugs. Your EHR might have data about sexually transmitted
      infections, like HIV. It might have results from genetic (DNA) tests. We
      will be able to see these data.{' '}
    </p>
    <p className="Consent__copy">
      If you have seen counselors or doctors who treat addictions or substance
      use disorders, information about your care might be part of your EHR. The
      same goes for if you have seen counselors or doctors who treat mental
      health, like depression or bipolar disorder. These data would be about
      your diagnosis and treatment. We will be able to see these data.
    </p>{' '}
    <p className="Consent__copy">
      {' '}
      One exception are any notes from counselors or doctors in specialized
      clinics who treat addictions or substance use disorders. These notes are
      usually private and not part of the EHR. We will only be able to see these
      notes if they are part of your EHR.
    </p>
  </div>,
  <div>
    {' '}
    <h2>What exactly will you access in my EHR? </h2>
    We will access your whole EHR. That means we will take a copy of all the
    tests, results, and images in your EHR. This includes data about your
    diagnoses, medications, symptoms, allergies, and treatments.
  </div>,
  <div>
    <h2>Why do you want access to my EHR?</h2>
    Your EHR contains important data about your health. We will add your EHR to
    your COVID Recovery Corps record. Your record will be part of the COVID
    Recovery Corps scientific database. In order to use this database,
    researchers will have to be approved by COVID Recovery Corps. Researchers
    will use this database to look for patterns related to the COVID-19
    infection.
  </div>,
  <div>
    <h2>Who will be sending you my EHR?</h2>
    We will request your EHR from all of your healthcare providers. This
    includes your regular healthcare providers. It also includes specialists. We
    may ask for your EHR from many different places. This may include hospitals
    where you have gotten care.
  </div>,
  <div>
    <h2>Who will be getting access to my EHR?</h2>
    <p className="Consent__copy">
      If you sign this form, COVID Recovery Corps will be getting access to your
      EHR. We will add your EHR to your COVID Recovery Corps study data. The
      lead researcher of COVID Recovery Corps is Dr. Wendy Chung. She oversees
      the whole Research Program.
    </p>
    <p className="Consent__copy">
      The scientific database will have individual-level information about
      people in COVID Recovery Corps. Access to this cloud-based database will
      be controlled. Researchers will have to be approved by COVID Recovery
      Corps to use this database. These researchers may be from anywhere in the
      world. They may work for commercial companies, like drug companies. Their
      research will be on COVID-19 and related viruses.
    </p>
    <p className="Consent__copy">
      {' '}
      Once your information is shared with COVID Recovery Corps, it may no
      longer be protected by patient privacy rules (like “HIPAA”). However, it
      will still be protected by other privacy rules and agreements. These
      include the rules and agreements that researchers must follow to access
      the COVID Recovery Corps scientific database.
    </p>
  </div>,
  <div>
    <h2>
      What if I don’t want to give access to my EHR? What if I change my mind?
    </h2>
    <p className="Consent__copy">
      {' '}
      Giving COVID Recovery Corps access to your EHR is voluntary. You get to
      choose. No matter what you decide, now or in the future, it will not
      affect your medical care. If you decide to give COVID Recovery Corps
      access to your EHR, you can change your mind at any time. If you decide
      you want to stop giving us access, you need to tell us you would like to
      withdraw from the study.
    </p>
    <p className="Consent__copy">
      {' '}
      You can tell us through the app or website, or use the contact information
      at the end of this form to call or write to us. You can update the study’s
      access to your EHR in your profile settings on the website at any time.
    </p>{' '}
    <p className="Consent__copy">
      {' '}
      However, if researchers have already accessed data from your EHR for their
      studies, we at COVID Recovery Corps cannot get it back. Also, we will let
      researchers check the results of past studies. If they need your old data
      to do this work, we will give it to them.
    </p>
  </div>,
  <div>
    <h2>When will my consent expire</h2>
    Unless you tell us to stop, we will access your EHR until the COVID Recovery
    Corps study ends to check what has happened to your health after your
    COVID-19 infection.
  </div>,
  <div>
    <h2>Who can answer my questions?</h2>
    <ul>
      <li>
        For general questions, please contact the COVID Recovery Corps study at
        212-305-5700 or{' '}
        <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
          COVIDRecoveryCorps@cumc.columbia.edu
        </a>{' '}
      </li>
      <li>
        For your rights as a research participant, please contact Western IRB
        (WIRB) at <a href="mailto:help@WIRB.com">help@WIRB.com</a> at
        360-252-2500 or toll-free 800-562-4789.
      </li>
    </ul>
  </div>,
]

const screens: { [key: string]: JSX.Element } = {
  INTRO: (
    <div className="Consent__copy">
      <p className="Consent__copy">
        Before you decide if you want to join the study, let's learn more about
        the COVID Recover Corps Study.
      </p>
      <p className="Consent__copy">
        The next screens will tell you about what we will ask you to do,
        benefits and risks of taking part in the study.
      </p>

      <p className="Consent__copy">Let's get started!</p>
    </div>
  ),
  CONSENT_SIGNATURE1: (
    <p className="Consent__copy">
      If you understand and agree to the benefits &amp; risk of participating in
      this study. Please sign below.
    </p>
  ),
  CONSENT_SIGNATURE2: (
    <p className="Consent__copy">
      <ul>
        <li>My data will be stored in the COVID Recovery Corps databases.</li>
        <li>
          If I give a biosample, it will be stored at the COVID Recovery Corps
          biobank. This includes my DNA or genetic material. Information that
          researchers learn by studying my samples will be stored in the COVID
          Recovery Corps databases.
        </li>
        <li>
          Researchers will do COVID-19 studies using the COVID Recovery Corps
          databases and biobank. They may also do research on other health
          conditions that are related to how the body responds to COVID-19.
        </li>
        <li>
          If my sample is used up, I may be asked to give another biosample. I
          can say yes or no.
        </li>
        <li>
          My contact information may be used to tell me about other
          COVID-related studies.
        </li>
        <li>
          I can withdraw (quit) at any time. There is no penalty if I withdraw.
        </li>
      </ul>{' '}
    </p>
  ),
  CONSENT_SHARING: (
    <div>
      <p>
        Would you like to share your study data with other qualified researchers
        for future research on COVID related work?
      </p>
    </div>
  ),
  HIPAA_LAST_INTRO: (
    <p className="Consent__copy">
      If you understand and agree to the benefits &amp; risk of participating in
      this study. Please sign below.
    </p>
  ),
  HIPAA_LAST_TERMS: (
    <p className="Consent__copy">
      <ul>
        <li>My data will be stored in the COVID Recovery Corps databases.</li>
        <li>
          If I give a biosample, it will be stored at the COVID Recovery Corps
          biobank. This includes my DNA or genetic material. Information that
          researchers learn by studying my samples will be stored in the COVID
          Recovery Corps databases.
        </li>
        <li>
          Researchers will do COVID-19 studies using the COVID Recovery Corps
          databases and biobank. They may also do research on other health
          conditions that are related to how the body responds to COVID-19.
        </li>
        <li>
          If my sample is used up, I may be asked to give another biosample. I
          can say yes or no.
        </li>
        <li>
          My contact information may be used to tell me about other
          COVID-related studies.
        </li>
        <li>
          I can withdraw (quit) at any time. There is no penalty if I withdraw.
        </li>
      </ul>
    </p>
  ),
  HIPAA_LAST_CHECKBOX: (
    <>
      I have read this consent form (or someone read it to me). I understand the
      information in this form. All of my questions have been answered. I freely
      and willingly choose to take part in COVID Recovery Corps study.
    </>
  ),
}

export const ConsentImages = [_01, _02, _03, _04, _05]

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
