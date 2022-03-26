import { Route, Switch } from 'react-router-dom';
// import AuthOnlyRoute from './customRoute/authOnlyRoute';
// import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../_pages/notfound';
import Home from '../_pages/home';
import AccountActivationPage from '../_pages/activation';

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
      <Route exact path='/user/activation'>
        <AccountActivationPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default Router;
