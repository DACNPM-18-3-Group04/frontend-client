import { Container, Paper, Box, Typography } from '@mui/material';
import CreateProperty from './createProperty';

export default function PropertyCreatePage() {
  return (
    <Container>
      <Paper>
        <Box padding={2} my={3}>
          <Typography>Đăng tin rao mới</Typography>
          <CreateProperty />
        </Box>
      </Paper>
    </Container>
  );
}
