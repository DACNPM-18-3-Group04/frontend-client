/* eslint-disable react/no-children-prop */
import { Box, Card, Container, Grid } from '@mui/material';
import PropertyPoster from './poster';
import PropertyDetail from './details';
import ThumbSlider from './thumbs';
import { useEffect, useState } from 'react';
import { getPropertyInfo } from '../../../helpers/api/property';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleFailure } from '../../../helpers/api/_helpers';
import Loader from '../../_common/loader';

export default function PropertySingle() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
      getPropertyInfo({ propertyID: id, userID: user.id })
        .then((res) => {
          if (res.data.success === false) {
            throw new Error(res.data.message);
          }
          setData(res.data.data?.property);
          setLoading(false);
        })
        .catch((err) => {
          handleFailure(err);
          // got error, redirect to 404
          history.push('/404');
        });
    }
    return () => {
      setData({});
    };
  }, [id, user, history]);

  if (loading) {
    return <Loader />;
  }

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
              userID={data.user?.id}
              account_type={data.user?.type}
              avatar={data.user?.avatar}
              fullname={data.user?.fullname}
              contact_email={data.user?.contact_email}
              contact_number={data.user?.contact_number}
              rating={data.review?.userRating}
              rating_accumulator={data.review?.totalRating}
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
