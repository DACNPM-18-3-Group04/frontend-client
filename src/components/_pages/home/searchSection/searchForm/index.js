import {
  MenuItem,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Autocomplete,
} from '@mui/material';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import PropertyTypes from '../../../../../helpers/constants/propertyTypes';
import { useSelector } from 'react-redux';
import { selectPropertyLocation } from '../../../../../redux/slices/propertyLocation';

const validationSchema = yup.object({
  keyword: yup.string('Nhập từ khóa'),
  minPrice: yup.lazy((value) =>
    value === '' ? yup.string() : yup.number().min(0, 'Tối thiểu là 0'),
  ),
  maxPrice: yup.lazy((value) =>
    value === '' ? yup.string() : yup.number().min(0, 'Tối thiểu là 0'),
  ),
  minArea: yup.lazy((value) =>
    value === '' ? yup.string() : yup.number().min(0, 'Tối thiểu là 0'),
  ),
  maxArea: yup.lazy((value) =>
    value === '' ? yup.string() : yup.number().min(0, 'Tối thiểu là 0'),
  ),
});

const INITIAL_DISTRICT = { id: '', name: '(Tất cả)' };

export default function SearchForm() {
  const history = useHistory();
  const propertyLocations = useSelector(selectPropertyLocation);
  const districts = [...propertyLocations.districts] || [];
  districts.unshift(INITIAL_DISTRICT);

  const handleSubmit = (formValues) => {
    let query = [];
    console.log(formValues);
    for (const [key, value] of Object.entries(formValues)) {
      if (key === 'district') {
        if (value.id === INITIAL_DISTRICT.id) {
          continue;
        }
        query.push(`${key}=${value.id}`);
        continue;
      }
      if (value && value !== '') {
        query.push(`${key}=${value}`);
      }
    }

    const queryStr = query.join('&');
    console.log(queryStr);
    history.push({
      pathname: '/properties',
      search: queryStr,
    });
  };

  const formik = useFormik({
    initialValues: {
      keyword: '',
      propertyType: PropertyTypes.DEFAULT,
      district: INITIAL_DISTRICT,
      minPrice: 0,
      maxPrice: '',
      minArea: '',
      maxArea: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='keyword'
            name='keyword'
            label='Tìm kiếm'
            margin='dense'
            value={formik.values.keyword}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.keyword)}
            helperText={formik.errors.keyword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button type='submit' color='primary' variant='contained'>
                    Tìm kiếm
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            fullWidth
            id='propertyType'
            name='propertyType'
            label='Thuê / Bán'
            margin='dense'
            select
            value={formik.values.propertyType}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.propertyType)}
            helperText={formik.errors.propertyType}
          >
            <MenuItem value={PropertyTypes.SELL}>Bán</MenuItem>
            <MenuItem value={PropertyTypes.LENT}>Thuê</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={3} xs={12}>
          <Autocomplete
            fullWidth
            value={formik.values.district}
            onChange={(e, value) => formik.setFieldValue('district', value)}
            options={districts}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) =>
              `${option.name}${option.province ? `, ${option.province}` : ''}`
            }
            renderInput={(params) => (
              <TextField {...params} margin='dense' label='Vị trí' />
            )}
          />
        </Grid>
        <Grid item container md={3} xs={12} spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='minPrice'
              name='minPrice'
              label='Giá thấp nhất'
              margin='dense'
              type='number'
              value={formik.values.minPrice}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.minPrice)}
              helperText={formik.errors.minPrice}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='maxPrice'
              name='maxPrice'
              label='Giá cao nhất'
              margin='dense'
              type='number'
              value={formik.values.maxPrice}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.maxPrice)}
              helperText={formik.errors.maxPrice}
            />
          </Grid>
        </Grid>
        <Grid item container md={3} xs={12} spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='minArea'
              name='minArea'
              label='Diện tích thấp nhất'
              margin='dense'
              type='number'
              value={formik.values.minArea}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.minArea)}
              helperText={formik.errors.minArea}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='maxArea'
              name='maxArea'
              label='Diện tích lớn nhất'
              margin='dense'
              type='number'
              value={formik.values.maxArea}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.maxArea)}
              helperText={formik.errors.maxArea}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
