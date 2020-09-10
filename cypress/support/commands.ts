// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/loginPassword')
  cy.wait(1000)
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(`${password}{enter}`)
  cy.get('[data-cy=submit]').click()
})
  
Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Log Out').click()
})
