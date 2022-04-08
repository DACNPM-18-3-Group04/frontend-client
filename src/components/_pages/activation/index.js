import { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../../_common/loader';
import ErrorPage from '../../_common/errorPage';

import { getErrorMessage } from '../../../helpers/error/errorResponse';
import UserAPI from '../../../helpers/api/user';

export default function AccountActivationPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const activation_id = urlParams.get('activation');
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    UserAPI.handleActivation(activation_id)
      .then(() => {
        toast.success('Kích hoạt tài khoản thành công');
        history.push('/');
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activation_id, history]);

  if (isLoading) {
    return <Loader label='Kích hoạt tài khoản...' />;
  }

  if (error) {
    return (
      <ErrorPage message={getErrorMessage(error)} backToHome={false}>
        <Button variant='contained' component={Link} to='/'>
          Về trang chủ
        </Button>
      </ErrorPage>
    );
  }

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '80vh' /* Layout height */ }}
      >
        <Grid item xs={3}>
          <Box sx={{ width: '300px' }}>
            <Typography>Kích hoạt tài khoản thành công</Typography>
            <Box mt={2}>
              <Button variant='contained' component={Link} to='/'>
                Về trang chủ &#38; Đăng nhập
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
