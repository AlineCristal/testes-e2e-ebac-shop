/// <reference types="cypress" />
var faker = require('faker');
var quantidade = 4
let dadosLogin
let nomeFaker = faker.name.firstName()
let sobrenomeFaker = faker.name.lastName()
let emailFaker = faker.internet.email(nomeFaker)

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
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })

    });

    it('Deve fazer um teste e2e usando comandos customizados', () => {

        cy.get('.page-title').should('contain', 'Minha conta')
        cy.addProdutos('Abominable Hoodie', 4)
        cy.preCadastro('Aline', 'Teste01', 'Dasa', 'Avenida XXY', '321', '06070390', '11987675476', 'aluno_ebac@teste.com')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado')

    })
})
