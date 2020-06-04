import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './assets/locales/en/translation.json'
import esTranslation from './assets/locales/es/translation.json'

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: 'en',
    whitelist: ['en', 'es'],

    keySeparator: '.', // we do not use keys in form messages.welcome
   
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;