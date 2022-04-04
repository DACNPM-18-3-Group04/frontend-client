import { Button, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import StarBorderIcon from './starBorderIcon';
import StarIcon from './starIcon';
import { useState } from 'react';
import { blue } from '@mui/material/colors';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: blue[300],
  },
  '& .MuiRating-iconHover': {
    color: blue[500],
  },
});

export default function PropertyReview({ handleRatingChange }) {
  const [viewerRating, setViewerRating] = useState(5);
  return (
    <Box>
      <Box my={2}>
        <Typography fontWeight='bold'>Đánh giá người đăng</Typography>
        <Box>
          <StyledRating
            value={viewerRating}
            onChange={(_, newValue) => setViewerRating(newValue)}
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
        <TextField label='Đánh giá...' multiline minRows={3} maxRows={4} />
      </Box>

      <Box my={2} display='flex' justifyContent='end'>
        <Typography mx={1}>(Liên hệ người đăng để có thể đánh giá)</Typography>
        <Button sx={{ width: '11rem' }} color='info' variant='outlined'>
          Đánh giá
        </Button>
      </Box>
    </Box>
  );
}
