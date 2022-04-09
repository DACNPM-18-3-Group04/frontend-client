import { Container, Paper, Box } from '@mui/material';

export default function RecommendSection() {
  return (
    <Container maxWidth={false}>
      <Box marginTop={16}>
        <Paper>
          <Box padding={2} width='100%' height='30px'></Box>
        </Paper>
      </Box>
    </Container>
  );
}
