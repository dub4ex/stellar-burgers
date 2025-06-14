import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/apiSlices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  getOrderByNumberSelector
} from '../../services/slices/apiSlices/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getIngredientsSelector);
  const orderData = useSelector(getOrderByNumberSelector);
  const { number } = useParams();
  const orderNumber = +number!;

  useEffect(() => {
    //можно добавить взятие заказа из стора, чтобы уменьшить количество запросов на сервер
    dispatch(getOrderByNumber(orderNumber));
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
