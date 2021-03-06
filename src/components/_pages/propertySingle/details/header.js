// !IMPORTANT
// COMMENTED LINES ARE FOR WISHLIST FEATURES
// THAT ARE DISABLED DUE TO LACK OF TIME & RESOURCES
import {
  // Card,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';
// import { pink } from '@mui/material/colors';
import { useSelector } from 'react-redux';
// import { handleChangeWishedState } from '../../../../helpers/api/user';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { handleFailure } from '../../../../helpers/api/_helpers';

export default function PropertyDetailHeader({
  title,
  district = {},
  province = {},
  price,
  area,
  isWished,
  sellerId = '',
  propertyId = '',
}) {
  // eslint-disable-next-line no-unused-vars
  const [favorite, setFavorite] = useState(false);
  const user = useSelector((state) => state.user);
  // const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted && user.id) setFavorite(isWished);
    return () => {
      isMounted = false;
    };
  }, [isWished, user]);

  let isSeller = false;
  if (user.isLogin) {
    isSeller = `${sellerId}` === `${user.id}`;
  }
  // const handleToggleWished = () => {
  //   handleChangeWishedState(id)
  //     .then((res) => {
  //       toast.success(res.data.message);
  //       setFavorite((pre) => !pre);
  //     })
  //     .catch((err) => handleFailure(err));
  // };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography my={1} variant='h5'>
          {title || 'Tiêu đề không tồn tại'}
        </Typography>
        <Typography my={1}>
          {district && province
            ? `${district}, ${province}`
            : 'Vị trí quận, thành phố chưa xác định'}
        </Typography>
        <Box my={1}>
          <Typography
            fontWeight='bold'
            sx={{ marginRight: '1rem', display: 'inline' }}
          >
            Giá{' '}
            <span
              style={{ fontWeight: 'inherit', display: 'inline', color: 'red' }}
            >
              {(price || -999999999).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </Typography>
          <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
            Diện tích{' '}
            {area?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}{' '}
            m&sup2;
          </Typography>
        </Box>
      </Box>
      <Box>
        {isSeller && (
          <Paper>
            <IconButton
              component={Link}
              to={`/property/update/${propertyId}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <EditIcon />
            </IconButton>
          </Paper>
        )}
      </Box>

      {/* {user.id && (
        <Box>
          <Card sx={{ boxShadow: 3 }}>
            <IconButton sx={{ borderRadius: 0 }} onClick={handleToggleWished}>
              {favorite ? (
                <FavoriteIcon sx={{ color: pink[600] }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: pink[600] }} />
              )}
            </IconButton>
          </Card>
        </Box>
      )} */}
    </Box>
  );
}
