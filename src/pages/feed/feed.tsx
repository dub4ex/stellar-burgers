import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getFeedSelector
} from '../../services/slices/apiSlices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(getFeedSelector);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <p className='error'>Запрос завершился с ошибкой: {error}</p>;
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
