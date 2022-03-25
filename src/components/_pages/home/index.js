import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/user';

import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth='xl'>
      <h1>Welcome to homepage</h1>
      <TestUserInfo />
    </Container>
  );
}

const TestUserInfo = () => {
  const user = useSelector(selectUser);
  if (user.isLogin) {
    return <div>{user.fullname}</div>;
  }

  return <></>;
};
