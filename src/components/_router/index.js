import { Route, Switch } from 'react-router-dom';
// import AuthOnlyRoute from './customRoute/authOnlyRoute';
// import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../_pages/notfound';
import Home from '../_pages/home';

// Pages

function Router() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/notfound'>
        <NotFoundPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default Router;
