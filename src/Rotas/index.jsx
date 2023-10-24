import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthProvider/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import RecoveryPassword from '../pages/RecoveryPassword';
import ResetPassword from '../pages/ResetPassword';
import NotFound from '../pages/NotFound';

const Rotas = () => {
  const { signed } = useContext(AuthContext);

  console.log('signed -- ' + signed);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {signed ? <Route path="/user/profile" element={<Profile />} /> : <Route path="*" element={<NotFound />} />}

        <Route path="/forgot-password-create" element={<RecoveryPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
