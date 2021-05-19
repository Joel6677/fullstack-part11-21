describe('Redux-anecdotes', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Anecdotes')
    cy.contains('create new')
  })
      
  it('can add anecdote', function () {
    cy.get('#create-anecdote').type('testi')
    cy.get('#add-button').click()
    cy.contains('you created \'testi\'')
  })
})