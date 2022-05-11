import { Avatar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function AvatarDisplay({
  fullname,
  avatarSrc,
  avatarStyle,
  containerStyle,
  textStyle,
  nameInd = 0,
  subTxt,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        my: 1,
        ...containerStyle,
      }}
    >
      <Box display='flex' justifyContent='center'>
        <IconButton>
          <Avatar
            alt={fullname}
            src={avatarSrc}
            sx={{ width: 48, height: 48, ...avatarStyle }}
          >
            {fullname ? fullname.charAt(nameInd) : null}
          </Avatar>
        </IconButton>
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignContent='center'
      >
        <Typography
          marginLeft='.5rem'
          variant='h6'
          alignSelf='center'
          sx={textStyle}
        >
          {fullname || 'Tên người dùng'}
        </Typography>
        {subTxt}
      </Box>
    </Box>
  );
}
