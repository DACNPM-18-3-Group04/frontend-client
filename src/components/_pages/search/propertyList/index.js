import { Stack } from '@mui/material';
import PropertyListItem from './propertyListItem';

export default function PropertyList({ properties = [] }) {
  return (
    <Stack direction='column' spacing={2}>
      {properties.map((property) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
    </Stack>
  );
}
