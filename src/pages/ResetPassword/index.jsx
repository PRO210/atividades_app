import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/context';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SvgEmail from '../../components/Svgs/Email';
import Spinner from '../../components/Spinner';

import SvgCadeado from '../../components/Svgs/Cadeado';
import { resetPasswordCreate } from '../../contexts/AuthProvider/actions';
import { useNavigate, useParams } from 'react-router-dom';

export const ResetPassword = () => {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;

  const navigate = useNavigate();

  const { token } = useParams();

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um email válido!').required('O email é obrigatório'),
    password: Yup.string().min(8, 'A senha precisa ter pelo menos 8 caracteres').required('A senha é obrigatoria!'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais !'),
    token: Yup.string().required('O email é obrigatório'),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
      token: token,
    },
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    toast.promise(resetPasswordCreate(authDispatch, data), {
      pending: {
        render: () => {
          return 'Atualizando  . . . ';
        },
      },
      success: {
        render: (res) => {
          navigate('/login');
          return res.data.data.message;
        },
      },
      error: {
        render: (res) => {
          // console.log(res.data.message);
          // console.log(res.data.response.status);
          if (res.data.response.status == 422) {
            return 'Os campos de senha não conferem!';
          }
          if (res.data.response.status == 500) {
            return 'Esse Token já não é mais valido!';
          }
          return res.data.response.status;
        },
      },
    });
  };

  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('token')} />
        <div className="shadow-md rounded px-4 pt-4 pb-8 mb-4 flex flex-col m-4 min-h-screen">
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-3/4 flex flex-col">
              <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p className="text-center text-2xl">Preecha os compos para redefinir a sua senha!</p>

                <div className="p-2"></div>

                {errors.name ? <span className="text-red-600 ml-1">{errors.name.message}</span> : null}
                <div className="p-2"></div>

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
                  <input {...register('password_confirmation')} type="password" className={`pro-input pl-10 py-2`} placeholder="Confirm Password" />
                </div>
                {errors.password_confirmation ? <span className="text-red-600 ml-1">{errors.password_confirmation.message}</span> : null}

                <div className="flex items-center justify-end mt-4">
                  <button type="submit" disabled={authState.loading} className="ml-1 pro-button-Success text-lg" id="bt_success">
                    {authState.loading ? <Spinner msgSpinner={'Enviando . . .'} /> : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
