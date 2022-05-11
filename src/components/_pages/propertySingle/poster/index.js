import { Button, Tooltip, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AvatarDisplay from '../../../_common/avatar';
import { cellStyle, rowStyle, tableContainer } from '../styleObj';
import LeaveContactDialog from './leaveContact';
import PropertyReview from './review';
import ViewContactDialog from './viewContacts';
import ViewReviewDialog from './viewReviews';

export default function PropertyPoster({
  userID,
  fullname,
  avatar,
  contact_email,
  contact_number,
  account_type,
  rating,
  rating_accumulator,
  sx,
}) {
  const [viewContactDialog, setViewContactDialog] = useState(false);
  const [leaveContactDialog, setLeaveContactDialog] = useState(false);
  const [reviewDialog, setReviewDialog] = useState(false);
  const user = useSelector((state) => state.user);

  const handleOpenViewContact = () => {
    setViewContactDialog(true);
  };

  const handleCloseViewContact = () => {
    setViewContactDialog(false);
  };

  const handleOpenLeaveContact = () => {
    setLeaveContactDialog(true);
  };

  const handleCloseLeaveContact = () => {
    setLeaveContactDialog(false);
  };

  const handleOpenReview = () => {
    setReviewDialog(true);
  };

  const handleCloseReview = () => {
    setReviewDialog(false);
  };

  return (
    <Box sx={sx}>
      <Typography fontWeight='bold'>Được đăng bởi</Typography>
      <AvatarDisplay fullname={fullname} avatarSrc={avatar} />

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
            {parseFloat(rating).toFixed(2) || 0} / 5.0
            {userID === user.id ? (
              <Tooltip
                onClick={handleOpenReview}
                title='Xem các đánh giá'
                sx={{ cursor: 'pointer' }}
              >
                <Typography
                  ml={0.5}
                  display='inline'
                  fontWeight='bold'
                  fontSize='inherit'
                  color={blue['A400']}
                >{`(${rating_accumulator || 0} đánh giá)`}</Typography>
              </Tooltip>
            ) : (
              <Typography
                ml={0.5}
                display='inline'
                fontWeight='bold'
                fontSize='inherit'
                color={blue['A400']}
              >{`(${rating_accumulator || 0} đánh giá)`}</Typography>
            )}
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
        <Button
          variant='contained'
          color='info'
          sx={{ my: 0.5 }}
          disabled={user.id === userID}
          onClick={handleOpenLeaveContact}
        >
          Để lại thông tin liên hệ
        </Button>
        <Button
          variant='outlined'
          color='info'
          sx={{ my: 0.5 }}
          onClick={handleOpenViewContact}
        >
          Xem thông tin liên hệ
        </Button>

        <ViewContactDialog
          avatarSrc={avatar}
          contact_email={contact_email}
          contact_number={contact_number}
          fullname={fullname}
          open={viewContactDialog}
          onClose={handleCloseViewContact}
        />

        <LeaveContactDialog
          avatarSrc={avatar}
          fullname={fullname}
          open={leaveContactDialog}
          onClose={handleCloseLeaveContact}
        />

        <ViewReviewDialog
          rating={rating}
          rating_accumulator={rating_accumulator}
          open={reviewDialog}
          onClose={handleCloseReview}
        />
      </Box>

      <PropertyReview rating={0} />
    </Box>
  );
}
