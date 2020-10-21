import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import CreateOrphanage from '../pages/CreateOrphanage';
import Dashboard from '../pages/Dashboard';
import ForgetPassword from '../pages/ForgetPassword';
import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Landing} exact isOpen />
      <Route path="/app" component={OrphanagesMap} isOpen />
      <Route path="/login" component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/forget-password" component={ForgetPassword} isOpen />
      <Route path="/reset-password" component={ResetPassword} isOpen />
      <Route path="/orphanages/create" component={CreateOrphanage} isPrivate />
      <Route
        path="/orphanages/:id/edit"
        component={CreateOrphanage}
        isPrivate
      />
      <Route
        path="/orphanages/:id/confirm"
        component={CreateOrphanage}
        isPrivate
      />
      <Route path="/orphanages/:id" component={Orphanage} isOpen />
    </Switch>
  );
};

export default Routes;
