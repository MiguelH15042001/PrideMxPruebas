describe('Estado de cuenta', () => {

    it('Validar "Estado de cuenta" ', () => {
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



       cy.get('[href="/account-status"]').click()
       cy.url().should('include', '/account-status');
       cy.get('.container-redemption-table').should('be.visible')
       cy.get('body').then(($body) => {
        // Verifica si el elemento existe en el DOM
        if ($body.find('.ant-table-tbody > :nth-child(2) > :nth-child(1)').length > 0) {
                 
        } else {
            // Si el elemento no existe, valida que no haya otros elementos similares
            cy.get('.ant-table-tbody > :nth-child(2) > :nth-child(1)').should('not.exist');
            cy.log('No existe ninguno ')
        }
    });


    })

})
})