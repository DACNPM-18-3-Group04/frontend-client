import { Avatar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import UploadFile from '../../uploadFile';
import { useState } from 'react';

export default function AvatarInfo(props) {
  const [open, setOpen] = useState(false);
  const { avatar, fullname } = props;
  console.log('datnc avatar', avatar, fullname);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Box>
        <UploadFile open={open} onClose={toggleOpen} />
        <IconButton onClick={toggleOpen}>
          <Avatar alt={fullname} src={avatar}>
            {fullname ? fullname.charAt(0) : null}
          </Avatar>
        </IconButton>
        <Typography marginLeft='.5rem' variant='h6' alignSelf='center'>
          {fullname}
        </Typography>
      </Box>
    </div>
  );
}
