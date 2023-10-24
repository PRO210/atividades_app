import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/context';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SvgEmail from '../../components/Svgs/Email';
import Spinner from '../../components/Spinner';

import { forgotPassword, loadingStop } from '../../contexts/AuthProvider/actions';

export const RecoveryPassword = () => {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um email válido!').required('O email é obrigatório'),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { errors, isSubmitting } = formState;
  const [sendEmail, setSendEmail] = useState(false);

  const msgSendEmail = (status) => {
    if (status == 200) {
      setSendEmail(true);
      const timer = setTimeout(() => {
        setSendEmail(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  };

  const onSubmit = async (data) => {
    await toast.promise(forgotPassword(authDispatch, data), {
      pending: {
        render: () => {
          return 'Atualizando  . . . ';
        },
      },
      success: {
        render: (res) => {
          const status = res.data.data.status;
          msgSendEmail(status);
          return res.data.data.message;
        },
      },
      error: {
        render: (res) => {
          setSendEmail(false);
          // return res.data.message;
          loadingStop(authDispatch);
          return 'Ops! Algo deu errado com o servidor. Por favor tente outra hora.';
        },
      },
    });
  };

  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow-md rounded  pb-8 mb-4 flex flex-col ">
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-3/4 flex flex-col">
              <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <div className="flex justify-center pt-12 ">
                </div>
                <p className="text-justify  text-base sm:text-2xl">
                  Esqueceu sua senha? Sem problemas. Apenas informe seu endereço de e-mail que enviaremos um link que permitirá definir uma
                  nova senha.
                </p>

                <div className="p-2"></div>

                {errors.name ? <span className="text-red-600 ml-1">{errors.name.message}</span> : null}
                <div className="p-2"></div>

                <label className="font-semibold ml-1">Email</label>
                <div className="flex text-lg">
                  <SvgEmail />
                  <input {...register('email')} className={`pro-input pl-11 py-2`} placeholder="Email" />
                </div>
                {errors.email ? <span className="text-red-600 ml-1">{errors.email.message}</span> : null}

                <div className="flex items-center justify-end mt-4">
                  <button type="submit" disabled={authState.loading} className="ml-1 pro-button-Success text-base" id="bt_success">
                    {authState.loading ? <Spinner msgSpinner={'Enviando . . .'} /> : 'Redefinir Senha por Email '}
                  </button>
                </div>
                {sendEmail ? (
                  <span className="text-red-600 m-2">O email pode demorar um pouco devido aos servidores então aguarde alguns minutos</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecoveryPassword;
