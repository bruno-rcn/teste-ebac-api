/// <reference types="cypress"/>

import contrato from "../contratos/produtos.contratos";

let token

beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => {
        token = tkn
    })
});

describe('Funcionalidade: Produtos', () => {

    it('Deve validar o contrato de produtos', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
          }).should((response) => {
            expect(response.body).to.have.property('produtos')
            expect(response.status).to.equal(200)
          })
    });

    it('Cadastrar produtos - POST', () => {
        let produto = 'Produto EBAC Nº ' + Math.floor(Math.random() * 100)
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                "nome": produto,
                "preco": 470,
                "descricao": "Video game",
                "quantidade": 500
            }
          }).should((response) => {
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
            expect(response.status).to.equal(201)
          })
    });

    it('Deve validar mensagem de produto ja cadastrado - POST', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                "nome": "PS5",
                "preco": 470,
                "descricao": "Video game",
                "quantidade": 500
            }, 
            failOnStatusCode: false
          }).should((response) => {
            expect(response.body.message).to.equal("Já existe produto com esse nome")
            expect(response.status).to.equal(400)
          })
    });

    it('Deve editar um produto com sucesso - PUT', () => {
        let qtd = Math.floor(Math.random() * 100)
        cy.request({
            method: 'PUT',
            url: 'produtos' + '/PfULNMuDaIRTsOUM',
            headers: {authorization: token},
            body: {
                "nome": "PS5 edit",
                "preco": 470,
                "descricao": "Video game",
                "quantidade": qtd
            }, 
          }).should((response) => {
            expect(response.body.message).to.equal("Registro alterado com sucesso")
            expect(response.status).to.equal(200)
          })
    });

    it('Deve deletar um produto com sucesso - DELETE', () => {
        cy.request({
            method: 'DELETE',
            url: 'produtos' + '/8dgusvcb0tdDjdgk',
            headers: {authorization: token},
          }).should((response) => {
            expect(response.body.message).to.equal("Registro excluído com sucesso")
            expect(response.status).to.equal(200)
          })
    });

});