describe('Signin Test', () => {
  it('Visits the app', () => {
    cy.visit('/')
    cy.wait(1500)
    cy.get('button.bg-green').contains('Connexion').click({force: true})
    cy.get('input[name="email"]').type('mickaeldesclaux@gmail.com')
    cy.get('input[name="password"]').type('bidulddAe12345!')
    cy.wait(500)
    cy.get('button[type="submit"]').click()
  })
})