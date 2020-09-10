const getEndpoint = (url: string) => `${Cypress.env('bridge_api')}${url}`

const BRIDGE_API = Cypress.env('bridge_api')

function loginAsAdmin(): Cypress.Chainable {
  /* admin_email and admin_password should be stored in cypress.env.json and belong to real admin account*/
  return cy
    .request({
      method: 'POST',
      url: getEndpoint('auth/signIn'),
      body: {
        email: Cypress.env('admin_email'),
        password: Cypress.env('admin_password'),

        appId: 'czi-coronavirus',
      },
    })
    .then(response => {
      const token = response.body.sessionToken
      console.log('token,', token)
      return token
    })
}

function getSessionToken(): Cypress.Chainable {
  return cy.window().then(win => {
    const someItem = win.sessionStorage.getItem('bridge-session-ny-strong')
    const token = JSON.parse(someItem).token
    return token
  })
}

function createNewUser(token: string): Cypress.Chainable {
  const random = Math.floor(1000 + Math.random() * 9000)
  const userName = 'integration.test+ny' + random + '@gmail.com'
  const password = Cypress.env('test_password')
  return cy
    .request({
      method: 'POST',
      url: getEndpoint('users'),
      body: {
        email: userName,
        password: password,
        emailVerified: true,
        clientData: {},
        appId: 'czi-coronavirus',
        substudyIds: ['columbia'],
        dataGroups: ['test_user'],
      },

      headers: {
        'Bridge-Session': token,
      },
    })
    .then(response => {
      return { userName, password, userId: response.body.id }
    })
}

describe('New User', function () {
  it('Should see consent when logged in', function () {
    let adminToken = null
    loginAsAdmin().then(token => {
      adminToken = token
      createNewUser(token).then(({ userName, password, userId }) => {
        cy.login(userName, password)
        cy.wait(2500)
        const token = getSessionToken()
        cy.get('[data-cy="close-toolbar"]').click()
        cy.wait(500)
        cy.get('button').contains('Yes').click()

        cy.wait(500)
        cy.logout()

        cy.request({
          method: 'DELETE',
          url: getEndpoint('/users/' + userId),

          headers: {
            'Bridge-Session': adminToken,
          },
        }).then(response => {
          console.log('delete response', response.status)
        })
      })

      cy.wait(500)
    })
  })
})

describe('Existing User Before Testing', function () {
  it('should show surveys', function () {
    cy.login(Cypress.env('login_surveys'), Cypress.env('test_password'))
    cy.wait(1000)
    cy.get('h2').should('have.text', 'Study surveys')
    cy.wait(5000)
    cy.logout()
  })
})

describe("Landing page routing for user's datagroup", function () {
  beforeEach(() => {
    cy.server()
  })

  const data = [
    {
      expected: 'survey dashboard',
      dataGroups: [],
      dashboardPage: '[data-cy="page-dashboard"]',
    },
    {
      expected: 'appointment page',
      dataGroups: ['tests_scheduled'],
      dashboardPage: '[data-cy="page-appointment"]',
    },
    {
      expected: 'results page',
      dataGroups: ['tests_available', 'tests_scheduled'],
      dashboardPage: '[data-cy="page-result"]',
    },
  ]
  data.forEach(element => {
    it(`should go to  ${element.expected}`, function () {
      cy.fixture('self.json')
        .then(report => {
          report.dataGroups = element.dataGroups
          return report
        })
        .as('selfResponse')

      cy.route({
        method: 'GET',
        url: '*self*',
        response: '@selfResponse',
      }).as('loadSelf')

      cy.login(Cypress.env('login_result'), Cypress.env('test_password'))
      cy.wait(1000)
      cy.wait('@loadSelf').get(element.dashboardPage).should('exist')
      cy.wait(500)
      cy.logout()
    })
  })
})
describe('Existing User With Result', function () {
  beforeEach(() => {
    cy.server()
  })

  afterEach(() => {
    cy.logout()
  })

  const negativeMatchFn = $span => {
    expect($span[0].className).to.match(/resultDataHeaderNegative/)
    expect($span[0].innerHTML).to.match(/antibody negative/)
  }

  const positiveMatchFn = $span => {
    expect($span[0].className).to.match(/resultDataHeaderPositive/)
    expect($span[0].innerHTML).to.match(/positive/)
  }

  const indeterminateMatchFn = $span => {
    expect($span[0].className).to.match(/resultDataHeaderInconclusive/)
    expect($span[0].innerHTML).to.match(/cannot be determined/)
  }

  const badDataMatchFn = $span => {
    expect($span[0].className).to.match(/resultDataHeaderIndeterminate/)
    expect($span[0].innerHTML).to.match(/antibody indeterminate/)
  }

  const data = [
    {
      testResult: 'NEGATIVE',
      expected: 'negative result',
      matchFn: negativeMatchFn,
    },
    {
      testResult: 'POSITIVE',
      expected: 'positive result',
      matchFn: positiveMatchFn,
    },
    {
      testResult: 'INDETERMINATE',
      expected: 'positive result',
      matchFn: indeterminateMatchFn,
    },
    {
      testResult: 'SOMETHING',
      expected: 'invalid result',
      matchFn: indeterminateMatchFn,
    },
  ]
  data.forEach(element => {
    it(`should have ${element.expected} result`, function () {
      cy.fixture('observationReport.json')
        .then(report => {
          report.items[0].data.valueString = element.testResult
          return report
        })
        .as('observationReport')

      cy.route({
        method: 'GET',
        url: '*observation*',
        response: '@observationReport',
      }).as('getObservationReport')

      cy.login(Cypress.env('login_result'), Cypress.env('test_password'))
      cy.wait('@getObservationReport')
      if (element.expected !== 'invalid result') {
        cy.get('[data-cy=resultDataHeader]')
          .find('span')
          .should(element.matchFn)
      } else {
        cy.get('.MuiCard-root').should('exist')
      }
      cy.wait(1000)
    })
  })
})
