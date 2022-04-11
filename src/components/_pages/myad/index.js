// import { useSelector } from 'react-redux';
// import { selectUser } from '../../../redux/slices/user';

import { Container } from '@mui/material';
import RecommendSection from './recommendSection';
import SearchSection from './searchSection';

export default function MyAd() {
  return (
    <Container maxWidth={false} disableGutters>
      <SearchSection />
      <RecommendSection title={'Tin rao của tôi'} />
    </Container>
  );
}

