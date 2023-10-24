import { useContext, useEffect, useState } from 'react';
import './index.css';
import { AuthContext } from '../../contexts/AuthProvider/context';
import ArrowDown from '../Svgs/ArrowDown';
import ArrowUp from '../Svgs/ArrowUp';
import { loadingStop, logoutAuth } from '../../contexts/AuthProvider/actions';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NavBarUser() {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;

  const [openDropDownUser, setOpenDropDownUser] = useState(false);

  const navigate = useNavigate();

  const handleDropDownUser = () => {
    setOpenDropDownUser(false);
    //location.reload();
    return navigate('/');
  };
  const data = {
    email: sessionStorage.getItem('email'),
    uuid: sessionStorage.getItem('user_id'),
  };

  const logout = async (authDispatch, data) => {
    await toast.promise(logoutAuth(authDispatch, data), {
      pending: {
        render: () => {
          return 'Aguarde por favor :) . . . ';
        },
        position: 'top-center',
      },
      success: {
        render: () => {
          const signOut = authContext.signOut();
          handleDropDownUser();
          return 'Deslogado com Sucesso!';
        },
      },
      error: {
        render: (res) => {
          loadingStop(authDispatch);
          return res.data.response.data.message;
        },
      },
    });
  };
  const link = `block w-full font-bold px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out`;

  function primeiroNome(str) {
    var arr = str.split(' ');
    //var keep = arr[1][0];
    // return arr.slice(0, keep ? 3 : 2).join(' ');
    return arr.length == 1 ? str : arr[0];
  }

  return (
    <div className="hidden sm:flex items-center ">
      <div className="inline-block relative">
        <button
          type="button"
          onClick={() => setOpenDropDownUser((prev) => !prev)}
          className="bg-gray-300 text-gray-700 font-semibold py-2 rounded inline-flex items-center pl-2"
        >
          <span className="mr-1 pr-1 font-extrabold ">{primeiroNome(sessionStorage.getItem('name'))}</span>

          {openDropDownUser ? <ArrowUp /> : <ArrowDown />}
        </button>

        <div className={`${openDropDownUser ? 'absolute z-50 mt-2 w-48 rounded-md origin-top-right right-0' : 'hidden'}`}>
          <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white dark:bg-gray-700">
            <a className={link}>
              <p>{sessionStorage.getItem('email')}</p>
            </a>
            <hr />
            <Link to="/user/profile" className={`${link} cursor-pointer`}>
              Perfil
            </Link>
            <button
              onClick={() => logout(authDispatch, data)}
              className={`${link} `}
              style={{ textAlign: 'center', fontSize: '18px' }}
              type="button"
              disabled={authState.loading}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
