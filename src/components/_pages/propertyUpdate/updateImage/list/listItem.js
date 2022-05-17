import { ImageListItem } from '@mui/material';

export default function ListItem({ imageLink, imageId }) {
  return (
    <ImageListItem>
      <img
        src={`${imageLink}`}
        srcSet={`${imageLink}`}
        alt={imageId}
        loading='lazy'
      />
    </ImageListItem>
  );
}
