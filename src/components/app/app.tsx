import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/apiSlices/ingredientsSlice';
import { PrivateRoute } from '../private-route';
import {
  authenticatedSelector,
  checkUserAuth,
  getUser,
  getUserData
} from '../../services/slices/apiSlices/userSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state && location.state.background;
  const match = location.pathname.match(/\/([^\/]+)$/);
  const endpoint = match && /^\d+$/.test(match[1]) ? match[1] : '';

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  const onClose = () => {
    navigate(background || '/');
  };

  return (
    <div className={styles.app}>
      {/* Возможно нужен будет аутлет, но я не уверен */}
      <AppHeader />
      <Routes location={background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        {/* Посмотреть как передаются данные в ордеринфо */}
        <Route path='/feed/:number' element={<OrderInfo />} />
        {/* проверить как заходит с аутентификацией и без */}
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* проверить как заходит с аутентификацией и без */}
        <Route
          path='/login'
          element={
            <PrivateRoute onlyUnAuth>
              <Login />
            </PrivateRoute>
          }
        />
        {/* проверить как заходит с аутентификацией и без */}
        <Route
          path='/register'
          element={
            <PrivateRoute onlyUnAuth>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PrivateRoute onlyUnAuth>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PrivateRoute onlyUnAuth>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        {/* 




 */}{' '}
        {/* ВЫШЕ СДЕЛАННЫЕ РОУТЫ, НИЖЕ НУЖНО ПРОВЕРЯТЬ */}
        {/* 




 */}{' '}
        {/* это вложенный маршрут */}
        {/* должен быть защищенным */}
        <Route path='/profile/orders'>
          <Route index element={<ProfileOrders />} />
          {/* должен быть защищенным */}
          <Route
            path=':number'
            element={
              <Modal
                title='Example ПОМЕНЯТЬ'
                /* ПОМЕНЯТЬ ОНКЛОЗ */ onClose={() => {}}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
      </Routes>
      {/* 





 */}
      {/* ТУТ ПИСАТЬ МАРШРУТЫ С МОДАЛЬНЫМИ ОКНАМИ */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              /* ПОМЕНЯТЬ ЦИФРЫ В МОДАЛКЕ И ДОБАВИТЬ ИХ В ОРДЕРИНФО, смотри QnA */
              <Modal title={`#${endpoint.padStart(6, '0')}`} onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
