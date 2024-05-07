/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', function(){
    cy.get('#firstName').type('Ely',{delay: 0})
    cy.get('#lastName').type('Rabelo',{delay: 0})
    cy.get('#email').type('elyrabelodealbuquerque@gmail.com',{delay: 0})
    cy.get('#open-text-area').type('Teste em progresso',{delay: 0})
    cy.get('.button').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function(){
    cy.get('#firstName').type('Ely',{delay: 0})
    cy.get('#lastName').type('Rabelo',{delay: 0})
    cy.get('#email').type('elyrabelodealbuquerque_gmail.com',{delay: 0})
    cy.get('#open-text-area').type('Teste em progresso',{delay: 0})
    cy.get('.button').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo de telefone só deverá aceitar números', function(){
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',
    function(){
      cy.get('#firstName').type('Ely',{delay: 0})
      cy.get('#lastName').type('Rabelo',{delay: 0})
      cy.get('#email').type('elyrabelodealbuquerque@gmail.com',{delay: 0})
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste em progresso',{delay: 0})
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, e-mail e telefone', function(){
      cy.get('#firstName').type('Ely',{delay: 0}).should('have.value', 'Ely').clear().should('have.value','')
      cy.get('#lastName').type('Rabelo',{delay: 0}).should('have.value', 'Rabelo').clear().should('have.value','')
      cy.get('#email').type('elyrabelodealbuquerque@gmail.com',{delay: 0}).should('have.value', 'elyrabelodealbuquerque@gmail.com').clear().should('have.value','')
      cy.get('#phone').type('92991912361',{delay: 0}).should('have.value', '92991912361').clear().should('have.value','')
      cy.get('#open-text-area').type('Teste em progresso',{delay: 0}).should('have.value', 'Teste em progresso').clear().should('have.value','')
    })

    it('Exibe mensagem de erro ao submeter o furmulário sem preencher os campos obrigatórios', function(){
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
    })

    it('Envia o formúlario com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSumbmit()

      cy.get('.success').should('be.visible')
    })
    
    it('Usando outra forma de fazer cliques', function(){
      cy.fillMandatoryFieldsAndSumbmit()
      cy.contains('button', 'Enviar')
      
      cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (Youtube) por seu texto', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"',function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('Revisão teste: Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',
    function(){
      cy.get('#firstName').type('Ely',{delay: 0})
      cy.get('#lastName').type('Rabelo',{delay: 0})
      cy.get('#email').type('elyrabelodealbuquerque@gmail.com',{delay: 0})
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste em progresso',{delay: 0})
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
     })

     it('Seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it('Seleciona um arquivo simulando um Drag-and-Drop', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
     })

     it.only('Acessa a paágina de política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
     })

})