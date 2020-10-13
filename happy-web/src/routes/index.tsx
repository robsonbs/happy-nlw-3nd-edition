import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Landing} exact />
      <Route path="/app" component={OrphanagesMap} exact />
    </BrowserRouter>);
}

export default Routes;