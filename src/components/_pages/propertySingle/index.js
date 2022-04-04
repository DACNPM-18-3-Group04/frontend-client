import { Box, Card, Container, Grid } from '@mui/material';
import PropertyPoster from './poster';
import PropertyDetail from './details';
import ThumbSlider from './thumbs';

export default function PropertySingle() {
  return (
    <Container maxWidth='lg'>
      <Card variant='outlined'>
        <Grid container spacing={2} my={2}>
          <Grid item md={8} xs={12}>
            <Box
              children={
                <ThumbSlider
                  sx={{
                    mx: 2,
                    height: '450px',
                    borderRadius: 1,
                    border: '4px solid #212121',
                  }}
                />
              }
            />
            <Box my={1} children={<PropertyDetail sx={{ mx: 2 }} />} />
          </Grid>
          <Grid item md xs>
            <PropertyPoster sx={{ mx: 2 }} />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
