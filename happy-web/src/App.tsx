import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
