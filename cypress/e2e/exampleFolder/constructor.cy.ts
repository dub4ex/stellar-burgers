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
    cy.get('@modal')
      .find(`[data-cy="detail-${testBunId}"]`)
      .should('be.visible');
  });
  it('тест закрытия модального окна на крестик', function () {
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

describe('Тесты создания заказа', function () {
  it('общий тест тест создания заказа', function () {
    //ждём загрузку информации о пользователе
    cy.wait('@getUser');
    //проверка что конструктор пустой
    cy.get(`[data-cy="empty-top-bun"]`).as('empty-top-bun').should('exist');
    cy.get(`[data-cy="empty-ingredients"]`)
      .as('empty-ingredients')
      .should('exist');
    cy.get(`[data-cy="empty-bottom-bun"]`)
      .as('empty-bottom-bun')
      .should('exist');
    //заполнение конструктора
    cy.get(`[data-cy="item-${testBunId}"]`).as('bun');
    cy.get(`[data-cy="item-${testIngId}"]`).as('ingredient');
    cy.get('@bun').find('button').click();
    cy.get('@ingredient').find('button').click();
    //проверка что в конструкторе есть элементы
    cy.get('@empty-top-bun').should('not.exist');
    cy.get('@empty-ingredients').should('not.exist');
    cy.get('@empty-bottom-bun').should('not.exist');
    //заказ
    cy.get(`[data-cy="order-button-container"]`).find('button').click();
    cy.wait('@postOrder');
    cy.get('#modals').as('modal');
    cy.get('@modal')
      .find(`[data-cy="orderNumber"]`)
      .should('have.text', '81062');
    //закрытие окна
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
    //проверка что конструктор пустой после заказа
    cy.get('@empty-top-bun').should('exist');
    cy.get('@empty-ingredients').should('exist');
    cy.get('@empty-bottom-bun').should('exist');
  });
});
