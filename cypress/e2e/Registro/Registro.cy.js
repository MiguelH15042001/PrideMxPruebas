describe('Registro', () => {

    let email = 'correoprueba@redcompanies.com'
    let randomNumber = Math.floor(Math.random() * 10000) + 1;
    let emailP =randomNumber+email
    let emailI='Test'+emailP



    it('Registro correcto', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/home')
        cy.get('.text-center > a').click().then(() => {
            cy.url().should('include', '/register');
            cy.get('h2').should('have.text', 'Quieroregistrarme');
            
            cy.get('#firstName').type('Miguel')
            cy.get('#lastName').type('HernandezP')
            cy.get('.ant-picker').click()
            cy.get('.ant-select-selection-search').click()
            cy.get('.ant-select-item-option-content').first().click()
            cy.get('#email').type(emailP)
            cy.get('#password').type('Zimapan1?')
            cy.get('#confirmPassword').type('Zimapan1?',{force: true})
            cy.get('.ant-btn-primary').click()
            cy.wait(5000)

            cy.task('queryDatabase', { query: `SELECT * FROM AspNetUsers WHERE Email = '${emailP}'` })
            .then((results) => {
            expect(results).to.have.length.greaterThan(0);
        });
        })

    })

    it('Registro incorrecto', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/home')
        cy.get('.text-center > a').click().then(() => {
            cy.url().should('include', '/register');
            cy.get('h2').should('have.text', 'Quieroregistrarme');
            
            cy.get('#firstName').type('Miguel')
            cy.get('#lastName').type('HernandezP')
            cy.get('.ant-picker').click()
            cy.get('.ant-select-selection-search').click()
            cy.get('.ant-select-item-option-content').first().click()
            cy.get('#email').type('11ds'+randomNumber+email)
            cy.get('#password').type('Z')
            cy.get('#confirmPassword').type('Z',{force: true})
            cy.get('.ant-btn-primary').click()
            cy.wait(5000)

            cy.task('queryDatabase', { query: `SELECT * FROM AspNetUsers WHERE Email = '${emailI}'` })
            .then((results) => {
            expect(results).to.have.lengthOf(0);
        });
        })

    })


    
    it('Usuario Registrado', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/home')
        cy.get('.text-center > a').click().then(() => {
            cy.url().should('include', '/register');
            cy.get('h2').should('have.text', 'Quieroregistrarme');
            
            cy.get('#firstName').type('Miguel')
            cy.get('#lastName').type('HernandezP')
            cy.get('.ant-picker').click()
            cy.get('.ant-select-selection-search').click()
            cy.get('.ant-select-item-option-content').first().click()
            cy.get('#email').type(emailP)
            cy.get('#password').type('Zimapan1?')
            cy.get('#confirmPassword').type('Zimapan1?',{force: true})
            cy.get('.ant-btn-primary').click()
            cy.wait(10000)
            cy.get('.swal-text').should('have.text','Este usuario ya está registrado ó utiliza otro correo electrónico')
        });
        })

    

})