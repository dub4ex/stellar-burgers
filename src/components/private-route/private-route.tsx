import { FC } from 'react';

import { TPrivateRouteProps } from './type';
import { useSelector } from '../../services/store';
import {
  authenticatedSelector,
  isAuthCheckedSelector,
  userSelector
} from '../../services/slices/apiSlices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export const PrivateRoute: FC<TPrivateRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
    return <Navigate to='/login' replace state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user) {
    //  если маршрут для неавторизованного пользователя, но пользователь авторизован
    // при обратном редиректе  получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть , если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу

    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return <>{children}</>;
};
