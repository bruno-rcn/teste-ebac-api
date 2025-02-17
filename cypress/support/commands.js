Cypress.Commands.add('token', (email, senha) => { 
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
          "email": email,
          "password": senha
        }
      }).then(response => {
        return response.body.authorization
      })
 })

 Cypress.Commands.add('cadastrarProduto', (token, nome, preco, descricao, quantidade) => {
    cy.request({
      method: 'POST',
      url: 'produtos',
      headers: {authorization: token},
      body: {
          "nome": nome,
          "preco": preco,
          "descricao": descricao,
          "quantidade": quantidade
      }, 
      failOnStatusCode: false // para validar status code 4xx ou 5xx é necessario adicionar esse parametro
    })
 })
