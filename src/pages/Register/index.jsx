import { Link, useNavigate } from 'react-router-dom';
import login from '../../img/responsive-login-form-page-built-with-tailwind-css.png';
import logo from '../../img/app.jpg';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SvgCadeado from '../../components/Svgs/Cadeado';
import SvgEmail from '../../components/Svgs/Email';
import Spinner from '../../components/Spinner';
import SvgPerson from '../../components/Svgs/Person';
import { toast } from 'react-toastify';
import { authRegister, loadingStop } from '../../contexts/AuthProvider/actions';
import { AuthContext } from '../../contexts/AuthProvider/context';
import { useContext } from 'react';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!').min(3, 'O nome deve ter mais de três caracteres!'),
  email: Yup.string().email('Digite um email válido!').required('O email é obrigatório'),
  password: Yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres').required('A senha é obrigatoria!'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais !'),
});

const Register = () => {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await toast.promise(authRegister(authDispatch, data), {
      pending: {
        render: () => {
          return 'Registrando  . . . ';
        },
      },
      success: {
        render: (res) => {
          const data = res.data.data;
          const isLogged = authContext.signIn(data.user);
          const persistLogged = authContext.setToken(data.token);
          navigate('/');
          // return res.data.data.message;
          return ' Seja bem vind(a)! ' + res.data.data.user.name;
        },
        position: 'top-center',
      },
      error: {
        render: (res) => {
          setTimeout(() => loadingStop(authDispatch), 5000);
          return res.data.response.data.message;
        },
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex items-center justify-center">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <div className="flex justify-center pt-12 ">
              <img src={logo} className="w-20 h-20 fill-current text-gray-500" alt="FlowBite Logo" />
            </div>
            <p className="text-center text-3xl">Registre-se</p>

            <div className="p-3"></div>

            <label className="font-semibold ml-1">Nome</label>
            <div className="flex text-lg">
              <SvgPerson />
              <input {...register('name')} className={`pro-input pl-11 py-2`} placeholder="Nome" autoFocus />
            </div>
            {errors.name ? <span className="text-red-600 ml-1">{errors.name.message}</span> : null}

            <div className="p-3"></div>
            <label className="font-semibold ml-1">Email</label>
            <div className="flex text-lg">
              <SvgEmail />
              <input {...register('email')} className={`pro-input pl-11 py-2`} placeholder="Email" />
            </div>
            {errors.email ? <span className="text-red-600 ml-1">{errors.email.message}</span> : null}

            <div className="p-3"></div>

            <label className="w-full font-semibold ml-1">Senha</label>
            <div className="flex text-lg">
              <SvgCadeado />
              <input {...register('password')} type="password" className={`pro-input pl-10 py-2`} placeholder="Password" />
            </div>
            {errors.password ? <span className="text-red-600 ml-1">{errors.password.message}</span> : null}

            <div className="p-3"></div>
            <label className="w-full font-semibold ml-1">Confirme a Senha</label>
            <div className="flex text-lg">
              <SvgCadeado />
              <input
                {...register('password_confirmation')}
                type="password"
                className={`pro-input pl-10 py-2`}
                placeholder="Confirm Password"
              />
            </div>
            {errors.password_confirmation ? <span className="text-red-600 ml-1">{errors.confirmPassword.message}</span> : null}

            <div className="flex items-center justify-end mt-4">
              <Link to="/recovery-password" className="mx-1 transition-all duration-500 ease-in-out hover:font-semibold hover:scale-110">
                Esqueceu sua senha?
              </Link>
              <button type="submit" disabled={authState.loading} className="ml-1 pro-button-Success text-lg" id="bt_success">
                {authState.loading ? (
                  <>
                    <Spinner msgSpinner={'Enviando . . .'} />
                  </>
                ) : (
                  'Enviar'
                )}
              </button>
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

export default Register;
