import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleGetReviewsOnPost } from '../../../../../helpers/api/contact';
import { handleFailure } from '../../../../../helpers/api/_helpers';
import Loader from '../../../../_common/loader';
import ReviewItem from './reviewItem';

export default function ReviewList() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    handleGetReviewsOnPost(id)
      .then((res) => {
        if (isMounted) {
          setReviews(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => handleFailure(err));

    return () => {
      setReviews([]);
      setLoading(true);
    };
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Box>
      {reviews.map((r, i) => (
        <Box key={i} my={1}>
          <ReviewItem
            avatar={r['user.avatar']}
            fullname={r['user.fullname']}
            review={r['review.review']}
            reviewID={r['review.id']}
            rating={r['review.rating']}
            isReported={r['review.reviewreport.id']}
          />
        </Box>
      ))}
    </Box>
  );
}
