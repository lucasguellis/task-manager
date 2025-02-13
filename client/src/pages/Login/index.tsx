import React, { useEffect, useState } from 'react';
import styles from './styles.ts';
import InputField from '../../components/Form/InputField';
import Button from '../../components/Button';
import ButtonStyles from '../../components/Button/styles.ts';
import Logo from '../../components/Logo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext.tsx';
import { ALERTS } from '../../utils/loginErrors.ts';
import FeedbackMessage from '../../components/FeedbackMessage';

const LoginPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

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
      setError('Ambos os campos são necessários.');
      setIsLoading(false);
      return;
    }

    try {
      await login({ username, password });

      setError('');
      navigate('/home');
    } catch (err: any) {
      ALERTS[err.message]
        ? setError(ALERTS[err.message])
        : setError('Um erro inesperado aconteceu. Tente novamente.');
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className="text-center">
            <Logo size={'20'} />
            <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>
            <h3 className="mt-2 text-lg text-gray-700">Faça seu login</h3>
          </div>
          <div className={'content-center justify-center flex'}>
            {searchParams.get('message') === 'register-success' && (
              <FeedbackMessage
                message={'Usuário criado com sucesso!'}
                type={'success'}
              />
            )}
            {searchParams.get('message') === 'error' && (
              <FeedbackMessage
                message={'Algo de errado aconteceu, tente novamente!'}
                type={'error'}
              />
            )}
          </div>

          <form className="space-y-6">
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
              label={'Entrar'}
              type={'submit'}
              isLoading={isLoading}
              onClick={handleSubmit}
              className={'w-full ' + ButtonStyles.primary}
            />

            {error && <p className="text-red-500 text-sm/6">{error}</p>}
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Ainda não tem uma conta?&nbsp;
            <a
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
