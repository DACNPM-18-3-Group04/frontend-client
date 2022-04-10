import { Container, Paper, Box } from '@mui/material';
import PropertyCardContainer from './container';

export default function RecommendSection() {
  return (
    <Container maxWidth={false} disableGutters>
      <Box marginTop={16}>
        <Paper>
          <Box padding={2} width='100%'>
            <PropertyCardContainer />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
