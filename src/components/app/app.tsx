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
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/apiSlices/ingredientsSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const background = location.state && location.state.background;
  const onClose = () => {
    navigate(background || '/');
  };

  return (
    <div className={styles.app}>
      {/* Возможно нужен будет аутлет, но я не уверен */}
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        {/* ВЫШЕ СДЕЛАННЫЕ РОУТЫ, НИЖЕ НУЖНО ПРОВЕРЯТЬ */}
        {/* 




 */}{' '}
        <Route path='/feed'>
          <Route index element={<Feed />} />
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
        {/* должен быть защищенным */}
        <Route path='/login' element={<Login />} />
        {/* должен быть защищенным */}
        <Route path='/register' element={<Register />} />
        {/* должен быть защищенным */}
        <Route path='/forgot-password' element={<ForgotPassword />} />
        {/* должен быть защищенным */}
        <Route path='/reset-password' element={<ResetPassword />} />
        {/* должен быть защищенным */}
        <Route path='/profile' element={<Profile />} />
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
        <Route path='*' element={<NotFound404 />} />
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
        </Routes>
      )}
    </div>
  );
};

export default App;
