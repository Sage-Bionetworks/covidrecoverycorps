import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  env: {
    comment:
      "those are fake accounts so they don't have to be secure +ny713 has result +ny824 has surveys",
    test_password: 'nycrc',
    login_result: 'alina.gendel+ny713@gmail.com',
    login_surveys: 'alina.gendel+ny824@gmail.com',
    login_surveys_completed: 'alina.gendel+ny820@gmail.com',
    bridge_api: 'https://webservices.sagebridge.org/',
  },
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
  },
})
