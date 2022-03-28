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
        <Button fullWidth variant='contained'>
          Đăng tin rao
        </Button>
      </MenuItem>
      <MenuItem>
        <Button fullWidth variant='contained'>
          Tin rao của tôi
        </Button>
      </MenuItem>
      <Link
        to='/user/me'
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <MenuItem>Thông tin cá nhân</MenuItem>
      </Link>
      <SignOutButton />
    </Menu>
  );
}
