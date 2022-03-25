import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HideOnScroll from '../../_common/utils/hideOnScroll';
import RightActions from './rightActions';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavTitle = styled(Typography)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

function NavBar() {
  return (
    <>
      <HideOnScroll>
        <AppBar color='background'>
          <Toolbar>
            <NavTitle component={Link} to='/'>
              Propbook
            </NavTitle>
            <Box sx={{ flexGrow: 1 }} />
            <RightActions />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Offset />
    </>
  );
}

export default NavBar;
