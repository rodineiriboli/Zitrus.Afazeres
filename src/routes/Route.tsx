import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
} from 'react-router-dom';

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

  return (
    <ReactDOMRoute
      {...rest}
      render={(props) => {
        if (!isPrivate) {
          return <Component {...componentProps} />
        }

        if (true) {
          return <Component {...componentProps} />
        }
        else {
          return null;
        }
      }}
    />
  );
};

export { Route };
