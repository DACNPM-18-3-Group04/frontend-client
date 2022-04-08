/* eslint-disable react/no-children-prop */
import { Box, Card, Container, Grid } from '@mui/material';
import PropertyPoster from './poster';
import PropertyDetail from './details';
import ThumbSlider from './thumbs';
import { useEffect, useState } from 'react';
import {
  getContactInfo,
  getImgLinks,
  getPropertyInfo,
  getWishedStateOfViewer,
  handleChangeWishedPost,
  handleRatingProperty,
  handleSendReview,
} from '../../../helpers/api/property';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleFailure } from '../../../helpers/api/_helpers';
import { toast } from 'react-toastify';

export default function PropertySingle() {
  const [data, setData] = useState({});
  const [imgs, setImgs] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [contacts, setContacts] = useState({});
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPropertyInfo(id)
        .then((res) => {
          setData(res.data.property);

          getImgLinks(id)
            .then((res) => setImgs(res.data.imgs))
            .catch((err) => handleFailure(err));
          getContactInfo(id)
            .then((res) => setContacts(res.data.seller))
            .catch((err) => handleFailure(err));
          if (user)
            getWishedStateOfViewer(id, user.id)
              .then((res) => setFavorite(res.data))
              .catch((err) => handleFailure(err));
        })
        .catch((err) => {
          handleFailure(err);
          // got error, navigate to 404
          history.push('/404');
        });
    }
    return () => {
      isMounted = false;
      setData({});
      setImgs([]);
      setContacts({});
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
        setContacts((pre) => ({
          ...pre,
          rating: res.data.rating,
          rating_accumulator: res.data.rating_accumulator,
        }));
      })
      .catch((err) => handleFailure(err));
  };

  const onSendReview = (feedback) => {
    handleSendReview(feedback)
      .then((_) => toast.success('Gửi đánh giá thành công'))
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
                  imgs={imgs}
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
                  district={data.district}
                  province={data.province}
                  price={data.price}
                  area={data.area}
                  isWished={favorite}
                  onChangeWish={handleToggleWishedButton}
                  certificate={data.certificate}
                  discription={data.discription}
                  property_type={data.type}
                  seller_type={contacts.type}
                />
              }
            />
          </Grid>
          <Grid item md xs>
            <PropertyPoster
              sx={{ mx: 2 }}
              account_type={contacts.type}
              avatar={contacts.avatar}
              fullname={contacts.fullname}
              rating={contacts.rating}
              rating_accumulator={contacts.rating_accumulator}
              handleRatingChange={onRatingChange}
              handleSendReview={onSendReview}
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
