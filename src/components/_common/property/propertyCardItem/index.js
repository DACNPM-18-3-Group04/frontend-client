import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import getLocalDatetimeISOString from '../../../../helpers/utils/getLocalDatetimeISOString';
import { getAddressDistrict } from './helper';
import formatCurrency from '../../../../helpers/format/formatCurrency';
import formatArea from '../../../../helpers/format/formatArea';
import PropertyCardActions from './cardActions';

export default function PropertyCardItem({
  property = {
    id: '',
    title: '',
    images: [],
    description: '',
    price: 0,
    area: 0,
    address: '',
    type: 'L',
    author_id: -1,
    user: {
      id: '',
      email: '',
      fullname: '',
      avatar: null,
      status: '',
    },
    district: {
      id: '',
      name: '',
      province: {
        id: '',
        name: '',
      },
    },
    status: 'A',
    createdAt: '',
  },
}) {
  const imageURL =
    property.images && property.images.length > 0
      ? property.images[0].image_link
      : 'https://via.placeholder.com/300?text=No+image';
  const createdAtDateTime =
    property.createdAt && property.createdAt !== ''
      ? getLocalDatetimeISOString(property.createdAt)
      : '';
  let addressDistrict = getAddressDistrict(property.district);

  return (
    <Card sx={{ height: '100%' }}>
      <PropertyCardActions
        author_id={property.author_id}
        propertyId={property.id}
      />
      <CardActionArea component={RouterLink} to={`/property/${property.id}`}>
        <CardMedia
          component='img'
          sx={{ height: 150 }}
          image={imageURL}
          alt=''
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography
              component='div'
              variant='body2'
              color={blue[900]}
              noWrap
            >
              <b>{property.title}</b>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 1,
                flexWrap: 'wrap',
              }}
            >
              <Typography variant='subtitle2'>
                <b>Gi?? </b> {formatCurrency(property.price || 0)}
              </Typography>
              <Typography variant='subtitle2'>
                <b>Di???n t??ch </b> {formatArea(property.area || 0)} m&sup2;
              </Typography>
            </Box>
            <Typography variant='caption'>
              {property.address}, {addressDistrict}
            </Typography>
            <Box marginY={2} />
            <Typography variant='caption' noWrap>
              {createdAtDateTime}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
