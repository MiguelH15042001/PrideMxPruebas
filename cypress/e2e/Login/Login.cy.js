describe('Logearse en PrideMx', () => {

    it('Login Correcto', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.get('#email').type('mhernandez@redcompanies.com.mx');
        cy.get('#pass').type('Zimapan1?')

        cy.url().then((currentUrl) => {
            // Almacena la URL en una variable global
            cy.wrap(currentUrl).as('initialUrl');
          });

        cy.get('.btn-login').click()

        cy.get('@initialUrl').then((initialUrl) => {
            cy.url().should('not.eq', initialUrl);
          });
        
    })


    it('Login Incorrecto', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.get('#email').type('mhernandez@redcompanies.com.mx');
        cy.get('#pass').type('Zimapan1?1')

        cy.get('.btn-login').click()

        cy.get('.swal-modal').should('contain', 'Datos incorrectos por favor revisa usuario y contraseña.')
        
    })





})