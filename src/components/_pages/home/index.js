// import { useSelector } from 'react-redux';
// import { selectUser } from '../../../redux/slices/user';

import { Container } from '@mui/material';
import RecommendSection from './recommendSection';
import SearchSection from './searchSection';

export default function Home() {
  return (
    <Container maxWidth={false}>
      <SearchSection />
      <RecommendSection />
    </Container>
  );
}

// const TestUserInfo = () => {
//   const user = useSelector(selectUser);
//   if (user.isLogin) {
//     return <div>{user.fullname}</div>;
//   }

//   return <></>;
// };
