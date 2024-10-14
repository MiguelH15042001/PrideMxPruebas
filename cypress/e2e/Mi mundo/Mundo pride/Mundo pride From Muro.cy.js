describe('Mi perfil', () => {
 let Post2024
  before(() => {
    const email = Cypress.env('email');
    cy.obtenerAspNetUserId(email); // Usa el comando personalizado para obtener el AspUserId
  });

    let FirstYear



    it.only('Validar entrada y vista', () => {
        cy.login()
        cy.get('.icon-categories') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
        .trigger('mouseover')
        .then(() => {
          cy.intercept('GET', `api/backend/CompanyPost/DateFilters/0/1`).as('getYears')

       cy.get('.dashboard-header-menu > :nth-child(1) > :nth-child(3) > .rs-btn-toolbar > .rs-dropdown > .rs-dropdown-menu > :nth-child(1) > .rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click({force: true});

        cy.url().should('include', '/blog-company');

        cy.get('.col-sm-12 > h2').should('contain.text', 'Mundo Pride')

        cy.get('.blog-company-main-card').should('be.visible')

        cy.get('img') // Selecciona todas las imágenes en la página
        .should('have.length', 3) // Verifica que hay al menos una imagen

        cy.wait(4000)

        cy.get('.publications-list > :nth-child(1) > :nth-child(1) > p > span')
        .invoke('text') // Obtener el texto del elemento
        .then((text) => {
        FirstYear = parseInt(text, 10); // Convertir el texto a número (base 10)
        cy.log(FirstYear); // Imprimir el número en la consola de Cypress
            // Puedes usar 'number' en tus aserciones o lógica adicional aquí
        });

      



        cy.wait('@getYears').then(({ response }) => {
          cy.log(`Datos de la respuesta: ${JSON.stringify(response.body)}`);

          // Ajusta aquí según la estructura real de la respuesta
          const data = response.body.data; // La propiedad 'data' contiene el array de años
    
          // Verifica si data es un array
          if (Array.isArray(data)) {
            // Encuentra el objeto para el año 2024
            const year2024 = data.find(item => item.year === '2024');
            // cy.get('.publications-list > :nth-child(1) > :nth-child(1) > p > span').should(17)
            
    
            // Verifica que el objeto para el año 2024 fue encontrado
            if (year2024) {
              // Extrae los meses del año 2024
              const months2024 = year2024.months;
    
              // Suma los counts de los meses
              const totalCount2024 = months2024.reduce((sum, month) => sum + month.count, 0);
    
              // Log para depuración
              cy.log(`Total de counts para el año 2024: ${totalCount2024}`);
    
              // Ejemplo de aserción: Verifica que el total de counts es el esperado
              expect(totalCount2024).to.be.a('number'); // Verifica que el total es un número
              expect(totalCount2024).to.equal(FirstYear); // Cambia el valor esperado según tus datos
            } else {
              throw new Error('No se encontraron datos para el año 2024.');
            }
          } else {
            throw new Error('La respuesta no contiene un array en la propiedad esperada.');
          }
        
        }); 
      
     })
})



});