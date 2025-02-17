describe('Signin Test', () => {
  it('Visits the app and sign in', () => {
    cy.visit('/')
    cy.wait(1500)
    cy.get('button.bg-green').contains('Connexion').click({force: true})
    cy.get('input[name="email"]').type('mickaeldesclaux@gmail.com')
    cy.get('input[name="password"]').type('12345Azer!!')
    cy.wait(500)
    cy.get('button[type="submit"]').click()
  })
})