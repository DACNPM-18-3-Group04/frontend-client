import { Container, Paper, Box } from '@mui/material';
import SearchForm from './searchForm';

export default function SearchSection() {
  return (
    <Container maxWidth='lg'>
      <Box marginTop={16}>
        <Paper>
          <Box padding={2}>
            <SearchForm />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
