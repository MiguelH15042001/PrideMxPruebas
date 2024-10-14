describe('Estado de cuenta', () => {

let NamePost
let datePost
let NamePostOur
let datePostOur


function normalizeDate(dateString) {
    // Primero elimina cualquier día de la semana y espacios adicionales
    let normalizedDate = dateString.replace(/(lunes|martes|miércoles|jueves|viernes|sábado|domingo)\s*/, '').trim();
    
    normalizedDate = normalizedDate.replace(/(\b\d\b)/g, '0$1');
    
    normalizedDate = normalizedDate.replace(/del\s*/, '').trim();
    
    normalizedDate = normalizedDate.replace(/\s+de\s+/g, ' ');

    return normalizedDate;
  }
  
  
    it('Guardar datos de publicación " ', () => {
        cy.login()
        cy.get('.icon-categories') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
        .trigger('mouseover')
        .then(() => {
       cy.get('.dashboard-header-menu > :nth-child(1) > :nth-child(3) > .rs-btn-toolbar > .rs-dropdown > .rs-dropdown-menu > :nth-child(1) > .rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click({force: true});

        cy.url().should('include', '/blog-company');

        cy.get('.content > h3')
        .invoke('text') // Obtener el texto del elemento
        .then((text) => {
        NamePost = text; // Convertir el texto a número (base 10)
        cy.log(NamePost); // Imprimir el número en la consola de Cypress
            // Puedes usar 'number' en tus aserciones o lógica adicional aquí
        });


        cy.get('.blog-company-main-card > .content > h6 > time')
        .invoke('text') // Obtener el texto del elemento
        .then((text) => {
        datePost = normalizeDate(text)
        cy.log(datePost); // Imprimir el número en la consola de Cypress
            // Puedes usar 'number' en tus aserciones o lógica adicional aquí
        });

    })

    })


    it('comparar datos de publicación ', () => {

        cy.login()
        cy.get('.icon-categories') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
        .trigger('mouseover')
        .then(() => {
        cy.get('.dashboard-header-menu > :nth-child(1) > :nth-child(3) > .rs-btn-toolbar > .rs-dropdown > .rs-dropdown-menu > :nth-child(1) > .rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .first() // Selecciona el primer elemento de la lista
        .click({force: true});
        cy.get('.blog-company-main-card > .content > .flex-end > .btn-show-more').click().then(() => {
        cy.wait(2000)

        cy.url().should('include', '/our-company');
        // Intercepta la solicitud POST a la API y alias el intercepto como 'getLikes'
        cy.intercept('POST', 'api/backend/InsertLikePost').as('getLikes');
        cy.intercept('POST', 'api/backend/DeleteLikePost').as('getDislikes');


            cy.get('.barra_likes_container > .rs-btn').click();
            cy.wait(1000);
            const aliasLikes = '@getLikes';
            const aliasDislikes = '@getDislikes';
            function waitForAnyRequest() {
                // Crear promesas para ambas solicitudes
                const waitForLikes = cy.wait(aliasLikes, { timeout: 10000 }).then(response => ({ response, alias: aliasLikes }));
                const waitForDislikes = cy.wait(aliasDislikes, { timeout: 10000 }).then(response => ({ response, alias: aliasDislikes }));
            
                // Utiliza Cypress.Promise.race para esperar la primera solicitud que se complete
                Cypress.Promise.race([waitForLikes, waitForDislikes]).then(({ response, alias }) => {
                    // Maneja la solicitud completada
                    cy.log(`Intercepted ${alias} request`);
                    expect(response.response.statusCode).to.equal(200);
                    const { title: TitlePost, like: LikesPost } = response.response.body.data;
                    expect(TitlePost).to.eq(NamePost);
            
                    if (alias === aliasLikes) {
                        expect(LikesPost).to.be.true;
                    } else if (alias === aliasDislikes) {
                        expect(LikesPost).to.be.false;
                    }
            
                    // Espera a la solicitud restante si es necesario
                    if (alias === aliasLikes) {
                        return cy.wait(aliasDislikes).then(response => {
                            cy.log('Intercepted getDislikes request');
                            expect(response.response.statusCode).to.equal(200);
                            const { title: TitlePost, like: LikesPost } = response.response.body.data;
                            expect(TitlePost).to.eq(NamePost);
                            expect(LikesPost).to.be.false;
                        });
                    } else if (alias === aliasDislikes) {
                        return cy.wait(aliasLikes).then(response => {
                            cy.log('Intercepted getLikes request');
                            expect(response.response.statusCode).to.equal(200);
                            const { title: TitlePost, like: LikesPost } = response.response.body.data;
                            expect(TitlePost).to.eq(NamePost);
                            expect(LikesPost).to.be.true;
                        });
                    }
                }).catch(() => {
                    cy.log('Neither request was intercepted.');
                    throw new Error('Neither request was intercepted.');
                });
            }
            
            // Llama a la función
            waitForAnyRequest();
        

    })      
        })

    })



})