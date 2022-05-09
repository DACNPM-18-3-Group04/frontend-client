import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import AvatarDisplay from '../../../../_common/avatar';
import StarIcon from '../../../../_common/icons/starIcon';
import ShowMoreTxt from '../../../../_common/showMoreTxt';
import FlagIcon from '@mui/icons-material/Flag';
import { Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { handleReportReview } from '../../../../../helpers/api/contact';
import { useParams } from 'react-router-dom';
import { handleFailure } from '../../../../../helpers/api/_helpers';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  reason: Yup.string()
    .min(8, 'Ít nhất 8 ký tự')
    .max(255, 'Dài nhất 255 ký tự')
    .required('Không thể bỏ trống trường lý do'),
});

export default function ReviewItem({
  rating,
  avatar,
  fullname,
  review,
  reviewID,
  isReported,
}) {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      reason: '',
    },
    onSubmit: (values) => {
      handleReportReview(id, reviewID, values.reason)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
        })
        .catch((err) => handleFailure(err));
    },
    validationSchema: schema,
  });
  const [showReportScx, setShowReportScx] = useState(false);

  const handleShowReportScx = () => {
    if (!isReported) setShowReportScx((p) => !p);
  };

  return (
    <Box boxShadow={2}>
      <Box display='flex'>
        <Box flex={1} sx={{ pl: 2, display: 'flex', flexDirection: 'column' }}>
          <AvatarDisplay
            containerStyle={{ flexDirection: 'row' }}
            avatarStyle={{ width: 32, height: 32 }}
            textStyle={{ fontSize: '0.9rem' }}
            avatarSrc={avatar}
            fullname={fullname}
          />

          <Box color={blue[500]}>
            {[...Array(rating || 0)].map((_, i) => (
              <StarIcon key={i} width='16px' height='16px' />
            ))}
          </Box>

          {review && <ShowMoreTxt txt={review} />}
        </Box>

        <Box>
          <Box py={1} px={0.5}>
            <IconButton
              onClick={handleShowReportScx}
              color={!isReported ? 'default' : 'warning'}
            >
              <FlagIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {showReportScx && (
        <Box pb={1} pt={2} px={2}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ display: 'flex' }}
              multiline
              minRows={2}
              placeholder='Lý do...'
              name='reason'
              maxRows={3}
              onChange={formik.handleChange}
              value={formik.values.reason}
              helperText={formik.errors.reason}
            />

            <Box
              sx={{
                display: 'flex',
                my: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Button
                onClick={handleShowReportScx}
                variant='contained'
                type='button'
                color='info'
                sx={{ textTransform: 'capitalize' }}
              >
                Thu gọn
              </Button>
              <Button
                variant='contained'
                type='submit'
                color='success'
                sx={{ ml: 1, textTransform: 'capitalize' }}
              >
                Gửi
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
}
