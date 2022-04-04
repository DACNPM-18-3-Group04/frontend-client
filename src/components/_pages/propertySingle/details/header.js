import { Card, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { pink } from '@mui/material/colors';

export default function PropertyDetailHeader({ title, address, price, area }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography my={1} variant='h5'>
          {title || 'Tiêu đề'}
        </Typography>
        <Typography my={1}>{address || 'Vị trí quận, thành phố'}</Typography>
        <Box my={1}>
          <Typography
            fontWeight='bold'
            sx={{ marginRight: '1rem', display: 'inline' }}
          >
            Giá {price}
          </Typography>
          <Typography sx={{ display: 'inline', fontWeight: 'bold' }}>
            Diện tích {area}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Card sx={{ boxShadow: 3 }}>
          <IconButton
            sx={{ borderRadius: 0 }}
            onClick={() => setFavorite((fav) => !fav)}
          >
            {favorite ? (
              <FavoriteIcon sx={{ color: pink[600] }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: pink[600] }} />
            )}
          </IconButton>
        </Card>
      </Box>
    </Box>
  );
}
