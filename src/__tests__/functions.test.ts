import { getErrorMessage } from '../utils/functions';

describe('тесты вспомогательных функций', () => {
  describe('тесты getErrorMessage', () => {
    const text = 'тестовый текст ошибки';
    test('тест с валидным значением', () => {
      expect(getErrorMessage(text)).toBe(text);
    });
    test('тест с аргументом undefined', () => {
      expect(getErrorMessage(undefined)).toBe('неизвестная ошибка');
    });
  });
});
