import { Button, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import StarBorderIcon from './starBorderIcon';
import StarIcon from './starIcon';
import { useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';

let schema = yup.object({
  feedback: yup
    .string()
    .min(8, 'Ít nhất 8 ký tự')
    .required('Không thể bỏ trống'),
});

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: blue[300],
  },
  '& .MuiRating-iconHover': {
    color: blue[500],
  },
});

export default function PropertyReview({
  rating,
  handleRatingChange,
  handleSendReview,
}) {
  const [viewerRating, setViewerRating] = useState(5);
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      feedback: '',
    },
    onSubmit: (values) => {
      handleSendReview(values.feedback);
    },
    validationSchema: schema,
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted && user?.id) setViewerRating(rating || 0);
    return () => {
      isMounted = false;
      setViewerRating(5);
    };
  }, [rating, user]);

  const onRatingChange = (_, newValue) => {
    handleRatingChange(_, newValue);
  };

  return (
    <Box>
      <Box my={2}>
        <Typography fontWeight='bold'>Đánh giá người đăng</Typography>
        <Box>
          <StyledRating
            value={viewerRating}
            onChange={onRatingChange}
            disabled={!user?.id}
            size='large'
            icon={<StarIcon />}
            emptyIcon={<StarBorderIcon />}
          />
        </Box>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box my={2} display='flex' flexDirection='column'>
          <Typography marginBottom={1.5} fontWeight='bold'>
            Chi tiết
          </Typography>
          <TextField
            id='feedback'
            name='feedback'
            label='Đánh giá...'
            value={formik.values.feedback}
            onChange={formik.handleChange}
            helperText={formik.errors.feedback}
            multiline
            type='text'
            minRows={3}
            maxRows={4}
          />
        </Box>

        <Box my={2} display='flex' justifyContent='end'>
          <Typography mx={1}>
            (Liên hệ người đăng để có thể đánh giá)
          </Typography>
          <Button
            type='submit'
            sx={{ width: '11rem' }}
            color='info'
            disabled={!user?.id}
            variant='outlined'
          >
            Đánh giá
          </Button>
        </Box>
      </form>
    </Box>
  );
}
