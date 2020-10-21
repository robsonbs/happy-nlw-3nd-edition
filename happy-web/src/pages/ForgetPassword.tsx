import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/forget-password.css';

import logoImg from '../images/logo-vet.svg';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isFilled, setFilled] = useState(false);

  useEffect(() => {
    if (email.length) {
      setFilled(true);
      return;
    }
    setFilled(false);
  }, [email.length]);

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
      <div className="sign-in">
        <Link to="/login">
          <FiArrowLeft size={32} />
        </Link>
        <div className="form-container">
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
    </div>
  );
};

export default ForgetPassword;
