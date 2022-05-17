import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut as signOutReducer } from '../../../redux/slices/user';
import { signOut as signOutAPI } from '../../../helpers/api/auth';

export default function SignOutButton({ onAfterClicked = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    signOutAPI();
    dispatch(signOutReducer());
    history.push('/');
    onAfterClicked();
  };

  return <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>;
}
