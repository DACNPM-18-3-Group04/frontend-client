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

const isWished = (status) => {
  return status === 'A';
};

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
          setData(res.data.data);
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
                  imgs={data.property?.imgs}
                />
              }
            />
            <Box
              my={1}
              children={
                <PropertyDetail
                  sx={{ mx: 2 }}
                  title={data.property?.title}
                  address={data.property?.address}
                  district={data.property?.district?.name}
                  province={data.property?.district?.province?.name}
                  price={data.property?.price}
                  area={data.property?.area}
                  certificate={data.property?.certificate}
                  discription={data.property?.discription}
                  property_type={data.property?.type}
                  seller_type={data.property?.user?.type}
                  isWished={
                    data.property?.userwishlists?.length > 0 &&
                    isWished(data.property?.userwishlists[0]?.status)
                  }
                />
              }
            />
          </Grid>
          <Grid item md xs>
            <PropertyPoster
              sx={{ mx: 2 }}
              userID={data.property?.user?.id}
              account_type={data.property?.user?.type}
              avatar={data.property?.user?.avatar}
              fullname={data.property?.user?.fullname}
              contact_email={data.property?.user?.contact_email}
              contact_number={data.property?.user?.contact_number}
              rating={data.reviews?.total_rating || 0}
              rating_accumulator={data.reviews?.rating_accumulator}
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
