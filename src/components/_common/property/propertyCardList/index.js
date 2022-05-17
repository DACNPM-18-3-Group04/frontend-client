import {
  Grid,
  //
} from '@mui/material';

import PropertyCardItem from '../propertyCardItem';

export default function PropertyCardList({
  properties = [],
  justifyCenter = true,
}) {
  const props = {
    container: true,
    spacing: 2,
  };

  if (justifyCenter) {
    props.justifyContent = 'center';
  }

  return (
    <Grid {...props}>
      {properties.map((property) => (
        <Grid key={property.id} item xs={6} md={4} lg={2}>
          <PropertyCardItem property={property} />
        </Grid>
      ))}
    </Grid>
  );
}
