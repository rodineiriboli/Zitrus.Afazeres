import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
} from 'react-router-dom';
//import { routes } from '.';

// import { useAuth } from "../authentication/hooks/useAuth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  componentProps?: React.ComponentProps<React.ComponentType>;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  componentProps,
  ...rest
}) => {
  // const { isAuthenticated, signinRedirect } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={(props) => {
        if (!isPrivate) {
          return <Component {...componentProps} />
        }

        // const isLoggedIn = isAuthenticated();
        if (true) {//(isLoggedIn) {
          return <Component {...componentProps} />
        }
        else {
          // signinRedirect();
          return null;
        }
      }}
    />
  );
};

export { Route };
