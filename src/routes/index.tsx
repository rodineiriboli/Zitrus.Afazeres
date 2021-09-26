// import { Switch } from "react-router-dom";
// import { PageNotFound } from "@havan/react-components";
// import { Route } from "./Route";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Afazer } from "../pages/Afazer";

// import { Callback } from "../authentication/pages/Callback";
// import { Logout } from "../authentication/pages/Logout";
// import { LogoutCallback } from "../authentication/pages/LogoutCallback";
// import { SilentRenew } from "../authentication/pages/SilentRenew";
import { Home } from "../pages/Home";
// import { VerbaRegisterHeader } from '../pages/VerbaRegister/Header';
// import { VerbaRegisterList } from "../pages/VerbaRegister/List";
// import { VerbaRegisterSummary } from "../pages/VerbaRegister/Summary";

type RouteDefinition = {
  path: string;
  name: string;
  component: React.ComponentType;
  // isPrivate: boolean;
};

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'Lista de Afazeres',
    component: Home,
    // isPrivate: true
  },
  // Rotas de edição /cadastro/{etapa}/{id}
  {
    path: '/novo',
    name: 'Novo Afazer',
    component: Afazer,
    // isPrivate: true
  },
  {
    path: '/editar/:id',
    name: 'Editar Afazer',
    component: Afazer,
    // isPrivate: true
  },
];

const Routes: React.FC = () => {
  return (
    <Router>

      <Switch>
        {routes.map(({ path, component/*, isPrivate*/ }, key) => (
          <Route
            key={key}
            exact
            path={path}
            // isPrivate={isPrivate}
            component={component}
          />
        ))}

        {/* <Route exact path="/authorize" component={Callback} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/logout/callback" component={LogoutCallback} />
      <Route exact path="/silentrenew" component={SilentRenew} />
    <Route path='*' component={PageNotFound} isPrivate componentProps={{ link: '/' }} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
