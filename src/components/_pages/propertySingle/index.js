/* eslint-disable react/no-children-prop */
import { Box, Card, Container, Grid } from '@mui/material';
import PropertyPoster from './poster';
import PropertyDetail from './details';
import ThumbSlider from './thumbs';
import { useEffect, useState } from 'react';
import {
  getPropertyInfo,
  handleChangeWishedPost,
  handleRatingProperty,
  handleSendReview,
} from '../../../helpers/api/property';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleFailure } from '../../../helpers/api/_helpers';
import { toast } from 'react-toastify';
import { handleLeaveContactForThePropertyPoster } from '../../../helpers/api/contact';

export default function PropertySingle() {
  const [data, setData] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState({
    userRating: 0,
    totalRating: 0,
  });
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPropertyInfo({ propertyID: id, userID: user.id })
        .then((res) => {
          if (res.data.success === false) {
            throw new Error(res.data.message);
          }
          setData(res.data.data?.property);
          setRating({
            userRating: res.data.data?.contactor?.rating || 0,
            totalRating: res.data.data?.property?.total_rating || 0,
          });
          setFavorite(res.data.data?.property?.interests?.isFavorite);
        })
        .catch((err) => {
          handleFailure(err);
          // got error, redirect to 404
          history.push('/404');
        });
    }
    return () => {
      isMounted = false;
      setData({});
      setRating({ userRating: 0, totalRating: 0 });
      setFavorite(false);
    };
  }, [id, user, history]);

  const handleToggleWishedButton = () => {
    handleChangeWishedPost(!favorite)
      .then((res) => {
        setFavorite(res.data.favorite);
      })
      .catch((err) => handleFailure(err));
  };

  const onRatingChange = (_, value) => {
    handleRatingProperty({ propertyID: id, value })
      .then((res) => {
        setRating((pre) => ({
          ...pre,
          userRating: res.data?.data?.rating,
          totalRating: res.data?.data?.totalRating,
        }));
      })
      .catch((err) => handleFailure(err));
  };

  const onSendReview = (feedback) => {
    handleSendReview(feedback)
      .then((_) => toast.success('Gửi đánh giá thành công'))
      .catch((err) => handleFailure(err));
  };

  const onLeaveContact = (formValues) => {
    handleLeaveContactForThePropertyPoster({ ...formValues, propertyID: id })
      .then((_) => toast.success('Gửi thông tin liên hệ thành công'))
      .catch((err) => handleFailure(err));
  };

  return (
    <Container maxWidth='lg'>
      <Card variant='outlined'>
        <Grid container spacing={2} my={2}>
          <Grid item md={8} xs={12}>
            <Box
              children={
                <ThumbSlider
                  sx={{
                    mx: 2,
                    height: '450px',
                    borderRadius: 1,
                    border: '4px solid #212121',
                  }}
                  imgs={data?.imgs}
                />
              }
            />
            <Box
              my={1}
              children={
                <PropertyDetail
                  sx={{ mx: 2 }}
                  title={data.title}
                  address={data.address}
                  district={data.district?.name}
                  province={data.district?.province?.name}
                  price={data.price}
                  area={data.area}
                  isWished={favorite}
                  onChangeWish={handleToggleWishedButton}
                  certificate={data.certificate}
                  discription={data.discription}
                  property_type={data.type}
                  seller_type={data.user?.type}
                />
              }
            />
          </Grid>
          <Grid item md xs>
            <PropertyPoster
              sx={{ mx: 2 }}
              account_type={data.user?.type}
              avatar={data.user?.avatar}
              fullname={data.user?.fullname}
              rating={rating.userRating}
              rating_accumulator={rating.totalRating}
              handleRatingChange={onRatingChange}
              handleSendReview={onSendReview}
              handleSubmitLeaveContact={onLeaveContact}
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
