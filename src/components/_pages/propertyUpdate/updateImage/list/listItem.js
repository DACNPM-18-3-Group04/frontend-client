import { ImageListItem, ImageListItemBar } from '@mui/material';
import ListItemRemoveButton from './removeItemButton';

export default function ListItem({ imageLink, imageId }) {
  return (
    <ImageListItem>
      <img
        src={`${imageLink}`}
        srcSet={`${imageLink}`}
        alt={imageId}
        loading='lazy'
      />
      <ImageListItemBar actionIcon={<ListItemRemoveButton id={imageId} />} />
    </ImageListItem>
  );
}
