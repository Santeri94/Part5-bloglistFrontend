describe('Blog app', function() {
  beforeEach(function() {
   cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Santeri Pulkkinen',
      username: 'spulkkinen',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

describe('Login',function() {
  it('succeed with correct credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('spulkkinen')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Santeri Pulkkinen logged in')
})
  it('it fails with wrong credentials', function() {
  cy.contains('login').click()
  cy.get('#username').type('spulkkinen')
  cy.get('#password').type('eisalainen')
  cy.get('#login-button').click()
  cy.get('.error')
  .should('contain', 'wrong credentials')
})

})

describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'spulkkinen', password: 'salainen' })
  })

  it('a new blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('Santeri Pulkkinen')
    cy.get('#url').type('www.test.fi')
    cy.contains('save').click()
    cy.contains('a blog created by cypress')
  })


  it('blog can be liked', function () {
      cy.createBlog({ title: 'first blog', author: 'Santeri', url: 'TestiUrl' })
      cy.contains('like').click()
      cy.get('.error')
      .should('contain', 'You liked first blog')
    })

  it('blog can be deleted', function () {
      cy.createBlog({ title: 'first blog', author: 'Santeri', url: 'TestiUrl' })
      cy.contains('delete').click()
      cy.on('windows:confirm', () => true)
      cy.get('.error')
      .should('contain', 'Blog has been deleted')
    })

})
})
