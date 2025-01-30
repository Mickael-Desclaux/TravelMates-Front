import 'cypress-file-upload';

beforeEach(() => {
  cy.wrap(Cypress.automation('remote:debugger:protocol', {
    command: 'Browser.grantPermissions',
    params: {
      permissions: ['geolocation'],
      origin: window.location.origin,
    }
  }));

  cy.window().then((win) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
      return cb({
        coords: {
          latitude: 48.8566,
          longitude: 2.2945,
          accuracy: 10
        }
      });
    });
  });
});

describe('Add pin Test', () => {
  it('Creates a pin', () => {
    cy.visit('/')
    cy.get('button.bg-green').contains('Connexion').click({force: true})
    cy.get('input[name="email"]').type('mickaeldesclaux@gmail.com')
    cy.get('input[name="password"]').type('bidulddAe12345!')
    cy.get('button[type="submit"]').click()
    cy.wait(500)
    
    cy.get('a').contains('Carte').click({force: true})
    cy.get('button[id="add-pin"]').click()
    cy.get('input[id="title"]').type('to')
    cy.wait(500)

    cy.get('.suggestions-container li').should('have.length.greaterThan', 0);
    cy.get('.suggestions-container').should('be.visible');
    cy.get('.suggestions-container li').contains('Toyota').click();
    cy.get('textarea[id="description"]').type("Toyota c tro bi1")
    cy.get('input[id="medias"]').attachFile('header_le_louvre.jpg')
    cy.wait(500)
    
    cy.contains('Sport').click()
    cy.contains('Gastronomie').click()
    cy.contains('Culture').click()
    cy.get('button[type="submit"]')
    cy.get('button[type="submit"]').click()
  })
})
