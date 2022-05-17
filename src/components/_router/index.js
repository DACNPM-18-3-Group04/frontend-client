import { Route, Switch } from 'react-router-dom';
import AuthOnlyRoute from './customRoute/authOnlyRoute';
import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../_pages/notfound';
import Home from '../_pages/home';
import AccountActivationPage from '../_pages/activation';
import UserInfo from '../_pages/userinfo';
import PropertySingle from '../_pages/propertySingle';
import PropertyCreatePage from '../_pages/propertyCreate';
import PropertySearchPage from '../_pages/search';
import MyAd from '../_pages/myad';
import PropertyUpdatePage from '../_pages/propertyUpdate';
import MyContactList from '../_pages/myContactList';
import PasswordForgotPage from '../_pages/passwordForgot';
import PasswordResetPage from '../_pages/passwordReset';
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
      <AuthOnlyRoute exact path='/property/me'>
        <MyAd />
      </AuthOnlyRoute>
      <AuthOnlyRoute exact path='/user/me'>
        <UserInfo />
      </AuthOnlyRoute>
      <Route exact path='/properties'>
        <PropertySearchPage />
      </Route>
      <AuthOnlyRoute exact path='/property/create'>
        <PropertyCreatePage />
      </AuthOnlyRoute>
      <AuthOnlyRoute exact path='/property/update/:id'>
        <PropertyUpdatePage />
      </AuthOnlyRoute>
      <Route exact path='/property/:id'>
        <PropertySingle />
      </Route>
      <AuthOnlyRoute exact path='/contact/me'>
        <MyContactList />
      </AuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/password/forgot'>
        <PasswordForgotPage />
      </NonAuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/password/reset'>
        <PasswordResetPage />
      </NonAuthOnlyRoute>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default Router;
