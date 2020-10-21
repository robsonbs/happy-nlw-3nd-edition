import * as React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../contexts/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isOpen?: boolean;
  isAdmin?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isOpen = false,
  isAdmin = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (isOpen) {
          return <Component />;
        }
        if (isPrivate === !!user) {
          // if (!isAdmin)
          return <Component />;
          // if (isAdmin === user.is_admin) return <Component />;
          // return (
          //   <Redirect
          //     to={{
          //       pathname: isAdmin ? '/' : location.pathname,
          //       state: { from: location },
          //     }}
          //   />
          // );
        }
        return (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
