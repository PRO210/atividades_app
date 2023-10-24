import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/context';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { loadingStop, logoutAuth } from '../../contexts/AuthProvider/actions';

const NavBarUserMobil = () => {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;
  const navigate = useNavigate();

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  const obj = authContext.user;

  function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  const handleDropDownUser = () => {
    return navigate('/');
  };

  const data = {
    email: sessionStorage.getItem('email'),
    uuid: sessionStorage.getItem('user_id'),
  };

  const handlelogout = async (authDispatch, data) => {
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

  function primeiroNome(str) {
    var arr = str.split(' ');
    //var keep = arr[1][0];
    // return arr.slice(0, keep ? 3 : 2).join(' ');
    return arr.length == 1 ? str : arr[0];
  }

  const url = window.location.href;
  const urlArray = url.split('/');
  let urlProfile = urlArray.find((v) => v == 'profile');

  //PArei aqui//PArei aqui//PArei aqui
  // useEffect(() => {
  //   isEmpty(obj) ? navigate('/') : null;

  // }, [authContext.user]);

  return (
    <div className="sm:hidden">
      <div className="flex justify-center gap-3 m-3">
        <div className="ml-3 font-bold">
          <p> Olá, {primeiroNome(sessionStorage.getItem('name'))} </p>
        </div>
        <button type="button" className={`${urlProfile != 'profile' ? 'pro-button-Primary' : 'hidden'}`}>
          <Link to="/user/profile" className={` cursor-pointer`}>
            Perfil
          </Link>
        </button>
        <button
          onClick={() => handlelogout(authDispatch, data)}
          className={`pro-button-Danger `}
          type="button"
          disabled={authState.loading}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default NavBarUserMobil;
