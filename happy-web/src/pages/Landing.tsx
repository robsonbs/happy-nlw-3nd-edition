import React from 'react';
import { FiArrowRight } from 'react-icons/fi'

import '../styles/landing.css';

import logoImg from '../images/logo.svg';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className="location">
          <strong>Luziânia</strong>
          <span>Goiás</span>
        </div>
        <a href="/" className="enter-app"><FiArrowRight size={32}/></a>
      </div>
    </div>
  );
}

export default Landing;