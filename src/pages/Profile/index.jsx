import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/context';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SvgCadeado from '../../components/Svgs/Cadeado';
import SvgEmail from '../../components/Svgs/Email';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

import SvgPerson from '../../components/Svgs/Person';
import { loadAuthPassword, loadAuthUp, loadDel } from '../../contexts/AuthProvider/actions';

import NavBar from '../../components/NavBar';
import NavBarUserMobil from '../../components/NavBarUserMobil';
import Footer from '../../components/Footer';

export const Profile = () => {
  const authContext = useContext(AuthContext);
  const { authState, authDispatch } = authContext;

  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um email válido!').required('O email é obrigatório'),
    name: Yup.string().min(3, 'O nome  precisa ter pelo menos 3 caracteres').required('O nome é obrigatorio!'),
    // password: Yup.string()
    //   .min(8, 'A senha precisa ter pelo menos 8 caracteres')
    //   .required('A senha é obrigatoria!'),
    // password_confirmation: Yup.string().oneOf(
    //   [Yup.ref('password_confirmation'), null],
    //   'As senhas precisam ser iguais !',
    // ),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      uuid: sessionStorage.getItem('user_id'),
      name: sessionStorage.getItem('name'),
      email: sessionStorage.getItem('email'),
    },
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    toast.promise(loadAuthUp(authDispatch, data), {
      pending: {
        render: () => {
          return 'Atualizando  . . . ';
        },
      },
      success: {
        render: (res) => {
          const data = res.data.data;
          const isLogged = authContext.signIn(data.user);
          return data.message;
        },
      },
      error: {
        render: (res) => {
          return res.data.response.data.message;
        },
      },
    });
  };

  const [loadingDelete, setLoadingDelete] = useState(false);

  const loadingDel = () => {
    setLoadingDelete((prev) => !prev);
  };

  const authDelete = async () => {
    loadingDel();
    toast.promise(loadDel(authDispatch), {
      pending: {
        render: () => 'Deletando  . . . ',
      },
      success: {
        render: (res) => {
          navigate('/');
          localStorage.clear();
          sessionStorage.clear();
          loadingDel();
          return 'Seus registros foram apagados :)';
        },
      },
      error: {
        render: (res) => {
          loadingDel();
          return res.data.response.data.message;
        },
      },
    });
  };

  function confirmDel() {
    confirm('Tem certeza que deseja excluir sua conta?') ? authDelete() : null;
  }

  const [formValues, setFormValues] = useState({});
  const [loadingPassword, setLoadingPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChangeInput(value);
    setFormValues({ ...formValues, [name]: value });
    // const data = formValues[name] || {};
  };

  const buttonSubmitPassword = useRef(null);
  const [changeInput, setChangeInput] = useState('');

  const errorPassword = useRef({
    password: null,
    new_password: null,
    confirm_password: null,
  });

  const [errorMsg, setErrorMsg] = useState({});

  const valida = (formValues) => {
    for (var item in formValues) {
      if (item == 'password') {
        if (formValues[item].length <= 7) {
          errorPassword.current['password'] = 'O campo precisa ter pelo menos 8 caracteres! ';
          buttonSubmitPassword.current.disabled = true;
          setErrorMsg({ ...errorMsg, [item]: true });
        } else {
          errorPassword.current['password'] = '';
          buttonSubmitPassword.current.disabled = false;
          setErrorMsg({ ...errorMsg, [item]: false });
        }
      }
      if (item == 'new_password') {
        if (formValues[item].length <= 7) {
          errorPassword.current['new_password'] = 'O campo precisa ter pelo menos 8 caracteres! ';
          buttonSubmitPassword.current.disabled = true;
          setErrorMsg({ ...errorMsg, [item]: true });
        } else {
          errorPassword.current['new_password'] = '';
          buttonSubmitPassword.current.disabled = false;
          setErrorMsg({ ...errorMsg, [item]: false });
        }
      }
      if (item == 'confirm_password') {
        if (formValues[item].length <= 7) {
          errorPassword.current['confirm_password'] = 'O campo precisa ter pelo menos 8 caracteres! ';
          buttonSubmitPassword.current.disabled = true;
          setErrorMsg({ ...errorMsg, [item]: true });
        } else {
          errorPassword.current['confirm_password'] = '';
          buttonSubmitPassword.current.disabled = false;
          setErrorMsg({ ...errorMsg, [item]: false });
        }
      }
    }
  };

  const validaTudo = (formValues) => {
    for (var item in formValues) {
      if (item != 'email' && formValues[item].length <= 7) {
        buttonSubmitPassword.current.disabled = true;
        errorPassword.current[item] = 'O campo precisa ter pelo menos 8 caracteres! ';
        setErrorMsg({ [item]: true });
        return true;
      }
    }
    buttonSubmitPassword.current.disabled = false;
    setErrorMsg({ [item]: false });
    return false;
  };

  useEffect(() => valida(formValues), [changeInput]);

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (validaTudo(data)) {
      toast.error('Esses campos são de preenchimento obrigatorio!');
    } else {
      toast.promise(loadAuthPassword(data), {
        pending: {
          render: () => {
            setLoadingPassword(true);
            return 'Atualizando  . . . ';
          },
        },
        success: {
          render: (res) => {
            setLoadingPassword(false);
            setFormValues({});
            return res.data.data.message;
          },
        },
        error: {
          render: (res) => {
            setLoadingPassword(false);
            setFormValues({});
            return res.data.response.data.message;
          },
        },
      });
    }
  };

  return (
    <div>
      <NavBar />
      <NavBarUserMobil />

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <input {...register('uuid').ref()} placeholder="uuid" type="hidden" />
        <div className="shadow-md rounded  pb-8 mb-4 flex flex-col  ">
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <div className="flex justify-center"></div>
                <p className="text-center text-3xl">Update</p>

                <div className="p-2"></div>

                <label className="font-semibold ml-1">Nome</label>
                <div className="flex text-lg">
                  <SvgPerson />
                  <input {...register('name')} className={`pro-input pl-11 py-2`} placeholder="Nome" />
                </div>
                {errors.name ? <span className="text-red-600 ml-1">{errors.name.message}</span> : null}
                <div className="p-2"></div>

                <label className="font-semibold ml-1">Email</label>
                <div className="flex text-lg">
                  <SvgEmail />
                  <input {...register('email')} className={`pro-input pl-11 py-2`} placeholder="Email" />
                </div>
                {errors.email ? <span className="text-red-600 ml-1">{errors.email.message}</span> : null}

                <div className="flex items-center justify-end mt-4">
                  <button type="submit" disabled={authState.loading} className="ml-1 pro-button-Success text-lg" id="bt_success">
                    {authState.loading ? <Spinner msgSpinner={'Enviando . . .'} /> : 'Atualizar '}
                  </button>
                </div>

                <div className="flex items-center justify-center mt-4">
                  <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="max-w-xl">
                      <section className="space-y-6">
                        <header>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Deletar conta</h2>
                          <p className="text-justify mt-1 text-lg font-bold text-gray-600 dark:text-gray-400">
                            Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes de
                            excluir sua conta, baixe todos os dados ou informações que deseja reter.
                          </p>
                        </header>
                        <button type="button" onClick={confirmDel} className="pro-button-Danger" disabled={loadingDelete}>
                          {loadingDelete ? <Spinner msgSpinner={' Deletando . . .'} /> : ' Deletar Conta!'}
                        </button>
                      </section>
                    </div>
                  </div>
                </div>

                {/*
                <label className="w-full font-semibold ml-1">
                  Alterar Senha
                </label>
                <div className="flex justify-self-stretch">
                  <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <RadioButton
                      changed={handleDivPassword}
                      id="1"
                      isSelected={divPassword === 'nao' ? true : false}
                      label="Não"
                      value="nao"
                    />
                  </div>
                  <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <RadioButton
                      changed={handleDivPassword}
                      id="2"
                      isSelected={divPassword === 'sim' ? true : false}
                      label="SIM"
                      value="sim"
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmitPassword}>
        <input name="email" type="hidden" value={sessionStorage.getItem('email')} />
        <div className="shadow-md rounded pb-8  flex flex-col ">
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <div className="p-2">
                  <div id="div-password">
                    <label className="w-full font-semibold ml-1">Senha atual</label>
                    <div className="flex text-lg">
                      <SvgCadeado />
                      <input
                        onChange={handleInputChange}
                        type="password"
                        name="password"
                        className={`pro-input pl-10 py-2`}
                        placeholder="Senha Atual"
                        value={formValues.password || ''}
                      />
                    </div>
                    {errorMsg.password ? <span className="text-red-600 ml-1">{errorPassword.current.password}</span> : null}

                    <div className="p-3"></div>

                    <label className="w-full font-semibold ml-1">Nova Senha</label>
                    <div className="flex text-lg">
                      <SvgCadeado />
                      <input
                        onChange={handleInputChange}
                        type="password"
                        name="new_password"
                        className={`pro-input pl-10 py-2`}
                        placeholder="Nova Senha"
                        value={formValues.new_password || ''}
                      />
                    </div>
                    {errorMsg.new_password ? <span className="text-red-600 ml-1">{errorPassword.current.new_password}</span> : null}

                    <div className="p-2"></div>
                    <label className="w-full font-semibold ml-1">Confirme a Senha</label>
                    <div className="flex text-lg">
                      <SvgCadeado />
                      <input
                        onChange={handleInputChange}
                        type="password"
                        name="confirm_password"
                        className={`pro-input pl-10 py-2`}
                        placeholder="Confirme a Senha"
                        value={formValues.confirm_password || ''}
                      />
                    </div>
                    {errorMsg.confirm_password ? <span className="text-red-600 ml-1">{errorPassword.current.confirm_password}</span> : null}
                  </div>
                  <div className="flex items-center justify-end mt-4">
                    <button
                      type="submit"
                      disabled={loadingPassword}
                      className="ml-1 pro-button-Primary text-lg"
                      id="bt_primary"
                      ref={buttonSubmitPassword}
                    >
                      {loadingPassword ? <Spinner msgSpinner={'Um Momento :) . . .'} /> : 'Atualizar '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Footer />

    </div>
  );
};

export default Profile;
