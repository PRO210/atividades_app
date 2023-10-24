import P from 'prop-types';

import { AuthContext } from './context';
import { useEffect, useReducer, useRef, useState } from 'react';
import { reducer } from './reducer';
import { data } from './data';
import { validaToken } from './actions';

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, data);
  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);
  // const actions = useRef(buildActions(dispatch));


  useEffect(() => {
    const validateT = async () => {
      const storageData = localStorage.getItem('token');
      if (storageData) {
        const user = await validaToken();
        return signIn(user);
      }
    };
    validateT();
  }, []);

  const signIn = (user) => {
    setUser(user);
    setSigned(true);
    sessionStorage.setItem('user_id', user.uuid);
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('email', user.email);
  };

  const signOut = () => {
    setUser(null);
    setSigned(false);
    localStorage.clear();
    sessionStorage.clear();
  };

  const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  return (
    <AuthContext.Provider value={{ authState, authDispatch, user, signed, signIn, setToken, signOut }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: P.node.isRequired,
  signIn: P.func,
};
