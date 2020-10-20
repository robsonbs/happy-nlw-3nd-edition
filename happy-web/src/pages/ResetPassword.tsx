import React, { useState } from 'react';
import { FiArrowLeft, FiCheck, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/reset-password.css';

import logoImg from '../images/logo-vet.svg';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isFilled, setFilled] = useState(false);

  return (
    <div id="page-reset-password">
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
        <Link to="/login">
          <FiArrowLeft size={32} />
        </Link>
        <form action="">
          <h2>Esqueci a senha</h2>
          <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>
          <label>
            <span>Nova senha</span>
            <div className="person-input">
              <input
                type="text"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <FiEye />
            </div>
          </label>
          <label>
            <span>Nova senha</span>
            <input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
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

export default ResetPassword;
