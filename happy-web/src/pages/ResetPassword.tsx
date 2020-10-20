import React, { useState } from 'react';
import { FiArrowLeft, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/reset-password.css';

import logoImg from '../images/logo-vet.svg';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [noMaskedPass, setNoMaskedPass] = useState(false);
  const [noMaskedPassConfirm, setNoMaskedPassConfirm] = useState(false);
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
          <h2>Redefinir a senha</h2>
          <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>
          <label>
            <span>Nova senha</span>
            <div className="person-input">
              <input
                type={noMaskedPass ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setNoMaskedPass(!noMaskedPass)}
              >
                {noMaskedPass ? <FiEyeOff color="#15C3D6" /> : <FiEye />}
              </button>
            </div>
          </label>
          <label>
            <span>Nova senha</span>
            <div className="person-input">
              <input
                type={noMaskedPassConfirm ? 'text' : 'password'}
                name="email"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setNoMaskedPassConfirm(!noMaskedPassConfirm)}
              >
                {noMaskedPassConfirm ? <FiEyeOff color="#15C3D6" /> : <FiEye />}
              </button>
            </div>
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
