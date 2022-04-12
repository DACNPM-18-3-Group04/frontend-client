import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';

import PropertyAPI from '../../../../helpers/api/property';
import formatErrorResponse from '../../../../helpers/utils/formatErrorResponse';

import Loader from '../../../_common/loader';
import ErrorPage from '../../../_common/errorPage';
import PropertyCardList from '../../../_common/property/propertyCardList';

export default function PropertyCardContainer(props) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const title = props.title || 'Nổi bật';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProperties([]);
    setIsLoading(true);
    setError(null);
    PropertyAPI.getRecommendProperties()
      .then((result) => {
        if (!result.data.success) {
          throw new Error(result.data.message);
        }
        const data = result.data.data;
        setProperties(data.properties);
      })
      .catch((error) => {
        let res = formatErrorResponse(error);
        setError(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Box mb={2}>
          <Container maxWidth='lg'>
            <Typography variant='h5'>{title}</Typography>
          </Container>
        </Box>
        <ErrorPage message={error.message} minHeight='300px' />
      </Box>
    );
  }

  if (properties.length === 0) {
    return (
      <Box>
        <Box mb={2}>
          <Container maxWidth='lg'>
            <Typography variant='h5'>{title}</Typography>
          </Container>
        </Box>
        <ErrorPage message={'(Không có)'} minHeight='300px' />
      </Box>
    );
  }

  return (
    <Container maxWidth='xl'>
      <Box mb={2}>
        <Container maxWidth='lg'>
          <Typography variant='h5'>{title}</Typography>
        </Container>
      </Box>
      <PropertyCardList properties={properties} />
    </Container>
  );
}
