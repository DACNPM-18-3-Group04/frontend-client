import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import getLocalDatetimeISOString from '../../../../../helpers/utils/getLocalDatetimeISOString';
import ClippedTypography from '../../../../_common/utils/clippedTypography';
import { getAddressDistrict } from './helper';
import formatCurrency from '../../../../../helpers/format/formatCurrency';
import formatArea from '../../../../../helpers/format/formatArea';

export default function PropertyListItem({
  property = {
    id: '',
    title: '',
    images: [],
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
    property.images && property.images.length > 0
      ? property.images[0].image_link
      : 'https://via.placeholder.com/300?text=No+image';
  const createdAtDateTime =
    property.createdAt && property.createdAt !== ''
      ? getLocalDatetimeISOString(property.createdAt)
      : '';
  let addressDistrict = getAddressDistrict(property.district);

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <RouterLink to={`/property/${property.id}`}>
          <CardMedia
            component='img'
            sx={{ width: 240, height: 150 }}
            image={imageURL}
          />
        </RouterLink>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              component={RouterLink}
              to={`/property/${property.id}`}
              variant='body1'
              color={blue[900]}
              noWrap
              sx={{
                textDecoration: 'none',
              }}
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
              <Typography variant='subtitle2' noWrap>
                <b>Giá </b> {formatCurrency(property.price || 0)}
              </Typography>
              <Typography variant='subtitle2' noWrap>
                <b>Diện tích </b> {formatArea(property.area || 0)} m&sup2;
              </Typography>
              <Typography variant='subtitle2' noWrap>
                <b>Địa chỉ </b> {property.address}, {addressDistrict}
              </Typography>
            </Box>
            <ClippedTypography variant='subtitle2'>
              {property.description}
            </ClippedTypography>
            <Stack direction='row' spacing={1}>
              <Typography variant='caption' noWrap>
                {property.user.fullname}
              </Typography>
              <Typography variant='caption' noWrap>
                {createdAtDateTime}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
