import { Paper, Typography, Grid, Box, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import FormPasswordForgot from './passwordForgotForm';

export default function PasswordForgotPage() {
  return (
    <Grid
      container
      spacing={0}
      // Center horizontal & vertical inner element
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '90vh' }} //Parent content area min height
    >
      <Grid item xs={3}>
        <Box display='flex' justifyContent='center' mb={2}>
          <Typography variant='h5' align='center'>
            <b>Quên mật khẩu</b>
          </Typography>
        </Box>
        <Paper sx={{ maxWidth: 360, padding: 2 }}>
          <Box mb={1}>
            <Typography variant='caption'>
              Email đăng nhập tài khoản của bạn
            </Typography>
          </Box>
          <FormPasswordForgot />
          <Box my={2}>
            <Divider></Divider>
          </Box>
          <Button
            fullWidth
            size='small'
            component={Link}
            to={{ pathname: '/' }}
          >
            Quay về trang chủ
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
