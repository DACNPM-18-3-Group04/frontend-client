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

export default function PropertyListItem({
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
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <RouterLink to={`/info/${property.id}`}>
          <CardMedia
            component='img'
            sx={{ width: 150, height: 150 }}
            image={imageURL}
            alt='Live from space album cover'
          />
        </RouterLink>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              component={RouterLink}
              to={`/info/${property.id}`}
              variant='body1'
              color={blue[900]}
              noWrap
              sx={{
                textDecoration: 'none',
              }}
            >
              <b>{property.title}</b>
            </Typography>
            <Stack direction='row' spacing={1}>
              <Typography variant='subtitle2' noWrap>
                <b>Giá </b> {property.price} đ
              </Typography>
              <Typography variant='subtitle2' noWrap>
                <b>Diện tích </b> {property.area} m2
              </Typography>
              <Typography variant='subtitle2' noWrap>
                <b>Địa chỉ </b> {property.address}, {addressDistrict}
              </Typography>
            </Stack>
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

const getAddressDistrict = (district) => {
  let addressDistrict = '';
  if (!district || !district.name) {
    return addressDistrict;
  }
  addressDistrict = `${district.name}`;

  const province = district.province;
  if (!province || !province.name) {
    return addressDistrict;
  }

  return `${addressDistrict}, ${province.name}`;
};
