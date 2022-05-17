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
  certificate,
  description,
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
      />

      <PropertyDetailBody
        certificate={certificate}
        description={description}
        address={address}
        district={district || {}}
        province={province || {}}
        property_type={property_type}
        seller_type={seller_type}
      />
    </Box>
  );
}
