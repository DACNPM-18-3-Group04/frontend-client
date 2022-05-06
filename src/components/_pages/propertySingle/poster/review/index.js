import { Button, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '../../../../_common/icons/starBorderIcon';
import StarIcon from '../../../../_common/icons/starIcon';
import { useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { handleSendReview } from '../../../../../helpers/api/contact';
import { useParams } from 'react-router-dom';
import { handleFailure } from '../../../../../helpers/api/_helpers';

let schema = yup.object({
  content: yup
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

export default function PropertyReview({ rating }) {
  const [viewerRating, setViewerRating] = useState(5);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values) => {
      handleSendReview(values.content, viewerRating, id)
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.message);
        })
        .catch((err) => {
          handleFailure(err);
        });
    },
    validationSchema: schema,
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted && user.id) setViewerRating(rating || 0);
    return () => {
      setViewerRating(5);
    };
  }, [rating, user]);

  const onRatingChange = (_, newValue) => {
    setViewerRating(newValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Box my={2}>
          <Typography fontWeight='bold'>Đánh giá người đăng</Typography>
          <Box>
            <StyledRating
              value={viewerRating}
              onChange={onRatingChange}
              name='rating'
              disabled={!user.id}
              size='large'
              icon={<StarIcon />}
              emptyIcon={<StarBorderIcon />}
            />
          </Box>
        </Box>

        <Box my={2} display='flex' flexDirection='column'>
          <Typography marginBottom={1.5} fontWeight='bold'>
            Chi tiết
          </Typography>
          <TextField
            id='content'
            name='content'
            label='Đánh giá...'
            value={formik.values.content}
            onChange={formik.handleChange}
            helperText={formik.errors.content}
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
            disabled={!user.id}
            variant='outlined'
          >
            Đánh giá
          </Button>
        </Box>
      </Box>
    </form>
  );
}
