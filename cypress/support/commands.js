Cypress.Commands.add('fillMandatoryFieldsAndSumbmit', function(){
    cy.get('#firstName').type('Ely',{delay: 0})
    cy.get('#lastName').type('Rabelo',{delay: 0})
    cy.get('#email').type('elyrabelodealbuquerque@gmail.com',{delay: 0})
    cy.get('#open-text-area').type('Teste em progresso',{delay: 0})
    cy.get('.button').click()
})