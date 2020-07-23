import React from 'react'
import i18next from 'i18next'
import { Trans } from 'react-i18next'

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
    {/*
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text2">
        [translate] <strong> [translate]</strong>
      </Trans>
    </p> */}
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
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text8">[translate]</Trans>
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
      <Trans i18nKey="consentinfo.screen5.text5a">
        [translate]
        <strong>[translate]</strong>
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text5b">
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
        [translate] <strong> [translate] </strong> [translate]{' '}
        <strong> [translate] </strong>
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
        [translate]<strong>[translate]</strong>
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen10.text3">[translate]</Trans>
    </p>
  </div>,

  <div>
    <h2>{i18next.t('consentinfo.screen11.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen11.text2">
        [translate] <strong>[translate]</strong>[translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen11.text3">
        [translate] <strong>[translate]</strong> [translate]{' '}
        <strong> [translate]</strong> [translate] <strong> [translate]</strong>{' '}
        [translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen11.text4">
        [translate] <strong>[translate]</strong> [translate]{' '}
        <strong>[translate]</strong>[translate]
      </Trans>
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.screen12.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen12.text2">
        [translate] <strong> [translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen12.text3">
        [translate] <strong> [translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen12.text4">
        [translate]
        <strong>
          [translate] <strong>[translate]</strong>. [translate]
          <strong>[translate]</strong>[translate]{' '}
        </strong>
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen12.text5">
        [translate] <strong>[translate]</strong>[translate]{' '}
        <strong>[translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">{i18next.t('consentinfo.screen12.text6')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.screen13.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentinfo.screen13.text2')}</p>

    <div className="list">
      <ul>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.screen13.text3">
            [translate]<strong> [translate] </strong>[translate]
          </Trans>
        </li>

        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.screen13.text4">
            [translate]<strong> [translate]</strong> [translate]
          </Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.screen13.text5">
            [translate] <strong> [translate] </strong>
          </Trans>
        </li>

        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.screen13.text6">
            [translate] <strong> [translate]</strong>[translate]
          </Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.screen13.text7">
            [translate] <strong> [translate]</strong>[translate]
          </Trans>
        </li>
      </ul>
    </div>
  </div>,
  <div>
    <h2> {i18next.t('consentinfo.screen14.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen14.text2">
        <strong>[translate]</strong> [translate]
        <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">[translate]</a>
        [translate]
      </Trans>
    </p>
    <p>
      <Trans i18nKey="consentinfo.screen14.text3">
        <strong> [translate] </strong> [translate]
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
      <ul>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen5.text4')}
        </li>

        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen5.text5')}
        </li>

        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen5.text6')}
        </li>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen5.text7')}
        </li>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen5.text7a')}
        </li>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen5.text7b')}
        </li>
      </ul>
    </div>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text8')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text9')}
    </p>

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
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text14')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen5.text15')}
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
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen12.text5')}
    </p>
    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen12.text6')}
    </p>
  </div>,
  <div>
    <h2>{i18next.t('consentinfo.fullTextScreen13.text1')}</h2>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen13.text2')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen13.text3')}
    </p>

    <p className="Consent__copy">
      {i18next.t('consentinfo.fullTextScreen13.text4')}
    </p>
    <div className="list">
      <p className="Consent__copy">
        {i18next.t('consentinfo.fullTextScreen13.text4a')}
      </p>
      <ul>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen13.text5')}
        </li>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen13.text6')}
        </li>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen13.text7')}
        </li>
        <li className="Consent__copy">
          {i18next.t('consentinfo.fullTextScreen13.text8')}
        </li>
      </ul>
    </div>
  </div>,
  <div>
    <h2> {i18next.t('consentinfo.screen14.text1')}</h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen14.text2">
        <strong>[translate]</strong> [translate]
        <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">[translate]</a>
        [translate]
      </Trans>
    </p>
    <p>
      <Trans i18nKey="consentinfo.screen14.text3">
        <strong> [translate] </strong> [translate]{' '}
        <a href="mailto:help@WIRB.com">[translate]</a> [translate]
      </Trans>
    </p>
  </div>,
]

const ehrScreens = [
  <div>
    <h2>{i18next.t('consentEHR.welcome.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.welcome.text2')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.welcome.text3')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen1.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen1.text2')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen2.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen2.text2')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen3.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen3.text2')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.screen3.text3')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.screen3.text4')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen4.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen4.text2')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen5.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen5.text2')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen6.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen6.text2')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.screen6.text3')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen7.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen7.text2')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.screen7.text3')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.screen7.text4')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen8.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen8.text2')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.screen8.text3')}</p>
    <p className="Consent__copy">{i18next.t('consentEHR.screen8.text4')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen9.text1')}</h2>
    <p className="Consent__copy">{i18next.t('consentEHR.screen9.text2')}</p>
  </div>,
  <div>
    <h2>{i18next.t('consentEHR.screen10.text1')}</h2>
    <ul>
      <li>
        <Trans i18nKey="consentEHR.screen10.text2">
          <strong>[translate]</strong> [translate]{' '}
          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">
            {' '}
            [translate]{' '}
          </a>
        </Trans>
      </li>
      <li>
        <Trans i18nKey="consentEHR.screen10.text3">
          <strong> [translate] </strong> [translate]{' '}
          <a href="mailto:help@WIRB.com">help@WIRB.com</a> [translate]
        </Trans>
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
    <p className="Consent__copy">{i18next.t('consentinfo.screen15.text1')}</p>
  ),
  CONSENT_SIGNATURE2: (
    <p className="Consent__copy">
      <ul>
        <li>{i18next.t('consentinfo.screen15.text3')}</li>
        <li>{i18next.t('consentinfo.screen15.text4')}</li>
        <li>{i18next.t('consentinfo.screen15.text5')}</li>
        <li>{i18next.t('consentinfo.screen15.text6')}</li>
        <li>{i18next.t('consentinfo.screen15.text7')}</li>
        <li>{i18next.t('consentinfo.screen15.text8')}</li>
      </ul>
    </p>
  ),
  CONSENT_SHARING: (
    <div>
      <p className="Consent__copy">{i18next.t('consentinfo.screen15.text9')}</p>
    </div>
  ),
  HIPAA_LAST_INTRO: <></>,
  HIPAA_LAST_TERMS: (
    <p className="Consent__copy">
      <ul>
        <li>{i18next.t('consentEHR.screen11.text2')}</li>
        <li>{i18next.t('consentEHR.screen11.text3')}</li>
        <li>{i18next.t('consentEHR.screen11.text4')}</li>
        <li>{i18next.t('consentEHR.screen11.text5')}</li>
        <li>{i18next.t('consentEHR.screen11.text6')}</li>
        <li>{i18next.t('consentEHR.screen11.text7')}</li>
      </ul>
    </p>
  ),
  HIPAA_LAST_CHECKBOX: (
    <>
      <strong>{i18next.t('consentEHR.screen11.text8')}</strong>
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
