import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import '../styles/pages/login.css';

import logoImg from '../images/logo-vet.svg';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isFilled, setFilled] = useState(false);

  useEffect(() => {
    if (password.length === 0 || email.length === 0) {
      setFilled(false);
      return;
    }
    setFilled(true);
  }, [password, email]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isFilled) {
        signIn({ email, password, remember });
      }
    },
    [password, email, remember, isFilled, signIn],
  );

  return (
    <div id="page-login">
      <div className="background-container">
        <div className="background">
          <img src={logoImg} alt="Happy" />
          <div className="location">
            <strong>Luziânia</strong>
            <span>Goiás</span>
          </div>
        </div>
      </div>
      <div className="sign-in">
        <Link to="/">
          <FiArrowLeft size={32} />
        </Link>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Fazer login</h2>
            <label>
              <span>E-mail</span>
              <input
                type="text"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                type="password"
                name="email"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <div className="remember-block">
              <button
                type="button"
                className="remember-container"
                onClick={() => {
                  setRemember(!remember);
                }}
              >
                <div className={`check-remember ${remember && 'green'}`}>
                  {remember && <FiCheck size={16} color="#FFF" />}
                </div>{' '}
                Lembre-se
              </button>
              <Link to="/forget-password">Esqueci minha senha</Link>
            </div>
            <button
              className={`button ${isFilled && 'active'}`}
              type="submit"
              disabled={!isFilled}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
