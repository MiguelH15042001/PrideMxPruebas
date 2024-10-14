// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
const email = Cypress.env('email');
const pass = Cypress.env('pass');
const apiUrl = Cypress.env('apiUrl');
const timeout = Cypress.env('timeout');

Cypress.Commands.add('obtenerAspNetUserId', (email) => {
  const query = 'SELECT Id FROM AspNetUsers WHERE UserName = @UserName';
  const parameters = { UserName: email };

  cy.task('queryDatabase', { query, parameters })
    .then((results) => {
      // Imprime los resultados para depuración
      cy.log(`Results: ${JSON.stringify(results)}`);

      // Verifica si se obtuvieron resultados
      if (results.error) {
        // Maneja errores
        cy.log(`Error: ${results.error}`);
        throw new Error(results.error); // Lanza un error para que la prueba falle
      } else if (Array.isArray(results) && results.length > 0) {
        const AspUserId = results[0]?.Id;
        if (AspUserId) {
          // Guarda el AspUserId en Cypress.env
          Cypress.env('AspUserId', AspUserId);
          cy.log(`User ID saved: ${AspUserId}`);
        } else {
          throw new Error('No user ID found');
        }
      } else {
        throw new Error('No results found');
      }
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
// Configura variables globales si es necesario


// Puedes usar estas variables en comandos personalizados o configuraciones globales
Cypress.Commands.add('login', () => {
  cy.visit(`${Cypress.config('baseUrl')}/login`);
  cy.get('#email').type(email,{force:true});
  cy.get('#pass').type(pass);
  cy.get('.btn-login').click();
});
// Alternatively you can use CommonJS syntax:
// require('./commands')