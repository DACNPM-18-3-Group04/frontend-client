import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';

export default function ShowMoreTxt({ txt, max = 100 }) {
  const [showMore, setShowMore] = useState(true);

  return (
    <div>
      {showMore ? (
        <Box sx={{ display: 'inline-flex', fontSize: '0.8rem' }}>
          <Typography
            flex={9}
            noWrap={true}
            sx={{ width: `${max}px`, fontSize: 'inherit', display: 'inline' }}
          >
            {txt}
          </Typography>
          <Box
            sx={{
              display: 'inline',
              cursor: 'pointer',
              color: blue[800],
              '&:hover': { color: blue[600] },
            }}
            onClick={() => setShowMore((p) => !p)}
          >
            Xem thêm
          </Box>
        </Box>
      ) : (
        <Box sx={{ fontSize: '0.8rem' }}>
          {txt}
          <Box
            sx={{
              display: 'inline',
              cursor: 'pointer',
              color: blue[800],
              ml: 0.5,
              '&:hover': { color: blue[600] },
            }}
            onClick={() => setShowMore((p) => !p)}
          >
            Rút gọn
          </Box>
        </Box>
      )}
    </div>
  );
}
