import * as React from 'react';
// import { Box, Divider, SwipeableDrawer } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/slices/user';
import DefaultActions from './defaultActions';
import LoggedInActions from './loggedInActions';

export default function RightActions() {
  const user = useSelector(selectUser);

  if (user.isLogin) {
    return <LoggedInActions />;
  }

  return <DefaultActions />;
}
