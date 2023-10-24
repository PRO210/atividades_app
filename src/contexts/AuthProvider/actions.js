import api from '../../services/api';
import * as types from './types';

export const authRegister = async (dispatch, payload) => {
  dispatch({ type: types.LOADING });

  const authRegister = await api.post('register', payload);

  dispatch({ type: types.AUTHREGISTER, payload: authRegister });

  return authRegister;
};

export const loadAuthLogin = async (dispatch, payload) => {
  dispatch({ type: types.LOADING });
  const loadAuthLogin = await api.post('login', payload);
  return loadAuthLogin;
};

export const loadAuthUp = async (dispatch, payload) => {
  dispatch({ type: types.LOADING });
  const loadAuthUp = await api.patch('user/profile/update', payload);
  dispatch({ type: types.AUTHPROFILEUP, payload: loadAuthUp });
  return loadAuthUp;
};

export const loadAuthPassword = async (payload) => {
  const loadAuthPassword = await api.post('user/profile/update-password', payload);
  return loadAuthPassword;
};

export const logoutAuth = async (dispatch, payload) => {
  dispatch({ type: types.LOADING });

  const token = localStorage.getItem('token');

  const logoutAuth = await api.post('logout', payload, {
    headers: {
      Authorization: `Bearer ${token}, "Content-type": "application/json"}`,
    },
  });
  dispatch({ type: types.LOADINGSTOP });

  return logoutAuth;
};

export const loadDel = async (dispatch) => {
  const uuid = sessionStorage.getItem('user_id');

  const loadDel = await api.delete('user/destroy/' + uuid);

  dispatch({ type: types.AUTHDELETE });

  return loadDel;

};

export const validaToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const validaToken = await api.get('/user', {
    headers: {
      Authorization: `Bearer ${token}, "Content-type": "application/json"}`,
    },
  });
  return validaToken.data;
};

export const getUser = async () => {
  const uuid = sessionStorage.getItem('user_id');
  const getUser = await api.get('/user/profile/edit/' + uuid);
  return getUser;
};

export const forgotPassword = async (dispatch, payload) => {
  dispatch({ type: types.LOADING });

  const forgotPassword = await api.post('/forgot', payload);

  dispatch({ type: types.LOADINGSTOP });
  return forgotPassword;
};

export const resetPasswordCreate = async (dispatch, payload) => {
  dispatch({ type: types.LOADING });

  const resetPasswordCreate = await api.post('/reset', payload);

  dispatch({ type: types.LOADINGSTOP });

  return resetPasswordCreate;
};

export const LOADING = (dispatch) => {
  return dispatch({ type: types.LOADING });
};

export const loadingStop = (dispatch) => {
  return dispatch({ type: types.LOADINGSTOP });
};
