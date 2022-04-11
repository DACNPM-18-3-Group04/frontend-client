import { Container, Paper, Box } from '@mui/material';
import PropertyCardContainer from './container';

export default function RecommendSection(props) {
  const title = props.title || 'Nổi bật';
  return (
    <Container maxWidth={false} disableGutters>
      <Box marginTop={16}>
        <Paper>
          <Box padding={2} width='100%'>
            <PropertyCardContainer title={title} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
