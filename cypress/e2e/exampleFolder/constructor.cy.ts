import { selectors } from '../../support/commands';
const testBunId = '643d69a5c3f7b9001cfa093c';
const testIngId = '643d69a5c3f7b9001cfa0941';

beforeEach(() => {
  //мокируем все нужные запросы в бекенд
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', 'api/auth/token', { fixture: 'token.json' }).as(
    'refreshToken'
  );
  cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
    'postOrder'
  );
  cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  //устанавливаем  мок куки
  cy.setCookie('accessToken', 'fake-access-token');
  //проверка доступности приложения
  //устанавливаем мок токен перед загрузкой приложения
  cy.visit('http://localhost:4000', {
    onBeforeLoad(win) {
      win.localStorage.setItem('refreshToken', 'fake-refresh-token');
    }
  });
  //ждем загрузку ингредиентов
  cy.wait('@getIngredients');
});

afterEach(() => {
  //очистка токенов и куки
  cy.clearAllCookies();
  cy.clearLocalStorage();
});

describe('Тесты добавления ингредиентов', function () {
  it('добавление булки в конструктор', function () {
    cy.addItemToConstructor(testBunId);
  });

  it('добавление ингредиента в конструктор', function () {
    cy.addItemToConstructor(testIngId);
  });
  it('добавление и булки и ингредиента в конструктор', function () {
    cy.addItemToConstructor(testBunId);
    cy.addItemToConstructor(testIngId);
  });
});

describe('Тесты работы модального окна', function () {
  this.beforeEach(() => {
    cy.get(selectors.modal).should('not.be.visible');
  });
  it('тест открытия модального окна', function () {
    cy.openModalByItemId(testBunId);
    cy.get(selectors.modal)
      .find(`[data-cy="detail-${testBunId}"]`)
      .should('be.visible');
  });
  it('тест закрытия модального окна на крестик', function () {
    cy.openModalByItemId(testBunId);
    cy.closeModalByButton();
  });
  it('тест закрытия модального окна по оверлею', function () {
    cy.openModalByItemId(testBunId);
    cy.closeModalByOverlay();
  });
});

describe('Тесты создания заказа', function () {
  it('общий тест тест создания заказа', function () {
    //ждём загрузку информации о пользователе
    cy.wait('@getUser');
    //проверка что конструктор пустой
    cy.checkConstructorEmpty();
    //заполнение конструктора
    cy.addItemToConstructor(testBunId);
    cy.addItemToConstructor(testIngId);
    //проверка что в конструкторе есть элементы
    cy.checkConstructorNotEmpty();
    //заказ
    cy.get(`[data-cy="order-button-container"]`).find('button').click();
    cy.wait('@postOrder');
    cy.get(selectors.modal)
      .find(`[data-cy="orderNumber"]`)
      .should('have.text', '81062');
    //закрытие окна
    cy.closeModalByButton();
    //проверка что конструктор пустой после заказа
    cy.checkConstructorEmpty();
  });
});
