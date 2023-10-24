import P from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import kakashi from '../../img/kakashi.jpg';
import { AuthContext } from '../../contexts/AuthProvider/context';
import NavBarUser from '../NavBarUser';
import NavBarOffUser from '../NavBarOffUser';

// https://flowbite.com/docs/components/sidebar/
// https://www.tutussfunny.com/laravel-9-react-complete-crud-application/

export default function NavBar({ handleMenu }) {
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  const obj = authContext.user;

  function isEmpty(obj) {
    // null é "empty"
    if (obj == null) return true;
    // Suponhamos que se tenha uma propriedade length com um valor diferente de zero
    // Essa proriedade será verdadeira
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    // Caso contrário ela tem todas as sua propriedades?
    // Isto não se manipula
    // toString e valueOf são erros de enumeração no IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  NavBar.propTypes = {
    handleMenu: P.func.isRequired,
  };

  const url = window.location.href;
  const urlArray = url.split('/');
  let urlProfile = urlArray.find((v) => v == 'profile');

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="my-auto sm:hidden">
              <div className="relative">
                <div className={urlProfile != 'profile' ? 'block' : 'hidden'}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen((prev) => !prev);
                      handleMenu();
                    }}
                    className="inline-flex items-center font-extrabold justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <svg
                      className={`${open == true ? 'block h-6 w-6' : 'hidden h-6 w-6'}`}
                      fill="none"
                      viewBox="0 0 20 20"
                      strokeLinecap="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <svg
                      className={`${open == false ? 'block h-6 w-6' : 'hidden h-6 w-6'}`}
                      fill="none"
                      viewBox="0 0 20 20"
                      strokeLinecap="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mx-auto">
            <div className="relative">
              <Link to="/" className={`cursor-pointer`}>
                {/* <h1 className="sloop text-white text-lg sm:text-4xl">Atividades Por Página</h1> */}
                <h1 className="font-sloop text-white text-2xl">Atividades Por Página</h1>
              </Link>
            </div>
          </div>
          {sessionStorage.getItem('name') == null ? <NavBarOffUser /> : <NavBarUser />}
        </div>
      </div>
    </nav>
  );
}
