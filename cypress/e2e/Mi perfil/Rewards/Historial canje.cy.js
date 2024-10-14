describe('Hitorial de canje', () => {

    it.only('Validar registros', () => {

    cy.login()
    

        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
         .trigger('mouseover').then(() => {

         cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .eq(1) // Selecciona el primer elemento de la lista
        .click();

        cy.url().should('include', '/rewards');

        cy.get('h2').should('contains.text','Rewards')
        cy.get('.rewards-points > img').should('be.visible')
        cy.wait(5000)




        cy.get('[href="/redemption-history"] > span').click()
        cy.url().should('include', '/redemption-history');

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        // Usa la función para obtener un número aleatorio entre 1 y 3
        const randomNumber = getRandomNumber(0, 2);
        cy.get('.form-select').select(2)
        cy.get('.wrapper_list_history').should('be.visible')

        cy.wait(6000)
        cy.get('body').then(($body) => {
            // Verifica si el elemento existe en el DOM
            if ($body.find('.wrapper_list_history > :nth-child(1)').length > 0) {
                // Si el elemento existe, presiona el botón de descargar
                cy.get(':nth-child(1) > :nth-child(5) > :nth-child(2) > .btn-dark').click(); // Ajusta el selector para el botón de descargar
                cy.get('.swal-text').should('contains.text','Cupón descargado exitosamente')                    
            } else {
                // Si el elemento no existe, valida que no haya otros elementos similares
                cy.get('.wrapper_list_history > :nth-child(1)').should('not.exist');
                cy.log('No existe ninguno ')
            }
        });
      






    })

    })

})
