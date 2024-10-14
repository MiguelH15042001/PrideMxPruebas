describe('Container page', () => {

    it('Validar "Actividades del usuario" ', () => {
        cy.login()
        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
         .trigger('mouseover').then(() => {
            
            cy.intercept('GET', '/api/BackOffice/Attendee/GetUserActivity/false').as('getUserActivity');

         cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click();
        
      

        cy.url().should('include', '/profile');
        cy.get('.nav > :nth-child(1) > .active').should('exist');
        cy.get('.nav > :nth-child(2) > .active').should('not.exist');
        cy.get('.nav > :nth-child(3 ) > .active').should('not.exist');

        cy.get('.active > .table-container > h5').should('contain.text','Historial de actividades')
        cy.wait(3000)
        
        cy.wait('@getUserActivity').then(({ response }) => {
          let apiName = response.body.data.map(item => item.name); // Extrae el campo 'name' de la respuesta de la API
        
          // Verifica que la tabla esté visible
          cy.get('.table-activities').should('be.visible').then(() => {
            // Obtén los datos de la tabla
            cy.get('.table-activities > tbody > tr').then($rows => {
              const tableNames = [];
        
              // Recorre cada fila en el <tbody> y extrae el valor del segundo <td>
              cy.wrap($rows).each(($row) => {
                cy.wrap($row).find('td').eq(1).invoke('text').then(text => {
                  tableNames.push(text.trim());
                });
              }).then(() => {
                // Ordena ambos arreglos para facilitar la comparación
                tableNames.sort();
                apiName.sort();
        
                // Imprime los datos para depuración
                cy.log('Datos de la tabla:', JSON.stringify(tableNames, null, 2));
                cy.log('Datos de la API:', JSON.stringify(apiName, null, 2));
                // Compara los nombres de la tabla con los nombres de la API
                expect(tableNames).to.deep.equal(apiName);
              });
            });
          });
 
        });
      
      });  
  



})

});