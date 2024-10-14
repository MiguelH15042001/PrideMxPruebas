describe('Restore Password ', () => {

    it('Correo correcto', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/login')
        cy.get('.form-login-recover > button').click()
        cy.get('.login-header-title').should('contain.text','RECUPERAR CONTRASEÑA')
        cy.get('.login-header-subtitle').should('contain.text','Ingresa tu correo electrónico y te enviaremos las instrucciones sobre cómo restablecerla.')
        cy.get('#email').type('mhernandez+6@redcompanies.com.mx')  
        cy.get('#btnValidate').click()
        cy.get('.btn-login').should('contain.text','Recuperar contraseña')
        cy.get('.btn-login').click().then(() => {
        cy.get('.swal-modal').should('be.visible')
        cy.get('.swal-text').should('contain.text', 'Se ha enviado un link a tu correo para reestablecer tu contraseña')
         })
        cy.get('.swal-button').click()

    })

    
    it('Correo Incorrecto', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/login')
        cy.get('.form-login-recover > button').click()
        cy.get('.login-header-title').should('contain.text','RECUPERAR CONTRASEÑA')
        cy.get('.login-header-subtitle').should('contain.text','Ingresa tu correo electrónico y te enviaremos las instrucciones sobre cómo restablecerla.')
        cy.get('#email').type('mhernandez+26@redcompanies.com.mx')  
        cy.get('#btnValidate').click()
        cy.get('.swal-modal').should('be.visible')
        cy.get('.swal-text').should('contain.text','El usuario no está registrado.')
        cy.get('.swal-button').click().then(() => {
        cy.get('.swal-modal').should('not.be.visible')
    })

    })


})