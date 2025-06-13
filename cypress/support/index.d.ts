declare namespace Cypress {
  interface Chainable<Subject = any> {
    addItemToConstructor(itemId: string): Chainable<void>;
    openModalByItemId(itemId: string): Chainable<void>;
    closeModalByButton(): Chainable<void>;
    closeModalByOverlay(): Chainable<void>;
    checkConstructorEmpty(): Chainable<void>;
    checkConstructorNotEmpty(): Chainable<void>;
  }
}
