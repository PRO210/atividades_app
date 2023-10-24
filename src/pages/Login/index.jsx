import { Link, useNavigate } from 'react-router-dom';
import login from '../../img/responsive-login-form-page-built-with-tailwind-css.png';
import logo from '../../img/app.jpg';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SvgCadeado from '../../components/Svgs/Cadeado';
import SvgEmail from '../../components/Svgs/Email';
import Spinner from '../../components/Spinner';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/context';
import { loadAuthLogin, loadingStop } from '../../contexts/AuthProvider/actions';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  email: Yup.string().email('Digite um email válido!').required('O email é obrigatório'),
  password: Yup.string().min(6, 'A senha precisa ter pelo menos 8 caracteres').required(' A senha é obrigatoria!'),
});

const Login = () => {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await toast.promise(loadAuthLogin(authDispatch, data), {
      pending: {
        render: () => {
          // return 'Aguarde por favor :) . . . ';
        },
        position: 'top-center',
      },
      success: {
        render: (res) => {
          const data = res.data.data;
          const isLogged = authContext.signIn(data.user);
          const persistLogged = authContext.setToken(data.token);
          loadingStop(authDispatch);
          navigate('/');
          return 'Seja Bem Vindo de Volta!';
        },
      },
      error: {
        render: (res) => {
          localStorage.clear();
          loadingStop(authDispatch);
          return res.data.response.data.message;
        },
      },
    });
  };

  const link = `ml-4 font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex items-center justify-center">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto md:pt-0 px-8 md:px-24 lg:px-32">
            <div className="flex justify-center pt-12 ">
              <img src={logo} className="w-36 h-36 fill-current text-gray-500" alt="Atividades por Página" />
            </div>
            <p className="text-center text-3xl">Login</p>

            <div className="p-3"></div>

            <label className="font-semibold ml-1">Email</label>
            <div className="flex text-lg">
              <SvgEmail />
              <input {...register('email')} className={`pro-input pl-11 py-2`} placeholder="Email" autoFocus />
            </div>
            {errors.email ? <span className="text-red-600 ml-1">{errors.email.message}</span> : null}

            <div className="p-3"></div>

            <label className="w-full font-semibold ml-1">Senha</label>
            <div className="flex text-lg">
              <SvgCadeado />
              <input {...register('password')} type="password" className={`pro-input pl-10 py-2`} placeholder="Password" />
            </div>
            {errors.password ? <span className="text-red-600 ml-1">{errors.password.message}</span> : null}

            <div className="flex items-center justify-end mt-4">
              <Link
                to="/forgot-password-create"
                className="mx-1 transition-all duration-500 ease-in-out hover:font-semibold hover:scale-110"
              >
                Esqueceu sua senha?
              </Link>
              <button type="submit" disabled={authState.loading} className="ml-1 pro-button-Success text-lg" id="bt_success">
                {authState.loading ? <Spinner msgSpinner={'Enviando . . .'} /> : 'Entrar'}
              </button>
            </div>
            {authState.status != 200 ? <span className="text-red-600 ml-1">{authState.message}</span> : null}

            <div className="flex items-center justify-end mt-4">
              <div className="ml-10 transition-all duration-500 ease-in-out hover:font-semibold hover:scale-110">Não é Registrado?</div>
              <div className="ml-4">
                <button type="button " className="w-32 pro-button-Primary">
                  <Link className="" to={'/register'}>
                    Registre-se
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl hidden md:block">
          <img className="object-cover w-full h-screen " src={login} />
        </div>
      </div>
    </form>
  );
};

export default Login;
