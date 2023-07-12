/// <reference types="cypress" />
var faker = require ('faker');
var quantidade = 4
let dadosLogin

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/my-account/')
    });

    it('Deve fazer um teste e2e usando comandos customizados', () => {
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá')

    it('Login com sucesso usando Comando customizado', () => {
            cy.login(dadosLogin.usuario, dadosLogin.senha)
            cy.get('.page-title').should('contain', 'Minha conta')
    });
       

        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.get('[class="product-block grid"]')
        .contains('Abominable Hoodie').click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        
        cy.get('#billing_first_name').clear().type('Aline')
        cy.get('#billing_last_name').clear().type('Teste01')
        cy.get('#select2-billing_country-container').click().type('Brasil'+'{enter}')
        cy.get('#billing_address_1').clear().type('Avenida XXY')
        cy.get('#billing_city').clear().type('321')
        cy.get('#select2-billing_state-container').click().type('São Paulo').click()
        cy.get('#billing_postcode').clear().type('06070-390')
        cy.get('#billing_phone').clear().type('1198767-5476')
        cy.get('#billing_email').clear().type(faker.internet.email())
        cy.get('#payment_method_cod').click()
        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()
        cy.get('#place_order').click()
    
        
        cy.get('.woocommerce-notice').should('contain', 'Obrigado')

    })
})
