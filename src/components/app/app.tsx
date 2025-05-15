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
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    {/* Возможно нужен будет аутлет, но я не уверен */}
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
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
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title='Example ПОМЕНЯТЬ'
            /* ПОМЕНЯТЬ ОНКЛОЗ */ onClose={() => {}}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
