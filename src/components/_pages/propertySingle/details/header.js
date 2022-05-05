import { Card, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';
import { pink } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { handleChangeWishedState } from '../../../../helpers/api/user';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleFailure } from '../../../../helpers/api/_helpers';

export default function PropertyDetailHeader({
  title,
  district = {},
  province = {},
  price,
  area,
  isWished,
}) {
  const [favorite, setFavorite] = useState(false);
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted && user.id) setFavorite(isWished);
    return () => {
      isMounted = false;
    };
  }, [isWished, user]);

  const handleToggleWished = () => {
    handleChangeWishedState(id)
      .then((res) => {
        toast.success(res.data.message);
        setFavorite((pre) => !pre);
      })
      .catch((err) => handleFailure(err));
  };

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

      {user.id && (
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
      )}
    </Box>
  );
}
