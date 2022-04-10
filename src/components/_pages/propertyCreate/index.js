import { Container, Paper, Box, Typography } from '@mui/material';
import CreateProperty from './createProperty';

export default function PropertyCreatePage() {
  return (
    <Container>
      <Paper>
        <Box padding={2} my={3}>
          <Box mb={2}>
            <Typography variant='h6'>
              <b>Đăng tin rao mới</b>
            </Typography>
          </Box>
          <CreateProperty />
        </Box>
      </Paper>
    </Container>
  );
}
