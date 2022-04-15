import { Container, Box } from '@mui/material';
import CreateProperty from './createProperty';

export default function PropertyCreatePage() {
  return (
    <Container>
      <Box mt={4}>
        <CreateProperty />
      </Box>
    </Container>
  );
}
