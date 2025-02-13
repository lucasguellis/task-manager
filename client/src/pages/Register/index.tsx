import React, { useEffect, useState } from 'react';
import styles from './styles.ts';
import InputField from '../../components/Form/InputField';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import apis from '../../../api';
import ButtonStyles from '../../components/Button/styles.ts';
import { useAuth } from '../../utils/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

const RegisterPage = (): React.ReactElement => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSucess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    await apis
      .register({ username, password })
      .then(() => {
        setSucess('Usuário criado com sucesso!');
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
        navigate('/login?message=register-success');
      });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className="text-center">
            <div className={'flex flex-row items-center justify-center'}>
              <div className="mr-2 flex">
                <Logo size={'20'} />
              </div>
              <h2 className="text-2xl font-bold">Task Manager</h2>
            </div>
            <h3 className="text-lg text-gray-700">Crie sua conta</h3>
          </div>

          <form className="space-y-4">
            <InputField
              label={'Usuário'}
              type={'text'}
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label="Senha"
              type="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              label={'Criar conta'}
              type={'submit'}
              isLoading={isLoading}
              onClick={handleSubmit}
              className={'w-full ' + ButtonStyles.primary}
            />

            {error && <p className="text-red-500 text-sm/6">{error}</p>}
            {success && <p className="text-green-500 text-sm/6">{success}</p>}
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Já possui uma conta?&nbsp;
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Entre por aqui
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
