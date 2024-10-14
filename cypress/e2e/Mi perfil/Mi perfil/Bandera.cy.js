describe('Registro', () => {

    it.only('Validar entrada y vista', () => {
        cy.login()
        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
        .trigger('mouseover').then(() => {

        cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
       .first() // Selecciona el primer elemento de la lista
       .click();

       cy.url().should('include', '/profile');
        })

        cy.get('.col-md-5 > h2').should('contains.text','Mi Bandera')

        cy.get('.form-check > .form-check-label > .flag').first().click().then(() => {
            cy.get('.swal-modal').should('be.visible')
            cy.get('.swal-text').should('contain.text','El perfil se actualizó correctamente')
            cy.get('.swal-button').click().then(() => {
                cy.get('.swal-modal').should('not.exist')

            })

        })




    })



});


