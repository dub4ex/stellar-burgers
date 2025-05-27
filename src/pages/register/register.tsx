import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  authenticatedSelector,
  clearError,
  errorSelector,
  registerUser
} from '../../services/slices/apiSlices/userSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(errorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: email,
        name: userName,
        password: password
      })
    );
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <RegisterUI
      errorText={errorText || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
