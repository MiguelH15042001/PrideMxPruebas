describe('Mi perfil', () => {

    it.only('Validar entrada y vista', () => {
        cy.login()
        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
         .trigger('mouseover').then(() => {

         cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click();

        cy.url().should('include', '/profile');

        cy.get('.col-md-7 > h2').should('contain.text', 'Mi Perfil')

        cy.get('.profile').should('be.visible')




    })
})



});