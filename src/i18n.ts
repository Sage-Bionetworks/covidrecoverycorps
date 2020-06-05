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

const savedLanguage = window.localStorage.getItem('appUILang') || 'en'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng:  savedLanguage ,
    fallbackLng: 'en',
    whitelist: ['en', 'es'],
    debug: true,
    keySeparator: '.', // we do not use keys in form messages.welcome
   
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;