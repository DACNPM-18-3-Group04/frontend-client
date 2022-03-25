import { Menu, MenuItem, Button } from '@mui/material';
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
      <MenuItem>Thông tin cá nhân</MenuItem>
      <SignOutButton />
    </Menu>
  );
}
