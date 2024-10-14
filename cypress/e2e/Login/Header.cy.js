describe('Validar Home de Login', () => {

    
    it('Header PrideMx', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.get(':nth-child(2) > .a_link_options').click()
        cy.get('.content_a > .ttl_primary').should('contain','#SOMOS')
        cy.get('.content_a > .ttl_primary > span').should('contain','PRIDEMX')

        cy.get('.content_a > .paragraph_lndgn').should('contain','Un espacio seguro donde nuestra comunidad puede conectarse para colaborar, hacer negocios, aprender, entretenerse y empoderarse.')
        cy.get('.btn_in_section').click().then(() => {
            cy.url().should('include', '/register');
            cy.get('h2').should('have.text', 'Quieroregistrarme');

        })
    })

    it('Header Pride Music', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.wait(3000)

        cy.get(':nth-child(3) > .a_link_options').click()
        cy.get('.content_info > .ttl_primary > span').should('have.text','PRIDE MUSIC')
        cy.get('.content_info > .paragraph_lndgn').should('contain','Descubre lxs exponentes musicales LGBTQ+ que te volarán la cabeza y agrégales a tu playlist favorita.')
     })

     it('Header Rewards', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.wait(3000)

        cy.get(':nth-child(4) > .a_link_options').click()
        cy.get('.sec_c_info > div > .ttl_primary > span').should('have.text','REWARDS')
        cy.get('.sec_c_info > div > .ttl_secundary').should('have.text','¡Acciones que tienen su recompensa!')
        cy.get('.sec_c_info > div > :nth-child(3)').should('contain','Secciones que te dan puntos acumulables y canjeables por descuentos y premios exclusivos.')
        cy.get('.sec_c_info > div > .mt-2 > strong').should('contain','¡Registrarte es solo el principio!')
    })

    it('Header Economia Incluyente', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.wait(3000)

        cy.get(':nth-child(5) > .a_link_options').click()
        cy.get('.sec_d_info > div > .ttl_primary > span').should('have.text','ECONOMÍA INCLUYENTE')
        cy.get('.sec_d_info > div > .ttl_secundary').should('contain','¡Siempre hay algo para alguien, en cualquier lugar!')
        cy.get('.sec_d_info > div > :nth-child(3)').should('contain','Ese sitio es aquí, donde emprendedores con servicios o productos buscan crecer sus negocios y encontrar personas que les necesitan.')

  
    })

    it('Header Home', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.wait(3000)

        cy.get(':nth-child(5) > .a_link_options').click()
        cy.get(':nth-child(1) > .a_link_options').click()
        cy.get('.cont_info_welcome > :nth-child(1)').should('have.text','Descubre todo el')
        cy.get('.mb').should('have.text','poder de la Comunidad')
        cy.get('.cont_info_welcome > :nth-child(3)').should('have.text', 'en un solo espacio')
        cy.get('form').should('be.visible');
    })

    it('Header redes sociales', () => {
        cy.visit('https://www.pridemx.com/login')
        cy.wait(3000)

        cy.get(':nth-child(1) > .box_link_fa').should('be.visible')
        cy.get('.facebook').should('have.attr', 'href') 
        .and('include', 'https://www.facebook.com/SomosPrideMx/');

        cy.get('.instagram').should('have.attr', 'href') 
        .and('include', 'https://instagram.com/somos_pridemx?igshid=YmMyMTA2M2Y=');

        cy.get('.twitter').should('have.attr', 'href') 
        .and('include', 'https://twitter.com/SomosPrideMx');

        cy.get('.twitter').eq(1).should('have.attr', 'href') 
        .and('include', 'https://www.youtube.com/@pridemx');

        cy.get('.twitter').eq(2).should('have.attr', 'href') 
        .and('include', 'https://www.linkedin.com/company/82353363');

        cy.get('.twitter').eq(3).should('have.attr', 'href') 
        .and('include', 'https://www.tiktok.com/@somos_pridemx');

    })


     
     



})