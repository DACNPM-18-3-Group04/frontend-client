import { Box, Typography } from '@mui/material';

const tableContainer = {
  border: '1px solid #e0e0e0',
  marginY: 1,
  borderRadius: 2,
};

const rowStyle = {
  display: 'flex',
  height: '2rem',
  alignItems: 'center',
};

const cellStyle = {
  marginLeft: 2,
  fontSize: '.8rem',
};

const exampleSpecialities = {
  'Loại tin': 'Đăng bán nhà',
  Loại: 'Cá nhân',
  'Pháp lý': 'Sổ đỏ / Sổ hồng',
  'Địa chỉ': 'Số nhà, đường, phường, quận',
};

export default function PropertyDetailBody({ discription }) {
  return (
    <Box my={1}>
      <Box my={1}>
        <Typography fontWeight='bold'>Mô tả</Typography>
        <Typography
          fontSize='.8rem'
          dangerouslySetInnerHTML={{
            __html: discription ? discription : '<p>Không có mô tả</p>',
          }}
        />
      </Box>

      <Box my={1}>
        <Typography fontWeight='bold'>Đặc điểm</Typography>

        <Box sx={tableContainer}>
          {Object.keys(exampleSpecialities).map((key) => (
            <Box sx={rowStyle} key={exampleSpecialities[key]}>
              <Typography flex={1} fontWeight='bold' sx={cellStyle}>
                {key}
              </Typography>
              <Box flex={9} sx={cellStyle}>
                {exampleSpecialities[key]}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
