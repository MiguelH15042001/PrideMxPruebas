describe('Container page', () => {

    it('Validar "Actividades del usuario" ', () => {

      const email = Cypress.env('email');

        cy.login()
        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
         .trigger('mouseover').then(() => {
            
          cy.task('queryDatabase', {
            
            query: 'SELECT * FROM AspNetUsers WHERE email = @UserName',
            parameters: { UserName: email }          }).then(results => {
            const lastRecord = results[0];
            cy.wrap(lastRecord.Id).as('savedId');

        });

        cy.get('@savedId').then(savedId => {
          // Usa el ID para hacer algo más, por ejemplo, verificar en una página o API
          cy.log('El ID guardado es:', savedId);

          cy.intercept('GET', `/api/BackEnd/Postulant/GetByUserId?userId=${savedId}`).as('getPostulations')

      
          
      })
      
      ;
         cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click();
        
      

        cy.url().should('include', '/profile');
        cy.get(':nth-child(3) > .nav-link').click()
        cy.get('.nav > :nth-child(1) > .active').should('not.exist');
        cy.get('.nav > :nth-child(2) > .active').should('not.exist');
        cy.get('.nav > :nth-child(3 ) > .active').should('exist');

        cy.get('.active > .table-container > h5').should('contain.text','Lista de mis postulaciones')
        cy.wait(3000)



        
        cy.wait('@getPostulations' ,{ timeout: 10000 }).then(({ response }) => {
            let apiJobTitle = response.body.data.map(item => item.jobTitle.trim().toLowerCase());
          
            // Verifica que la tabla esté visible
            cy.get('.table-postulations').should('be.visible').then(() => {
              // Verifica si la tabla tiene filas
              cy.get('.table-postulations').then($rows => {


                cy.get('body').then(($body) => {
                  // Verifica si el elemento con la clase .icon-empty está visible
                  if ($body.find('.icon-empty').length === 1) {
                    // Si el icono está presente, verifica el mensaje "No hay registros"
                    cy.get('.table-postulations > tbody > tr > td > p').should('contain.text', 'No hay registros');
                  } else {
                  // Si hay filas, obtén los datos de la tabla
                  cy.get('.table-postulations > tbody > tr').should('have.length.greaterThan', 0)
                  .then($rows => {
                    const tableTitles = [];
                
                    // Extrae el texto del segundo <td> de cada fila
                    cy.wrap($rows).each(($row) => {
                      cy.wrap($row).find('td').eq(1).invoke('text').then(text => {
                        tableTitles.push(text.trim().toLowerCase());
                      });
                    }).then(() => {
                      // Asegúrate de que todos los datos han sido recogidos antes de continuar
                      cy.wrap(null).then(() => {
                        // Ordena ambos arreglos para facilitar la comparación
                        tableTitles.sort();
                
                        // Supongamos que apiJobTitle se ha definido en el alcance adecuado y contiene los datos esperados
                        // Aquí, se realiza una comparación profunda de los arrays
                        cy.log('Datos de la tabla:', JSON.stringify(tableTitles, null, 2));
                        cy.log('Datos de la API:', JSON.stringify(apiJobTitle, null, 2));
                
                        // Asegúrate de que apiJobTitle esté en el formato esperado
                        apiJobTitle = apiJobTitle.map(title => title.toLowerCase()).sort();
                
                        // Compara los nombres de la tabla con los nombres de la API
                        expect(tableTitles).to.deep.equal(apiJobTitle);
                      });
                    });
                  });
                }
              });
              });
            });
          });
          
          
      
      });  
  



})

});