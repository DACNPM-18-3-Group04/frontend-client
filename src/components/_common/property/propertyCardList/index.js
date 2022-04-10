import {
  Grid,
  //
} from '@mui/material';

import PropertyCardItem from '../propertyCardItem';

export default function PropertyCardList({ properties = [] }) {
  return (
    <Grid container spacing={2} justifyContent='center'>
      {properties.map((property) => (
        <Grid key={property.id} item xs={6} md={4} lg={2}>
          <PropertyCardItem property={property} />
        </Grid>
      ))}
    </Grid>
  );
}
