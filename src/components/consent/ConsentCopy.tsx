import React from 'react'
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
    <h2>
      <Trans i18nKey="consentinfo.screen1.text1">[trans2]</Trans>
    </h2>
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

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen1.text5">[trans2]</Trans>
    </p>

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
    <h2>
      <Trans i18nKey="consentinfo.screen2.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen2.text2">[trans2]</Trans>
    </p>

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
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text5">[trans2]</Trans>
      </p>
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text6">[trans2]</Trans>
      </p>
    </div>

    <p className="Consent__copy">
      <br />
      <strong>
        <Trans i18nKey="consentinfo.screen2.text7">[trans2]</Trans>
      </strong>
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

      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text11">[trans2]</Trans>
      </p>

      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen2.text12">[trans2]</Trans>
      </p>
    </div>
  </div>,
  <div>[intentionally blank - quiz 1 screen]</div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.screen4.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen4.text2">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen4.text3">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen4.text4">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.screen5.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text2">
        [translate]
        <strong> [translate]</strong>[translate]
      </Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen5.text3">[trans2]</Trans>
    </p>
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
    <h2>
      <Trans i18nKey="consentinfo.screen7.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen7.text2">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen7.text3">[trans2]</Trans>
    </p>

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
    <h2>
      <Trans i18nKey="consentinfo.screen8.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text2">
        [translate] <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text3">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text4">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text5">
        [translate] <strong> [translate] </strong> [translate]{' '}
        <strong> [translate] </strong> [translate]
      </Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text6">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen8.text7">
        [translate] <strong>[translate]</strong> [translate]{' '}
        <strong>[translate]</strong>[translate]
      </Trans>
    </p>
  </div>,

  <div>[intentionally blank - quiz 3 screen]</div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.screen10.text1">[trans2]</Trans>
    </h2>
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
    <h2>
      <Trans i18nKey="consentinfo.screen11.text1">[trans2]</Trans>
    </h2>
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
    <h2>
      <Trans i18nKey="consentinfo.screen12.text1">[trans2]</Trans>
    </h2>
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
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen12.text6">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.screen13.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen13.text2">[trans2]</Trans>
    </p>

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
    <h2>
      {' '}
      <Trans i18nKey="consentinfo.screen14.text1">[trans2]</Trans>
    </h2>
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
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen2.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen2.text2">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen2.text3">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen2.text4">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen2.text5">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen2.text6">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen2.text7">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen2.text8">[trans2]</Trans>
    </p>
  </div>,
  <div>[intentionally blank - quiz 1 screen]</div>,

  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen4.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen4.text2">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen4.text3">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen4.text4">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen5.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text2">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text3">[trans2]</Trans>
    </p>
    <div className="list">
      <ul>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen5.text4">[trans2]</Trans>
        </li>

        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen5.text5">[trans2]</Trans>
        </li>

        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen5.text6">[trans2]</Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen5.text7">[trans2]</Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen5.text7a">[trans2]</Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen5.text7b">[trans2]</Trans>
        </li>
      </ul>
    </div>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text8">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text9">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text10">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text11">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text12">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text13">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text14">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen5.text15">[trans2]</Trans>
    </p>
  </div>,

  <div>[intentionally blank - quiz 2 screen]</div>,

  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen7.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen7.text2">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen7.text3">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen7.text4">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen7.text5">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen8.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen8.text2">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen8.text3">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen8.text4">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen8.text5">[trans2]</Trans>
    </p>
  </div>,

  <div>[intentionally blank - quiz 3 screen]</div>,

  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen10.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen10.text2">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen10.text3">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen11.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen11.text2">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen11.text3">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen12.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen12.text2">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen12.text3">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen12.text4">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen12.text5">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen12.text6">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentinfo.fullTextScreen13.text1">[trans2]</Trans>
    </h2>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen13.text2">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen13.text3">[trans2]</Trans>
    </p>

    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.fullTextScreen13.text4">[trans2]</Trans>
    </p>
    <div className="list">
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.fullTextScreen13.text4a">[trans2]</Trans>
      </p>
      <ul>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen13.text5">[trans2]</Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen13.text6">[trans2]</Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen13.text7">[trans2]</Trans>
        </li>
        <li className="Consent__copy">
          <Trans i18nKey="consentinfo.fullTextScreen13.text8">[trans2]</Trans>
        </li>
      </ul>
    </div>
  </div>,
  <div>
    <h2>
      {' '}
      <Trans i18nKey="consentinfo.screen14.text1">[trans2]</Trans>
    </h2>
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
    <h2>
      <Trans i18nKey="consentEHR.welcome.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.welcome.text2">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.welcome.text3">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen1.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen1.text2">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen2.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen2.text2">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen3.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen3.text2">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen3.text3">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen3.text4">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen4.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen4.text2">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen5.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen5.text2">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen6.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen6.text2">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen6.text3">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen7.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen7.text2">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen7.text3">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen7.text4">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen8.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen8.text2">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen8.text3">[trans2]</Trans>
    </p>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen8.text4">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen9.text1">[trans2]</Trans>
    </h2>
    <p className="Consent__copy">
      <Trans i18nKey="consentEHR.screen9.text2">[trans2]</Trans>
    </p>
  </div>,
  <div>
    <h2>
      <Trans i18nKey="consentEHR.screen10.text1">[trans2]</Trans>
    </h2>
    <ul>
      <li>
        <Trans i18nKey="consentEHR.screen10.text2">
          <strong>[translate]</strong>[translate]
          <a href="mailto:COVIDRecoveryCorps@cumc.columbia.edu">[translate]</a>
        </Trans>
      </li>
      <li>
        <Trans i18nKey="consentEHR.screen10.text3">
          <strong> [translate] </strong> [translate
          <a href="mailto:help@WIRB.com">help@WIRB.com</a> [translate]
        </Trans>
      </li>
    </ul>
  </div>,
]



