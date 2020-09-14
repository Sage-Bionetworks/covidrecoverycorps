
beforeEach(() => {
    cy.viewport(1600, 800)
      window.localStorage.setItem('crc_e2e', 'true')
  })

  afterEach(() => {
    window.localStorage.removeItem('crc_e2e')  
  })