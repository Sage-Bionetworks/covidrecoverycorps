import React from 'react'
import i18next from 'i18next'
import { Trans } from 'react-i18next'
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
  screen?: SCREENS_ENUM
  isEHR?: boolean
}

export enum SCREENS_ENUM {
  CONSENT_INTRO = 'CONSENT_INTRO',
  CONSENT_SIGNATURE1 = 'CONSENT_SIGNATURE1',
  CONSENT_SIGNATURE2 = 'CONSENT_SIGNATURE2',
  CONSENT_SHARING = 'CONSENT_SHARING',
  HIPAA_LAST_INTRO = 'HIPAA_LAST_INTRO',
  HIPAA_LAST_TERMS = 'HIPAA_LAST_TERMS',
  HIPAA_LAST_CHECKBOX = 'HIPAA_LAST_CHECKBOX',
}

const summaryScreens = [
  <div>
    <h2>{i18next.t('consentinfo.screen1.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text2">
        [translate] <strong> [translate]</strong>
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text3">
        [translate]
        <strong>[translate]</strong>
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text4">
        [translate]
        <strong>[translate]</strong>
      </Trans>
    </p>

    <p className="Consent__copy">{i18next.t('consentinfo.screen1.text5')}</p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text6">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text7">
        [translate] <strong> [translate] </strong> [translate] [translate]{' '}
        <strong> [translate] </strong>
        [translate]
      </Trans>
    </p>
  </div>,

  <div>
    <h2>{i18next.t('consentinfo.screen2.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentinfo.screen2.text2')}</p>

    <div className="list">
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text3">
          <strong>[translate]</strong> [translate]
        </Trans>
      </p>
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text4">
          [translate] <strong>[translate]</strong> [translate]
          <strong>[translate]</strong> [translate]
          <strong>[translate]</strong>[translate]
          <strong>[translate]</strong>[translate]
        </Trans>
      </p>
      <p className="Consent__copy">{i18next.t('consentinfo.screen2.text5')}</p>
      <p className="Consent__copy">{i18next.t('consentinfo.screen2.text6')}</p>
    </div>

    <p className="Consent__copy">
      <br />
      <strong>{i18next.t('consentinfo.screen2.text7')}</strong>
    </p>

    <div className="list">
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text8">
          [translate] <strong>[translate] </strong>[translate]
        </Trans>
      </p>
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text9">
          [translate] <strong>[translate]</strong> [translate]{' '}
          <strong> [translate]</strong> [translate]
        </Trans>
      </p>

      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text10">
          [translate] <strong>[translate]</strong>
          [translate] <strong>[translate] </strong>[translate]
          <strong>[translate] </strong> [translate]
        </Trans>
      </p>

      <p className="Consent__copy">{i18next.t('consentinfo.screen2.text11')}</p>

      <p className="Consent__copy">{i18next.t('consentinfo.screen2.text12')}</p>
    </div>
  </div>,
  <div>[intentionally blank - quiz 1 screen]</div>,
  <div>
    <h2>{i18next.t('consentinfo.screen4.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen4.text2">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">{i18next.t('consentinfo.screen4.text3')}</p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen4.text4">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.screen5.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text2">
        [translate]
        <strong> [translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">{i18next.t('consentinfo.screen5.text3')}</p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text4">
        [translate] <strong> [translate]</strong> [translate]
        <strong>[translate]</strong> [translate]
        <strong>[translate]</strong> [translate]
        <strong> [translate]</strong> [translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text5">
        [translate]
        <strong>[translate]</strong>
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text6">
        [translate] <strong>[translate]</strong> [translate]
        <strong> [translate] </strong> [translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text7">
        [translate] <strong> [translate] </strong> [translate]{' '}
        <strong> [translate]</strong> [translate]
      </Trans>
    </p>
  </div>,
  <div>[intentionally blank - quiz 2 screen]</div>,
  <div>
    <h2>{i18next.t('consentinfo.screen7.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen7.text2">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">{i18next.t('consentinfo.screen7.text3')}</p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen7.text4">
        [translate] <strong> [translate] </strong> and samples rather than your
        name or other personal information. This <strong> [translate] </strong>
        [translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen7.text5">
        [translate] <strong> [translate]</strong>[translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen7.text6">
        [translate] <strong> [translate]</strong> [translate]
      </Trans>
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.screen8.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text2">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">{i18next.t('consentinfo.screen8.text3')}</p>

    <p className="Consent__copy">{i18next.t('consentinfo.screen8.text4')}</p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text5">
        [translate] <strong> [translate] </strong> [translate]{' '}
        <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">{i18next.t('consentinfo.screen8.text6')}</p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text7">
        [translate] <strong>[translate]</strong> [translate]{' '}
        <strong>[translate]</strong>[translate]
      </Trans>
    </p>
  </div>,

  <div>[intentionally blank - quiz 3 screen]</div>,

  <div>
    <h2>{i18next.t('consentinfo.screen10.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen10.text2">
        [translate] <strong>[translate]</strong>[translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen10.text3">
        [translate] <strong>[translate]</strong> [translate]{' '}
        <strong> [translate]</strong> [translate] <strong> [translate]</strong>{' '}
        [translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen10.text4">
        [translate] <strong>[translate]</strong> [translate]{' '}
        <strong>[translate]</strong>[translate]
      </Trans>
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.screen11.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen11.text2">
        [translate] <strong> [translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen11.text3">
        [translate] <strong> [translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen11.text4">
        [translate]{' '}
        <strong>
          {' '}
          [translate] <strong>[translate]</strong>. [translate]{' '}
          <strong>[translate]</strong>[translate]{' '}
        </strong>
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen11.text5">
        [translate] <strong>[translate]</strong>[translate]{' '}
        <strong>[translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">{i18next.t('consentinfo.screen11.text6')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.screen12.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentinfo.screen12.text2')}</p>

    <div className="list">
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen12.text3">
          [translate]<strong> [translate] </strong>[translate]
        </Trans>
      </p>

      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen12.text4">
          [translate]<strong> [translate]</strong> [translate]
        </Trans>
      </p>
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen12.text5">
          [translate] <strong> [translate] </strong>
        </Trans>
      </p>

      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen12.text6">
          [translate] <strong> [translate]</strong>[translate]
        </Trans>
      </p>
    </div>
  </div>,
  <div>
    <h2> {i18next.t('consentinfo.screen13.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen13.text2">
        <strong>[translate]</strong> [translate]
        <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">[translate]</a>
        [translate]
      </Trans>
    </p>
    <p>
      <Trans i18nKey="consentinfo.screen13.text3">
        <strong> [translate] </strong> [translate]{' '}
        <a href="mailto:help@WIRB.com">[translate]</a> [translate]
      </Trans>
    </p>
  </div>,
]

const fullTextScreens = [
  // intentionally leaving first element empty, first page has no full text version
  <></>,
  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen2.text1')}</h2>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen2.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen2.text3')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen2.text4')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen2.text5')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen2.text6')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen2.text7')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen2.text8')}
    </p>
  </div>,
  <div>[intentionally blank - quiz 1 screen]</div>,

  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen4.text1')}</h2>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen4.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen4.text3')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen4.text4')}
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen5.text1')}</h2>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text3')}
    </p>
    <div className="list">
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen5.text4')}
      </p>
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen5.text5')}
      </p>

      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen5.text6')}
      </p>
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen5.text7')}
      </p>
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen5.text8')}
      </p>

      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen5.text9')}
      </p>
    </div>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text10')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text11')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text12')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text13')}
    </p>
  </div>,

  <div>[intentionally blank - quiz 2 screen]</div>,

  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen7.text1')}</h2>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen7.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen7.text3')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen7.text4')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen7.text5')}
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen8.text1')}</h2>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen8.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen8.text3')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen8.text4')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen8.text5')}
    </p>
  </div>,

  <div>[intentionally blank - quiz 3 screen]</div>,

  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen10.text1')}</h2>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen10.text2')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen10.text3')}
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen11.text1')}</h2>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen11.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen11.text3')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen11.text4')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen11.text5')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen11.text6')}
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen12.text1')}</h2>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen12.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen12.text3')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen12.text4')}
    </p>
    <div className="list">
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen12.text5')}
      </p>
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen12.text6')}
      </p>
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen12.text7')}
      </p>
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen12.text8')}
      </p>
    </div>
  </div>,
  <div>
    <h2> {i18next.t('consentinfo.screen13.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen13.text2">
        <strong>[translate]</strong> [translate]
        <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">[translate]</a>
        [translate]
      </Trans>
    </p>
    <p>
      <Trans i18nKey="consentinfo.screen13.text3">
        <strong> [translate] </strong> [translate]{' '}
        <a href="mailto:help@WIRB.com">[translate]</a> [translate]
      </Trans>
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
    <p className="Consent__copy">
      Health records are the data collected when you get healthcare. Electronic
      health records, or EHR, are when these data are kept in secure electronic
      systems.
    </p>
  </div>,
  <div>
    <h2>What data is in my EHR?</h2>
    <p className="Consent__copy">
      The information in your EHR depends on what kinds of healthcare providers
      you see. Your EHR tells about the health problems and care you have
      received. It might list the medicines you take. It might have test
      results. It might have images, like X-rays. If you have had a medical
      procedure, notes about it will probably be in your EHR.
    </p>
  </div>,
  <div>
    <h2>Are there sensitive data in my EHR?</h2>
    <p className="Consent__copy">
      There might be sensitive data in your EHR. For example, about your use of
      alcohol or drugs. Your EHR might have data about sexually transmitted
      infections, like HIV. It might have results from genetic (DNA) tests. We
      will be able to see these data.
    </p>
    <p className="Consent__copy">
      If you have seen counselors or doctors who treat addictions or substance
      use disorders, information about your care might be part of your EHR. The
      same goes for if you have seen counselors or doctors who treat mental
      health, like depression or bipolar disorder. These data would be about
      your diagnosis and treatment. We will be able to see these data.
    </p>
    <p className="Consent__copy">
      One exception are any notes from counselors or doctors in specialized
      clinics who treat addictions or substance use disorders. These notes are
      usually private and not part of the EHR. We will only be able to see these
      notes if they are part of your EHR.
    </p>
  </div>,
  <div>
    <h2>What exactly will you access in my EHR? </h2>
    <p className="Consent__copy">
      We will access your whole EHR. That means we will take a copy of all the
      tests, results, and images in your EHR. This includes data about your
      diagnoses, medications, symptoms, allergies, and treatments.
    </p>
  </div>,
  <div>
    <h2>Why do you want access to my EHR?</h2>
    <p className="Consent__copy">
      Your EHR contains important data about your health. We will add your EHR
      to your COVID Recovery Corps record. Your record will be part of the COVID
      Recovery Corps scientific database. In order to use this database,
      researchers will have to be approved by COVID Recovery Corps. Researchers
      will use this database to look for patterns related to the COVID-19
      infection.
    </p>
  </div>,
  <div>
    <h2>Who will be sending you my EHR?</h2>
    <p className="Consent__copy">
      We will request your EHR from all of your healthcare providers. This
      includes your regular healthcare providers. It also includes specialists.
    </p>
    <p className="Consent__copy">
      We may ask for your EHR from many different places. This may include
      hospitals where you have gotten care.
    </p>
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
      Giving COVID Recovery Corps access to your EHR is voluntary. You get to
      choose. No matter what you decide, now or in the future, it will not
      affect your medical care. If you decide to give COVID Recovery Corps
      access to your EHR, you can change your mind at any time. If you decide
      you want to stop giving us access, you need to tell us you would like to
      withdraw from the study.
    </p>
    <p className="Consent__copy">
      You can tell us through the app or website, or use the contact information
      at the end of this form to call or write to us. You can update the study’s
      access to your EHR in your profile settings on the website at any time.
    </p>
    <p className="Consent__copy">
      However, if researchers have already accessed data from your EHR for their
      studies, we at COVID Recovery Corps cannot get it back. Also, we will let
      researchers check the results of past studies. If they need your old data
      to do this work, we will give it to them.
    </p>
  </div>,
  <div>
    <h2>When will my consent expire?</h2>
    <p className="Consent__copy">
      Unless you tell us to stop, we will access your EHR until the COVID
      Recovery Corps study ends to check what has happened to your health after
      your COVID-19 infection.
    </p>
  </div>,
  <div>
    <h2>Who can answer my questions?</h2>
    <ul>
      <li>
        <strong>For general questions,</strong> please contact the COVID
        Recovery Corps study at 212-305-5700 (24 hours) or
        <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
          COVIDRecoveryCorps@cumc.columbia.edu
        </a>
      </li>
      <li>
        <strong>
          For questions about your rights as a research participant, concerns or
          complaints,
        </strong>{' '}
        please contact Western IRB (WIRB) at{' '}
        <a href="mailto:help@WIRB.com">help@WIRB.com</a> at 360-252-2500 or
        toll-free at 800-562-4789.
      </li>
    </ul>
  </div>,
]

const screens: { [key in SCREENS_ENUM]: JSX.Element } = {
  CONSENT_INTRO: (
    <>
      <h2>{i18next.t('consentinfo.welcome.text1')}</h2>
      <div className="Consent__copy">
        <p className="Consent__copy">
          {i18next.t('consentinfo.welcome.text2')}
        </p>
        <p className="Consent__copy">
          {i18next.t('consentinfo.welcome.text3')}
        </p>
      </div>
    </>
  ),
  CONSENT_SIGNATURE1: (
    <p className="Consent__copy">{i18next.t('consentinfo.screen14.text1')}</p>
  ),
  CONSENT_SIGNATURE2: (
    <p className="Consent__copy">
      <ul>
        <li>{i18next.t('consentinfo.screen14.text3')}</li>
        <li>{i18next.t('consentinfo.screen14.text4')}</li>
        <li>{i18next.t('consentinfo.screen14.text5')}</li>
        <li>{i18next.t('consentinfo.screen14.text6')}</li>
        <li>{i18next.t('consentinfo.screen14.text7')}</li>
        <li>{i18next.t('consentinfo.screen14.text8')}</li>
      </ul>
    </p>
  ),
  CONSENT_SHARING: (
    <div>
      <p className="Consent__copy">{i18next.t('consentinfo.screen14.text9')}</p>
    </div>
  ),
  HIPAA_LAST_INTRO: <></>,
  HIPAA_LAST_TERMS: (
    <p className="Consent__copy">
      <ul>
        <li>
          All health information pertaining to my medical history, mental or
          physical condition, and treatment received
        </li>
        <li>Mental health diagnosis or treatment information</li>
        <li>HIV/AIDS testing information</li>
        <li>Alcohol/drug abuse, diagnosis or treatment information</li>
        <li>Genetic testing information</li>
        <li>
          Information about domestic violence and sexual assault counseling
        </li>
      </ul>
    </p>
  ),
  HIPAA_LAST_CHECKBOX: (
    <>
      <strong>
        By signing this form, I voluntarily authorize my healthcare providers
        and organizations to share my EHR with the COVID Recovery Corps Research
        Study, led by Dr. Wendy Chung, and its partner organization Sage
        Bionetworks.
      </strong>
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
