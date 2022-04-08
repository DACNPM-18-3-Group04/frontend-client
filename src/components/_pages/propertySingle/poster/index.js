import { Avatar, Button, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import PropertyReview from './review';

const tableContainer = {
  border: '1px solid #e0e0e0',
  marginY: 1,
  borderRadius: 2,
};

const rowStyle = {
  display: 'flex',
  height: '2rem',
  alignItems: 'center',
};

const cellStyle = {
  marginLeft: 2,
  fontSize: '.8rem',
};

export default function PropertyPoster({
  fullname,
  avatar,
  account_type,
  rating,
  handleRatingChange,
  rating_accumulator,
  handleSendReview,
  sx,
}) {
  return (
    <Box sx={sx}>
      <Typography fontWeight='bold'>Được đăng bởi</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', my: 1 }}>
        <Box display='flex' justifyContent='center'>
          <IconButton>
            <Avatar alt={fullname} src={avatar} sx={{ width: 48, height: 48 }}>
              {fullname ? fullname.charAt(0) : null}
            </Avatar>
          </IconButton>
        </Box>
        <Typography marginLeft='.5rem' variant='h6' alignSelf='center'>
          {fullname || 'Tên người đăng'}
        </Typography>
      </Box>

      <Typography fontWeight='bold'>Chi tiết người đăng tin</Typography>
      <Box sx={tableContainer}>
        <Box sx={rowStyle}>
          <Typography flex={3} fontWeight='bold' sx={cellStyle}>
            Loại
          </Typography>
          <Box flex={7} sx={cellStyle}>
            {account_type || 'Loại tài khoản'}
          </Box>
        </Box>
        <Box sx={rowStyle}>
          <Typography flex={3} fontWeight='bold' sx={cellStyle}>
            Đánh giá
          </Typography>
          <Box flex={7} sx={{ ...cellStyle, display: 'inline' }}>
            {rating || 0} / 5.0
            <Typography
              ml={0.5}
              display='inline'
              fontWeight='bold'
              fontSize='inherit'
              color={blue['A400']}
            >{`(${rating_accumulator || 0} đánh giá)`}</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 0.8,
          alignSelf: 'center',
          mx: 'auto',
        }}
      >
        <Button variant='contained' color='info' sx={{ my: 0.5 }}>
          Để lại thông tin liên hệ
        </Button>
        <Button variant='outlined' color='info' sx={{ my: 0.5 }}>
          Xem thông tin liên hệ
        </Button>
      </Box>

      <PropertyReview
        rating={rating}
        handleRatingChange={handleRatingChange}
        handleSendReview={handleSendReview}
      />
    </Box>
  );
}
