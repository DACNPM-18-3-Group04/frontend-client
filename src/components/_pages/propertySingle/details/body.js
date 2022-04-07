import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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

export default function PropertyDetailBody({
  discription,
  property_type,
  seller_type,
  certificate,
  address,
  district,
  province,
}) {
  let [estateInfo, setEstateInfo] = useState({
    'Loại tin': 'Đăng bán nhà',
    Loại: 'Cá nhân',
    'Pháp lý': 'Sổ đỏ / Sổ hồng',
    'Địa chỉ': 'Số nhà, đường, phường, quận',
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setEstateInfo((pre) => ({
        ...pre,
        'Loại tin': property_type || 'Chưa xác định',
        Loại: seller_type || 'Chưa xác định',
        'Pháp lý': certificate || 'Chưa xác định',
        'Địa chỉ':
          (address &&
            district &&
            province &&
            `${address}, quận ${district}, ${province}`) ||
          'Chưa xác định',
      }));
    }
    return () => {
      isMounted = false;
    };
  }, [address, property_type, seller_type, certificate, district, province]);

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
          {Object.keys(estateInfo).map((key, i) => (
            <Box sx={rowStyle} key={i}>
              <Typography flex={1} fontWeight='bold' sx={cellStyle}>
                {key}
              </Typography>
              <Box flex={9} sx={cellStyle}>
                {estateInfo[key]}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
