import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';

export default function ShowMoreTxt({ txt, max = 100 }) {
  const [showMore, setShowMore] = useState(true);

  return (
    <Box fontSize='0.8rem'>
      {txt.length > max ? (
        showMore ? (
          <Box sx={{ display: 'inline-flex', pb: 1 }}>
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
          <Box pb={1}>
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
        )
      ) : (
        <Typography pb={1} fontSize='inherit'>
          {txt}
        </Typography>
      )}
    </Box>
  );
}
