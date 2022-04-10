import { Avatar, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import UploadFile from '../../uploadFile';
import { useState } from 'react';

const baseURL = process.env.REACT_APP_API

export default function AvatarInfo(props) {
  const [open, setOpen] = useState(false);
  const { avatar, fullname } = props;
  console.log('datnc avatar', avatar, fullname);
  return (
    <div>
      <Box>
        <UploadFile open={open}></UploadFile>
        <IconButton
          onClick={() => {
            console.log('Change avatar');
            setOpen(true);
          }}
        >
          <Avatar alt={fullname} src={`${baseURL}${avatar}`}>
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
