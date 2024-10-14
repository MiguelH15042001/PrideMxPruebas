describe('Tu opinión from Muro', () => {
        it.only('Validar entrada y vista de "Tu opinión"', () => {
            cy.login()
            cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
             .trigger('mouseover').then(() => {
    
             cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
            .eq(2) // Selecciona el primer elemento de la lista
            .click();

            cy.url().should('include', '/surveys');

            cy.get('.mt-0').should('contains.text',"Tu opinión")
            cy.get('.mb-3').should('contains.text','Encuestas disponibles')
            cy.get('.border-pointed > p').should('contains.text','Esta encuesta es anónima y personal, lee detenidamente cada ítem, es muy fácil de responder, en la mayoría de las preguntas se pide que elijas entre varias posibilidades.')

            cy.wait(3000)
            cy.get('body').then(($body) => {
                // Verifica si el elemento existe en el DOM
                if ($body.find('.surveys-list > :nth-child(1)').length > 0) {
                    // Si el elemento existe, presiona el botón de descargar
                    cy.get(':nth-child(1) > .btn_next').click(); // Ajusta el selector para el botón de descargar
                    cy.get('.sec__ttl_surveys').should('be.visible')     
                    cy.get('.slick-active > :nth-child(1) > [tabindex="-1"]').should('be.visible')             
                } else {
                    // Si el elemento no existe, valida que no haya otros elementos similares
                    cy.get('.surveys-container-content-body > p').should('contains.text','Por el momento no tienes encuestas pendientes')
                    cy.log('No existe ninguno ')
                
                }
            });





        })
    })
})
    