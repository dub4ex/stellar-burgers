import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  deleteOrder,
  getConstructorItems,
  getLoadingSelector,
  getOrderSelector,
  orderBurger
} from '../../services/slices/apiSlices/constructorSlice';
import { authenticatedSelector } from '../../services/slices/apiSlices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getLoadingSelector);
  const orderModalData = useSelector(getOrderSelector);
  const dispatch = useDispatch();
  const isAuth = useSelector(authenticatedSelector);
  const location = useLocation();
  const navigate = useNavigate();

  const onOrderClick = () => {
    //нельзя делать заказ без булок
    if (!constructorItems.bun || orderRequest) return;
    //проверка пользователя только после того как заказ будет не пустым
    if (!isAuth) {
      return navigate('/login', { state: { from: location } });
    }
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(deleteOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
