import { useState } from 'react';
import { Button } from '@mui/material';

import UploadFile from './uploadFile';

export default function AddNewButton() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(true);
  };

  const toggleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={toggleOpen}>Thêm hình</Button>
      <UploadFile open={open} handleClose={toggleClose} />
    </>
  );
}
