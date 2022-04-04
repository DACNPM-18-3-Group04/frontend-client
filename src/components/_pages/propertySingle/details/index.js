import { Box } from '@mui/material';
import PropertyDetailBody from './body';
import PropertyDetailHeader from './header';

export default function PropertyDetail({ sx }) {
  return (
    <Box sx={sx}>
      <PropertyDetailHeader />

      <PropertyDetailBody />
    </Box>
  );
}
