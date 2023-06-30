/// <reference types="cypress" />
var faker = require ('faker');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      
  cy.get('[class="product-block grid"]')
   //.first()
   //.last()
  //.eq(3)
   .contains('Abominable Hoodie')
   .click()
})

it('Deve adicionar um produto ao carrinho', () => {
    var quantidade = 4
    cy.get('[class="product-block grid"]')
    .contains('Abominable Hoodie').click()
    cy.get('.button-variable-item-XS').click()
    cy.get('.button-variable-item-Green').click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()

    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
    cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho')
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()

    cy.get('#billing_first_name').type('Aline')
    cy.get('#billing_last_name').type('Teste01')
    cy.get('#select2-billing_country-container').click().type('Brasil'+'{enter}')
    cy.get('#billing_address_1').type('Avenida XXY')
    cy.get('#billing_city').type('321')
    cy.get('#select2-billing_state-container').click().type('São Paulo').click()
    cy.get('#billing_postcode').type('06070-390')
    cy.get('#billing_phone').type('1198767-5476')
    cy.get('#billing_email').type(faker.internet.email())
    cy.get('#payment_method_cod').click()
    cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()
    cy.get('#place_order').click()

    cy.get('.woocommerce-notice').should('contain','Obrigado')

});

it('Deve fazer o e2e  - usando comandos customizados' , () =>{
    var quantidade = 4
 
    cy.addProdutos('Abominable Hoodie', 4 )
    cy.preCadastro('Aline', 'Teste01', 'Brasil', 'Avenida XXY', '321', 'São Paulo', '06070-390', '1198767-5476', 'testes_aluno20@teste.com' )
})

}) 
