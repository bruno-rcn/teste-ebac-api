/// <reference types="cypress"/>

let token

beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => {
        token = tkn
    })
});

describe('Funcionalidade: Produtos', () => {
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
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                // TODO: CRIAR PRODUTO DINAMICO
                "nome": "PS7",
                "preco": 470,
                "descricao": "Video game",
                "quantidade": 500
            }
          }).should((response) => {
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
            expect(response.status).to.equal(201)
          })
    });
});