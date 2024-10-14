describe('Notificaciones (Mi perfil)', () => {
    before(() => {
        // Configura Cypress para manejar errores no manejados
        Cypress.on('uncaught:exception', (err, runnable) => {
          // Si quieres ignorar un error específico, puedes comprobar el mensaje del error aquí
          if (err.message.includes('Cannot read properties of undefined')) {
            return false; // Ignora este tipo de errores
          }
          // Deja que Cypress maneje otros errores normalmente
          return true;
        });
      });
    it.only('Validar función botones', () => {

        
        cy.login()
        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
         .trigger('mouseover').then(() => {

         cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click();

        cy.url().should('include', '/profile');

        cy.get('.preferences-container').should('be.visible')
        cy.intercept('POST', '/api/Account/UpdateColor').as('updateColorT');


        cy.get('.notification-slider').first().click(23, 10).then(()=>{
          cy.wait('@updateColorT').then((interception) => {
            // Asegúrate de que la solicitud fue exitosa
            expect(interception.request.body).to.deep.include({
              EmailNotification: false,
              Notification: true
            });
            expect(interception.response.statusCode).to.equal(200);
      
            // Opcional: Verifica el contenido de la solicitud
            expect(interception.response.body).to.have.property('data', 'Actualizado');
      
          });

        })

        cy.get('.notification-slider').first().click(13, 10).then(()=>{
          cy.wait('@updateColorT').then((interception) => {

            expect(interception.request.body).to.deep.include({
              EmailNotification: false,
              Notification: false
                        });
            // Asegúrate de que la solicitud fue exitosa
            expect(interception.response.statusCode).to.equal(200);
            // Opcional: Verifica el contenido de la respuesta
            expect(interception.response.body).to.have.property('data', 'Actualizado');
          });

        })

       



    })

    })



});