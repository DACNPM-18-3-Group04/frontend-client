import { useContext } from 'react';
import { Box, ImageList as MUIImageList } from '@mui/material';
import AddNewButton from './addNew';
import ListItem from './listItem';

import { UploadImageContext } from '../context';
import { MAX_IMAGES_PER_PROPERTY } from '../../../../../helpers/constants';

export default function ImageList() {
  const { images } = useContext(UploadImageContext);
  const isMaxed = images.length > MAX_IMAGES_PER_PROPERTY - 1;

  return (
    <Box sx={{ maxWidth: '100%', overflowY: 'auto' }}>
      <MUIImageList cols={5} sx={{ minHeight: 80 }}>
        {isMaxed ? <></> : <AddNewButton />}
        {images.map((image, index) => {
          return (
            <ListItem
              key={index}
              imageLink={image.image_link}
              imageId={image.id}
            />
          );
        })}
      </MUIImageList>
    </Box>
  );
}
