describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a first user to backend
    const user = { name: 'Matti Luukkainen',username: 'mluukkai',password: 'salainen' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    // create here a second user to backend
    const user2 = { name: 'Howard Stark',username: 'howard',password: 'stark' }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.get('#show-button').click()
      cy.get('#title').type('The Blog Title')
      cy.get('#author').type('The Blog Author')
      cy.get('#url').type('The Blog URL')
      cy.get('#create-button').click()

      cy.contains('The Blog Title')
      cy.contains('The Blog Author')

      cy.get('#show-details-button').click()
      cy.contains('The Blog URL')
    })

    it('A user can like a blog',function(){
      cy.get('#show-button').click()
      cy.get('#title').type('The Blog Title')
      cy.get('#author').type('The Blog Author')
      cy.get('#url').type('The Blog URL')
      cy.get('#create-button').click()
      cy.get('#show-details-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('A user can delete own blogs but not blogs belonging to other users',function(){
    // Check that current user can delete own blog
      cy.get('#show-button').click()
      cy.get('#title').type('The Blog Title')
      cy.get('#author').type('The Blog Author')
      cy.get('#url').type('The Blog URL')
      cy.get('#create-button').click()
      cy.get('#show-details-button').click()
      cy.get('#remove-button').click()

      cy.get('html').should('not.contain', 'The Blog Title')

      // Also check that other users cannot delete the blog
      cy.get('#show-button').click()
      cy.get('#title').type('The Blog Title')
      cy.get('#author').type('The Blog Author')
      cy.get('#url').type('The Blog URL')
      cy.get('#create-button').click()
      cy.get('#logout-button').click()
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'howard', password: 'stark'
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
      cy.get('#show-details-button').click()
      cy.get('#remove-button').click()
      cy.get('.error').should('contain', 'Unauthorized user')
    })

    it('Blogs are ordered according to likes with the blog with the most likes being first',function(){
      // Create 3 blogs
      for(let idx=1;idx<4;idx++){
        cy.get('#show-button').click()
        cy.get('#title').type(`The Blog Title ${idx}`)
        cy.get('#author').type('The Blog Author')
        cy.get('#url').type(`The Blog URL ${idx}`)
        cy.get('#create-button').click()
      }
      // Give them 1,2,3 likes respectively
      for(let idx=1;idx<4;idx++){
        cy.contains(`The Blog Title ${idx}`).parent().find('#show-details-button').click()
        for(let x=1;x<idx+1;x++){
          cy.contains(`The Blog Title ${idx}`).parent().find('#like-button').click()
          cy.contains(`likes ${x}`)}
      }
      // Check that the order is ['The Blog Title 3','The Blog Title 2','The Blog Title 1']
      cy.get('.likes').eq(0).should('contain','likes 3')
      cy.get('.likes').eq(1).should('contain','likes 2')
      cy.get('.likes').eq(2).should('contain','likes 1')
    })
  })
})