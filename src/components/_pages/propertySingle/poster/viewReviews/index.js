import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AvatarDisplay from '../../../../_common/avatar';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import ReviewList from './reviewList';

export default function ViewReviewDialog({
  onClose,
  open,
  rating,
  rating_accumulator,
}) {
  const user = useSelector((s) => s.user);
  const { fullname, avatarSrc } = user;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
      <Box sx={{ px: 4, pt: 0.5, pb: 4 }}>
        <DialogTitle>Đánh giá trong bài đăng này</DialogTitle>

        <AvatarDisplay
          fullname={fullname}
          avatarSrc={avatarSrc}
          containerStyle={{ flexDirection: 'row' }}
          textStyle={{ alignSelf: 'start' }}
          subTxt={
            <Box sx={{ ml: 1, fontSize: '0.8rem' }}>
              <Box flex={7} sx={{ display: 'inline' }}>
                {parseFloat(rating).toFixed(2) || 0} / 5.0
                <Typography
                  ml={0.5}
                  display='inline'
                  fontWeight='bold'
                  fontSize='inherit'
                  color={blue['A400']}
                >{`(${
                  rating_accumulator || 0
                } đánh giá, từ toàn bộ bài đăng)`}</Typography>
              </Box>
            </Box>
          }
        />

        <Box
          maxHeight='24rem'
          sx={{ overflowX: 'hidden', overflowY: 'scroll' }}
        >
          <ReviewList />
        </Box>
      </Box>
    </Dialog>
  );
}
