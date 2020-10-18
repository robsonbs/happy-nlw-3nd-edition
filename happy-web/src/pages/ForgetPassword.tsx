import React, { useState } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/forget-password.css';

import logoImg from '../images/logo-vet.svg';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isFilled, setFilled] = useState(false);

  return (
    <div id="page-forget-password">
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
          <p>Sua definição de senha será enviada para o e-mail cadastrado</p>
          <label>
            <span>E-mail</span>
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

export default ForgetPassword;
