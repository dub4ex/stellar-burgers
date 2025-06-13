/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
export const selectors = {
  modal: '#modals',
  item: (itemId: string) => `[data-cy="item-${itemId}"]`,
  emptyTop: `[data-cy="empty-top-bun"]`,
  emptyIng: `[data-cy="empty-ingredients"]`,
  emptyBottom: `[data-cy="empty-bottom-bun"]`
};

Cypress.Commands.add('addItemToConstructor', (itemId) => {
  cy.get(selectors.item(itemId)).find('button').click();
});
Cypress.Commands.add('openModalByItemId', (itemId) => {
  cy.get(selectors.item(itemId)).click();
  cy.get(selectors.modal).should('exist').and('not.be.empty');
});
Cypress.Commands.add('closeModalByButton', () => {
  cy.get(selectors.modal).as('modal');
  cy.get('@modal').find('button').click();
  cy.get('@modal').should('be.empty');
});
Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(selectors.modal).as('modal');
  cy.get('@modal').find(`[data-cy="overlay"]`).click({ force: true }); // force, чтобы клик прошел даже если overlay перекрыт
  cy.get('@modal').should('be.empty');
});
Cypress.Commands.add('checkConstructorEmpty', () => {
  cy.get(selectors.emptyTop).should('exist');
  cy.get(selectors.emptyIng).should('exist');
  cy.get(selectors.emptyBottom).should('exist');
});
Cypress.Commands.add('checkConstructorNotEmpty', () => {
  cy.get(selectors.emptyTop).should('not.exist');
  cy.get(selectors.emptyIng).should('not.exist');
  cy.get(selectors.emptyBottom).should('not.exist');
});
