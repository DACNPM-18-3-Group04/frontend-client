import { BrowserRouter } from 'react-router-dom';

import NavBar from './navBar';
import Router from '../_router';
import Footer from './footer';

function DefaultLayout() {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ minHeight: '80vh' }}>
        <Router />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default DefaultLayout;
