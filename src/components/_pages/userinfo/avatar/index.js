import { Avatar, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';

export default function AvatarInfo(props) {
  const { avatar, fullname } = props;
  return (
    <div>
      <Box>
        <IconButton onClick={()=>{
            console.log("Change avatar")
        }}>
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
