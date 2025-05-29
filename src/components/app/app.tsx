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
import { PrivateRoute } from '../private-route';
import { checkUserAuth } from '../../services/slices/apiSlices/userSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  const onClose = () => {
    navigate(background || '/');
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <PrivateRoute>
              <ProfileOrders />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <PrivateRoute>
              <OrderInfo />
            </PrivateRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PrivateRoute onlyUnAuth>
              <Login />
            </PrivateRoute>
          }
        />
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
      </Routes>

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
              <Modal title='' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <PrivateRoute>
                <Modal title='' onClose={onClose}>
                  <OrderInfo />
                </Modal>
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
