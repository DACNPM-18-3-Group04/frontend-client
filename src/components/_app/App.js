import Layout from '../_layout/';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import CustomThemeProvider from './theme';
import store from '../../redux/store';
import FetchSignedInUser from './fetchers/fetchSignedInUser';
import FetchPropertyLocation from './fetchers/fetchPropertyLocations';

function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <FetchSignedInUser>
          <FetchPropertyLocation />
          <Layout />
        </FetchSignedInUser>
      </CustomThemeProvider>
    </Provider>
  );
}

export default App;
