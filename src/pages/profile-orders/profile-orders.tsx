import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getOrders,
  getOrdersList,
  orderListSelector
} from '../../services/slices/apiSlices/ordersListSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const { loading, error } = useSelector(orderListSelector);

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <p className='error'>Запрос завершился с ошибкой: {error}</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