const ScreenComponent: React.FunctionComponent<{ind: number | SCREENS_ENUM}> = ({
 ind
}: {ind: number| SCREENS_ENUM}) => {

const screens: { [key in SCREENS_ENUM]: JSX.Element } = {
  CONSENT_INTRO: (
    <>
      <h2>
        <Trans i18nKey="consentinfo.welcome.text1">[trans2]</Trans>
      </h2>
      <div className="Consent__copy">
        <p className="Consent__copy">
          <Trans i18nKey="consentinfo.welcome.text2">[trans2]</Trans>
        </p>
        <p className="Consent__copy">
          <Trans i18nKey="consentinfo.welcome.text3">[trans2]</Trans>
        </p>
      </div>
    </>
  ),
  CONSENT_SIGNATURE1: (
    <p className="Consent__copy">
      <Trans i18nKey="consentinfo.screen15.text1">[trans2]</Trans>
    </p>
  ),
  CONSENT_SIGNATURE2: (
    <p className="Consent__copy">
      <ul>
        <li>
          <Trans i18nKey="consentinfo.screen15.text3">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentinfo.screen15.text4">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentinfo.screen15.text5">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentinfo.screen15.text6">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentinfo.screen15.text7">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentinfo.screen15.text8">[trans2]</Trans>
        </li>
      </ul>
    </p>
  ),
  CONSENT_SHARING: (
    <div>
      <p className="Consent__copy">
        <Trans i18nKey="consentinfo.screen15.text9">[trans2]</Trans>
      </p>
    </div>
  ),
  HIPAA_LAST_INTRO: <></>,
  HIPAA_LAST_TERMS: (
    <p className="Consent__copy">
      <ul>
        <li>
          <Trans i18nKey="consentEHR.screen11.text2">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentEHR.screen11.text3">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentEHR.screen11.text4">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentEHR.screen11.text5">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentEHR.screen11.text6">[trans2]</Trans>
        </li>
        <li>
          <Trans i18nKey="consentEHR.screen11.text7">[trans2]</Trans>
        </li>
      </ul>
    </p>
  ),
  HIPAA_LAST_CHECKBOX: (
    <>
      <strong>
        <Trans i18nKey="consentEHR.screen11.text8">[trans2]</Trans>
      </strong>
    </>
  ),
}
return screens[ind as SCREENS_ENUM]
}

export const ConsentCopy: React.FunctionComponent<ConsentCopyProps> = ({
  stepInfo,
  screen,
  isEHR,
}: ConsentCopyProps) => {
  if (screen) {
    return <ScreenComponent ind={screen}></ScreenComponent>
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
