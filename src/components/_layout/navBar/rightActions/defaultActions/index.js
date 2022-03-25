import { Button } from '@mui/material';
import { useState } from 'react';

import SignInDialog from './dialogs/signin';
import SignUpDialog from './dialogs/signup';

export default function DefaultActions() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const toggleSignInOpen = () => {
    setSignInOpen(!isSignInOpen);
  };

  const toggleSignInClose = () => {
    setSignInOpen(false);
  };

  const toggleSignUpOpen = () => {
    setSignUpOpen(!isSignUpOpen);
  };

  const toggleSignUpClose = () => {
    setSignUpOpen(false);
  };

  return (
    <>
      <Button color='defaultColor' onClick={toggleSignInOpen}>
        Đăng nhập
      </Button>
      <SignInDialog
        open={isSignInOpen}
        toggleClose={toggleSignInClose}
        openSignUpDialog={toggleSignUpOpen}
      />
      <Button color='defaultColor' onClick={toggleSignUpOpen}>
        Đăng ký
      </Button>
      <SignUpDialog
        open={isSignUpOpen}
        toggleClose={toggleSignUpClose}
        openSignInDialog={toggleSignInOpen}
      />
    </>
  );
}
