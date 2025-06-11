const testURL = 'https://norma.nomoreparties.space/api';
const testBunId = '643d69a5c3f7b9001cfa093c';
const testIngId = '643d69a5c3f7b9001cfa0941';
/* describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000'); 
    });
}); */

beforeEach(() => {
  cy.intercept('GET', `${testURL}/ingredients`, {
    fixture: 'ingredients.json'
  }).as('getIngredients');
  cy.visit('http://localhost:4000');
  cy.wait('@getIngredients');
});
describe('Тесты добавления ингредиентов', function () {
  it('добавление булки в конструктор', function () {
    cy.get(`[data-cy="item-${testBunId}"]`).as('bun');
    cy.get('@bun').find('button').click();
  });

  it('добавление ингредиента в конструктор', function () {
    cy.get(`[data-cy="item-${testIngId}"]`).as('ingredient');
    cy.get('@ingredient').find('button').click();
  });
  it('добавление и булки и ингредиента в конструктор', function () {
    cy.get(`[data-cy="item-${testBunId}"]`).as('bun');
    cy.get(`[data-cy="item-${testIngId}"]`).as('ingredient');
    cy.get('@bun').find('button').click();
    cy.get('@ingredient').find('button').click();
  });
});

describe('Тесты работы модального окна', function () {
    this.beforeEach(() => {
        cy.get('#modals').as('modal');
        cy.get('@modal').should('not.be.visible');
    });
  it('тест открытия модального окна', function () {
    cy.get(`[data-cy="item-${testBunId}"]`).click();
    cy.get('@modal').should('exist').and('not.be.empty');
    cy.get('@modal').find(`[data-cy="detail-${testBunId}"]`);
  });
    it('тест закрытия модального окна по кнопке', function () {
    cy.get(`[data-cy="item-${testBunId}"]`).click();
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });
      it('тест закрытия модального окна по оверлею', function () {
    cy.get(`[data-cy="item-${testBunId}"]`).click();
    cy.get('@modal').find(`[data-cy="overlay"]`).click({ force: true }); // force, чтобы клик прошел даже если overlay перекрыт
    cy.get('@modal').should('be.empty');
  });
});

/*
describe('проверяем кнопку лайка на первом треке', () => {
    it('текст в кнопке лайка при нажатии должен смениться на дизлайк', () => {
        cy.visit('http://localhost:5173');
        // находим в DOM дереве кнопку с атрибутом data-cy=1
        const button = cy.get(`[data-cy=${1}]`);
        
        // проверяем что в ней есть текст лайк
        button.contains('лайк');
        // кликаем на кнопку
        button.click();
        // проверяем что текст сменился на дизлайк
        button.contains('дизлайк');
    });
}); 
*/
