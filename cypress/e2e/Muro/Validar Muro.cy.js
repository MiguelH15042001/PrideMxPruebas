describe('Validar Muro', () => {
  let itemTitle
    
    it('Validar "Avisos" ', () => {
        cy.login()
        cy.get('.splide-dashboard-slider').should('be.visible')
    })
    
    it('Validar "Grupos de Interés" ', () => {
        cy.login()
        cy.get('.wrapper_muro_groupint').should('be.visible')
        cy.get('.wrapper_muro_groupint > .ttls_in_muro > a').should('contain.text','Grupos de interés')
        cy.get('.muro_groupint_info').should('have.length', 4);
        cy.get('.link_more_go > a').click()
        cy.url().should('include', '/interest-group');

    })
    it('Validar "Cartelera Pride" ', () => {
        cy.login()
        cy.get('.cartelera').should('be.visible')
        cy.get('.cartelera').should('contain.text','Cartelera Pride')
        cy.get('.cartelera > .itemcard_content > .itemcard_content_info > .itemcard_content_title').each(($el) => {
            // Verifica que cada elemento contenga texto
            cy.wrap($el).should('not.be.empty');
          });

          cy.get('.cartelera > .itemcard_content > .itemcard_content_info > .itemitemcard_content_description').each(($el) => {
            // Verifica que cada elemento contenga texto
            cy.wrap($el).should('not.be.empty');
          });

    })

    it('Validar "Economía Incluyente" ', () => {
        cy.login()
        cy.get('.economia').should('be.visible')
        cy.get('.economia > .ttls_in_muro > a > span').should('contain.text','Economía Incluyente')
        cy.get('.economia > .itemcard_content > .itemcard_content_info > .itemcard_content_title > a').each(($el) => {
            // Verifica que cada elemento contenga texto
            cy.wrap($el).should('not.be.empty');
          });

          cy.get('.economia > .itemcard_content > .itemcard_content_info > .itemitemcard_content_description').each(($el) => {
            // Verifica que cada elemento contenga texto
            cy.wrap($el).should('not.be.empty');
          });

    })

    it('Validar "Mundo Pride" ', () => {
        cy.login()
        cy.get('.prideWorld-container').should('be.visible')
        cy.get('.prideWorld-container > .ttls_in_muro > a').should('contain.text','Mundo Pride')
        cy.get('#splide01 .card-worldpride-content').should('have.length', 6)

    })

    it('Validar "PrideTalks" ', () => {

        cy.clearCookies() // clear all cookies
        cy.login()
        cy.wait(3000)
        cy.get('.pridetalks').should('be.visible')
        cy.get('.pridetalks > .ttls_in_muro > span').should('contain.text','PrideTalks')
        cy.get('.pridetalks > .itemcard_content > .itemcard_content_info > .itemcard_content_title')
        .invoke('text')  // Obtiene el texto del elemento
        .then(text => {
        itemTitle = text.trim(); 
          });
          cy.task('queryDatabase', {
            query: 'SELECT TOP 1* FROM Auditorium ORDER BY AuditoriumId DESC'
          }).then(results => {
            const lastRecord = results[0]; // Asume que el resultado es una lista de objetos
            expect(lastRecord.Title).to.equal(itemTitle); // Asegúrate de ajustar `title` a la columna correcta
          

          const ConferenceDateText = results[0].ConferenceDate;
          const ConferenceDate = new Date(ConferenceDateText);
          const today = new Date();
        
          // Normalizar las fechas para comparar solo las fechas
          today.setHours(0, 0, 0, 0); // Establece la hora a medianoche
          ConferenceDate.setHours(0, 0, 0, 0); // Establece la hora a medianoche
        
          if (ConferenceDate > today) {
            // Si la fecha de la conferencia es mayor que hoy
            cy.get('.pridetalks > .tag > .badge')
              .should('contain.text', 'Próximamente');
          } else {
            // Si la fecha de la conferencia es menor o igual a hoy
            cy.get('.pridetalks > .tag > .badge')
              .should('contain.text', 'Evento disponible');
          }
        });
          
    })


    it('Validar "Orgullo LGBTQ+" ', () => {

      cy.clearCookies() // clear all cookies
      cy.login()
      cy.wait(3000)
      cy.get('.pridetalks').should('be.visible')
      cy.get('.economia > .ttls_in_muro > a > span').should('contain.text','Economía Incluyente')
      cy.get('.orgullo > .itemcard_content > .itemcard_content_info > .itemcard_content_title > a')
      .invoke('text')  // Obtiene el texto del elemento
      .then(text => {
      itemTitle = text.trim(); 
        });
        cy.task('queryDatabase', {
          query: 'SELECT TOP 1* FROM CompanyPost where CompanyPostCategoryId = 2 and Active = 1 AND CompanyId = 871 ORDER BY CompanyPostId DESC'
        }).then(results => {
          const lastRecord = results[0]; // Asume que el resultado es una lista de objetos
          expect(lastRecord.Title).to.equal(itemTitle); // Asegúrate de ajustar `title` a la columna correcta
      });
        
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

    it('Validar "Decálogo", "Aviso de Privacidad" y "Términos y condiciones" ', () => {
        cy.visit('https://as-pridemx-frontend-dev.azurewebsites.net/home')
        cy.get('.link_footer').eq(1).should('have.attr', 'href') 
        .and('include', '/ambienteseguro.pdf');

        cy.get('.link_footer').eq(2).should('have.attr', 'href') 
        .and('include', '/avisoprivacidad.pdf');

        cy.get('.link_footer').eq(3).should('have.attr', 'href') 
        .and('include', '/terminosycondiciones.pdf');


 
    })
  })
  
    


})  