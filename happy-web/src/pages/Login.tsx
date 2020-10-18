import React, { useState } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/login.css';

import logoImg from '../images/logo-vet.svg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isFilled, setFilled] = useState(false);

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
      <div className="signin">
        <Link to="/">
          <FiArrowLeft size={32} />
        </Link>
        <form action="">
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
  );
};

export default Login;
