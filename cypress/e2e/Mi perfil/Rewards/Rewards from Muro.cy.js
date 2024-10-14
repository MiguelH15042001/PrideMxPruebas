describe('Rewards from Muro', () => {
let RewardPoint
    it.only('Validar entrada y vista', () => {
        cy.login()
        cy.get('.icon-profile') // Reemplaza con el selector del elemento sobre el que quieres hacer hover
         .trigger('mouseover').then(() => {
          cy.intercept('GET', `api/BackEnd/RewardProducts?rewardCategoryId=0`).as('getPoints')

         cy.get('.rs-dropdown-item-content') // Selecciona todos los elementos con la clase especificada
        .eq(1) // Selecciona el primer elemento de la lista
        .click();

        cy.url().should('include', '/rewards');

        cy.get('h2').should('contains.text','Rewards')
        cy.get('.rewards-points > img').should('be.visible')
        cy.wait(5000)

        cy.get('.points > h5').invoke('text').then(text => {
            // Asigna el texto a la variable
            RewardPoint = text.trim(); // Usamos trim() para eliminar espacios en blanco adicionales
            cy.log('Texto del h5:', RewardPoint);
  
          });


          cy.wait('@getPoints').then(({ response }) => {
            let apiPoints = response.body.data.reward;
            cy.log(apiPoints)
            expect(Number(RewardPoint)).to.equal(apiPoints);

          }); 




    })
})
})



