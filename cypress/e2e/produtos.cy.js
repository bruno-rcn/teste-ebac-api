/// <reference types="cypress"/>

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
        // TODO: CRIAR TOKEN DINAMICO
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzA3NDA4MDQ4LCJleHAiOjE3MDc0MDg2NDh9.yvcBFLSOmMUeRd9qSrarqIAanJRAfTypFWvLB_EbEkI"
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                // TODO: CRIAR PRODUTO DINAMICO
                "nome": "PS5",
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