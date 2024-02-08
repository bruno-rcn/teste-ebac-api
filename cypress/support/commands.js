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
