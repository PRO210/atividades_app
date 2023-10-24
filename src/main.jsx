import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './contexts/AuthProvider';
import { ToastContainer } from 'react-toastify';

import Rotas from './Rotas';

// https://dev.to/rafacdomin/autenticacao-no-react-com-context-api-e-hooks-4bia

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/forgot-password-create" element={<RecoveryPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter> */}
      <Rotas />
    </AuthProvider>
  </React.StrictMode>,
);
