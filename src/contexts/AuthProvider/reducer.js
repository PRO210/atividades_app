import * as types from './types';

export const reducer = (state, action) => {

  switch (action.type) {
    case types.AUTHREGISTER: {
      return { ...state, loading: false };
    }

    case types.AUTHLOGIN: {
      return {
        ...state,
        token: action.payload.data.token,
        loading: false,
        // message: action.payload.data.message,
        status: action.payload.status,
        user: action.payload.data.user,
      };
    }

    case types.AUTHPROFILEUP: {
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
        status: action.payload.status,
      };
    }

    case types.AUTHDELETE: {
      return { ...state };
    }

    case types.LOADING: {
      return { ...state, loading: true };
    }

    case types.LOADINGSTOP: {
      return { ...state, loading: false };
    }

    case types.ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.response.data.message,
        status: action.payload.response.status,
      };
    }

    case types.AUTHLOGOUT: {
      return {
        ...state,
        loading: false,
        message: 'Deslogado com Sucesso!',
        status: action.payload.status,
        user: '',
      };
    }
  }
  console.log('Não encontrei a action', action.type);

  return { ...state };
};
