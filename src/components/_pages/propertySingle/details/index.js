import { Box } from '@mui/material';
import PropertyDetailBody from './body';
import PropertyDetailHeader from './header';

export default function PropertyDetail({
  sx,
  title,
  address,
  district = {},
  province = {},
  price,
  area,
  isWished,
  onChangeWish,
  certificate,
  discription,
  property_type,
  seller_type,
}) {
  return (
    <Box sx={sx}>
      <PropertyDetailHeader
        title={title}
        district={district || {}}
        province={province || {}}
        price={price}
        area={area}
        isWished={isWished}
        onChangeWish={onChangeWish}
      />

      <PropertyDetailBody
        certificate={certificate}
        discription={discription}
        address={address}
        district={district || {}}
        province={province || {}}
        property_type={property_type}
        seller_type={seller_type}
      />
    </Box>
  );
}
