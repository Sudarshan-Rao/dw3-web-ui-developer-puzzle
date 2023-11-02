describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('should mark a book as finished', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[aria-label="Add Eloquent JavaScript to reading list"]').click();

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item')
      .contains('Eloquent JavaScript')
      .get('[aria-label="Finish Eloquent JavaScript"]')
      .should('be.enabled')
      .click();
    cy.get('.reading-list-item')
      .contains('Eloquent JavaScript')
      .get('[aria-label="Eloquent JavaScript finished"]')
      .should('be.disabled');
    cy.get('.reading-list-item')
      .should('contain', 'Eloquent JavaScript')
      .should('contain', 'Finished on');
    cy.get('button[aria-label="Close reading list"]').click();

    cy.get('[data-testing="book-item"]')
      .contains('Eloquent JavaScript')
      .get('[aria-label="Finished Eloquent JavaScript"]')
      .should('be.disabled');

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item')
      .contains('Eloquent JavaScript')
      .get('[aria-label="Remove Eloquent JavaScript from reading list"]')
      .click();
  });
});
