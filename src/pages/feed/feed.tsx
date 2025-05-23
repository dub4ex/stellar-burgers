import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getFeedSelector
} from '../../services/slices/apiSlices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(getFeedSelector);

  //МБ НАДО ЭТО В АПП ДЕРЖАТЬ
  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  /**TODO подумать также об отрисовки ошибки если данные не придут а массив всё равно будет пустой */
  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
