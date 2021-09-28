import { Afazer } from "../pages/Afazer";
import { Home } from "../pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

type RouteDefinition = {
  path: string;
  name: string;
  component: React.ComponentType;
};

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'Lista de Afazeres',
    component: Home,
  },

  // Rotas de edição /cadastro/{etapa}/{id}
  {
    path: '/novo',
    name: 'Novo Afazer',
    component: Afazer,
  },
  {
    path: '/editar/:id',
    name: 'Editar Afazer',
    component: Afazer,
  },
];

const Routes: React.FC = () => {
  return (
    <Router>

      <Switch>
        {routes.map(({ path, component }, key) => (
          <Route
            key={key}
            exact
            path={path}
            component={component}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default Routes;
