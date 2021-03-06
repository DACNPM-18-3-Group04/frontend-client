import { Menu, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SignOutButton from '../../../../../_common/signOutButton';

export default function LoggedInMenu({
  anchorEl,
  open,
  handleClose = () => {},
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem>
        <Button
          fullWidth
          variant='contained'
          component={Link}
          to='/property/create'
        >
          Đăng tin rao
        </Button>
      </MenuItem>
      <MenuItem component={Link} to='/property/me'>
        <Button fullWidth variant='contained'>
          Tin rao của tôi
        </Button>
      </MenuItem>
      <MenuItem component={Link} to='/contact/me'>
        Tin nhắn
      </MenuItem>
      <MenuItem component={Link} to='/user/me'>
        Thông tin cá nhân
      </MenuItem>
      <SignOutButton />
    </Menu>
  );
}
