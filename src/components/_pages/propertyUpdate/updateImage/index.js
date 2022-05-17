import { Paper, Box, Typography } from '@mui/material';
import UploadImageProvider from './context';
import ImageList from './list';

export default function PropertyImage({ propertyId = '', images = [] }) {
  return (
    <Paper>
      <Box padding={2}>
        <Typography>Hình ảnh</Typography>
        <UploadImageProvider propertyId={propertyId} images={images}>
          <ImageList />
        </UploadImageProvider>
      </Box>
    </Paper>
  );
}
