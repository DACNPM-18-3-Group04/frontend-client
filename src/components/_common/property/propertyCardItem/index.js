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

export default function PropertyCardItem({
  property = {
    id: '',
    title: '',
    image: [],
    description: '',
    price: 0,
    area: 0,
    address: '',
    type: 'L',
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
    property.image && property.image.length > 0
      ? property.image[0]
      : 'https://via.placeholder.com/300?text=No+image';
  const createdAtDateTime =
    property.createdAt && property.createdAt !== ''
      ? getLocalDatetimeISOString(property.createdAt)
      : '';
  let addressDistrict = getAddressDistrict(property.district);

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={RouterLink} to={`/info/${property.id}`}>
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
                <b>Giá </b> {formatCurrency(property.price || 0)}
              </Typography>
              <Typography variant='subtitle2'>
                <b>Diện tích </b> {formatArea(property.area || 0)} m&sup2;
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
