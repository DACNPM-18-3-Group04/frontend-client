import {
  Box,
  Card,
  CardMedia,
  Typography,
  Stack,
  Tooltip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import moment from 'moment';
import AvatarDisplay from '../../../_common/avatar';

export default function ContactItem({
  contact = {
    notes: '',
    type: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    property: {
      id: '',
      title: '',
      image: [],
      type: 'L',
      // author
      user: {
        id: '',
        fullname: '',
        avatar: null,
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
    // contact user
    user: {
      fullname: '',
      contact_email: '',
      contact_number: '',
      avatar: '',
    },
  },
}) {
  const { property, user: contact_user } = contact;
  const imageURL =
    (property.image && property.image.length) > 0
      ? property.image[0]
      : 'https://via.placeholder.com/300?text=No+image';
  const timeSince =
    contact.createdAt && contact.updatedAt
      ? moment(contact.updatedAt || contact.createdAt).fromNow()
      : '';
  let addressDistrict = `${property.district.name}, ${property.district.province.name}`;

  return (
    <Card>
      <Stack spacing={2} direction='row' display='flex'>
        <Box>
          <RouterLink to={`/property/${property.id}`}>
            <CardMedia
              component='img'
              sx={{ width: 240, height: 150 }}
              image={imageURL}
            />
          </RouterLink>
        </Box>
        <Box flex={1}>
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
                <b>Địa chỉ </b> {addressDistrict}
              </Typography>
            </Box>

            <Box>
              <AvatarDisplay
                avatarSrc={contact_user.avatar}
                fullname={contact_user.fullname}
                containerStyle={{ flexDirection: 'row' }}
                avatarStyle={{ width: 24, height: 24, fontSize: '.7rem' }}
                textStyle={{ fontSize: '.8rem' }}
              ></AvatarDisplay>
              <Tooltip title='Tin nhắn được gửi' placement='bottom-start'>
                <Typography noWrap fontSize='.9rem'>
                  <b>Nội dung:</b> {contact.notes || '<Không có nội dung>'}
                </Typography>
              </Tooltip>
            </Box>

            <Stack direction='row' spacing={1}>
              <Typography variant='caption' noWrap>
                {property.user.fullname}
              </Typography>
              <Typography variant='caption' noWrap>
                {timeSince}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
