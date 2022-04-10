import { Container, Grid, Box } from '@mui/material';
import useQuery from '../../../helpers/hooks/useQuery';
import PropertySearchContainer from './propertyContainer';
import SearchForm from './searchForm';

export default function PropertySearchPage() {
  const query = useQuery();
  const keyword = query.get('keyword') || '';
  const propertyType = query.get('propertyType') || 'S';
  const districtId = query.get('district') || '';
  const minPrice = query.get('minPrice') || 0;
  const maxPrice = query.get('maxPrice') || '';
  const minArea = query.get('minArea') || '';
  const maxArea = query.get('maxArea') || '';

  return (
    <Container maxWidth='xl'>
      <Box mt={2} />
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12}>
          <SearchForm
            keyword={keyword}
            propertyType={propertyType}
            districtId={districtId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minArea={minArea}
            maxArea={maxArea}
          />
        </Grid>
        <Grid item lg={9} xs={12}>
          <PropertySearchContainer />
        </Grid>
      </Grid>
    </Container>
  );
}
