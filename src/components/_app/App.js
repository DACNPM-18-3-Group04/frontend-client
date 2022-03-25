import Layout from '../_layout/';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import CustomThemeProvider from './theme';
import store from '../../redux/store';
import FetchSignedInUser from './fetchers/fetchSignedInUser';

function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <FetchSignedInUser>
          <Layout />
        </FetchSignedInUser>
      </CustomThemeProvider>
    </Provider>
  );
}

export default App;
