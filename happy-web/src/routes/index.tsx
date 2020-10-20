import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CreateOrphanage from '../pages/CreateOrphanage';
import Dashboard from '../pages/Dashboard';
import ForgetPassword from '../pages/ForgetPassword';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id/edit" component={CreateOrphanage} />
        <Route path="/orphanages/:id/confirm" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
