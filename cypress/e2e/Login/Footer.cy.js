describe('Validar Footer', () => {

    it('Validar "Contacto" ', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/home')
        cy.get(':nth-child(2) > .link_footer').click().then(() => {
        cy.get('.contact_form').should('be.visible')
        cy.get('.contact_pt_a > .xthin').should('contain.text','Necesito')
        cy.get('.contact_pt_a > .xbold').should('contain.text','más información')
        cy.get('#validateOnly_subject').type('nvio de información')
        cy.get('#validateOnly_email').type('mhernandez@redcompanies.com.mx')
        cy.get('#validateOnly_textMessage').type('Mensaje de prueba')
        cy.get('.ant-space-item > .ant-btn').click({force:true})
        cy.get('.swal-modal').should('be.visible')
        cy.get('.swal-text').should('contain.text', 'Gracias por contactarnos, te buscarémos a la brevedad.')
        cy.get('.swal-button').click()
        cy.get('.swal-modal').should('not.be.visible')

    })

})

    it.only('Validar "Decálogo", "Aviso de Privacidad" y "Términos y condiciones" ', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/home')
        cy.get('.link_footer').eq(1).should('have.attr', 'href') 
        .and('include', '/ambienteseguro.pdf');

        cy.get('.link_footer').eq(2).should('have.attr', 'href') 
        .and('include', '/avisoprivacidad.pdf');

        cy.get('.link_footer').eq(3).should('have.attr', 'href') 
        .and('include', '/terminosycondiciones.pdf');


 
    })
})