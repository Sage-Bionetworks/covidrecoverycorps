
beforeEach(() => {
    cy.viewport(1600, 800)
      window.localStorage.setItem('e2e', true)
  })

  afterEach(() => {
    window.localStorage.clear()
      
  })