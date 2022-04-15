import { Container, Box } from '@mui/material';
import PropertyUpdateContainer from './propertyContainer';
import { useParams } from 'react-router-dom';

export default function PropertyUpdatePage() {
  let { id } = useParams();

  return (
    <Container>
      <Box mt={4}>
        <PropertyUpdateContainer propertyId={id} />
      </Box>
    </Container>
  );
}
