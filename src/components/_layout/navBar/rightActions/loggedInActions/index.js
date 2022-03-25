import { useState } from 'react';
import { IconButton, Avatar } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../redux/slices/user';
import LoggedInMenu from './menu';

export default function LoggedInActions() {
  const user = useSelector(selectUser);
  const fullname = user.fullname;
  const avatar = user.avatar;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar alt={fullname} src={avatar}>
          {/* Fallback to first letter of user's fullname */}
          {fullname ? fullname.charAt(0) : null}
        </Avatar>
      </IconButton>
      <LoggedInMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
}
