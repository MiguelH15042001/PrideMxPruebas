describe('Container page', () => {

    it('Validar "Servicios publicados" ', () => {
        cy.login()
        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
         .trigger('mouseover').then(() => {
            
            cy.intercept('GET', 'api/BackEnd/GetMyDirectoryInfoList').as('getActivities');

         cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click();
        
      

        cy.url().should('include', '/profile');
        cy.get(':nth-child(2) > .nav-link').click()
        cy.get('.nav > :nth-child(1) > .active').should('not.exist');
        cy.get('.nav > :nth-child(2) > .active').should('exist');
        cy.get('.nav > :nth-child(3 ) > .active').should('not.exist');

        cy.get('.active > .table-container > h5').should('contain.text','Lista de servicios anunciados')
        cy.wait(3000)
        
        cy.wait('@getActivities').then(({ response }) => {
            let apiTitle = response.body.data.map(item => item.fullName.trim().toLowerCase());
          
            // Verifica que la tabla esté visible
            cy.get('.table-services-published').should('be.visible').then(() => {
              // Verifica si la tabla tiene filas
              cy.get('.table-services-published > tbody > tr').then($rows => {
                if (cy.get('.icon-empty').should('be.visible')) {
                  // Si no hay filas, verifica que el mensaje "No hay registros" esté presente
                  cy.get('.table-services-published > tbody > tr > td > p')
                    .should('contain.text', 'No hay registros');
                } else {
                  // Si hay filas, obtén los datos de la tabla
                  const tableTitles = [];
          
                  // Recorre cada fila en el <tbody> y extrae el valor del segundo <td>
                  cy.wrap($rows).each(($row) => {
                    cy.wrap($row).find('td').eq(1).invoke('text').then(text => {
                      tableTitles.push(text.trim().toLowerCase());
                    });
                  }).then(() => {
                    // Asegúrate de que todos los datos han sido recogidos antes de continuar
                    cy.wrap(null).then(() => {
                      // Ordena ambos arreglos para facilitar la comparación
                      tableTitles.sort();
                      apiTitle.sort();
          
                      // Imprime los datos para depuración
                      cy.log('Datos de la tabla:', JSON.stringify(tableTitles, null, 2));
                      cy.log('Datos de la API:', JSON.stringify(apiTitle, null, 2));
          
                      // Compara los nombres de la tabla con los nombres de la API
                      expect(tableTitles).to.deep.equal(apiTitle);
                    });
                  });
                }
              });
            });
          });
          
          
      
      });  
  



})

});