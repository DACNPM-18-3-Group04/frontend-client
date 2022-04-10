import {
  Autocomplete,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropertyAPI from '../../../helpers/api/property';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/user';
import { selectPropertyLocation } from '../../../redux/slices/propertyLocation';

import * as yup from 'yup';
import { useFormik } from 'formik';
import PropertyTypes from '../../../helpers/constants/propertyTypes';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(10, 'Tối thiểu 10 ký tự')
    .max(100, 'Tối đa 100 ký tự')
    .required('Bắt buộc'),
  description: yup.string().max(500, 'Tối đa 500 ký tự').required('Bắt buộc'),
  address: yup.string().max(100, 'Tối đa 100 ký tự').required('Bắt buộc'),
  type: yup.string().required('Bắt buộc'),
  district_id: yup.string().required('Bắt buộc'),
  price: yup.number().moreThan(0, 'Lớn hơn 0').required('Bắt buộc'),
  area: yup.number().moreThan(0, 'Lớn hơn 0').required('Bắt buộc'),
});

const INITIAL_DISTRICT = { id: '', name: '(Chọn)' };

export default function CreateProperty() {
  const user = useSelector(selectUser);
  const propertyLocations = useSelector(selectPropertyLocation);
  const districts = [...propertyLocations.districts] || [];
  districts.unshift(INITIAL_DISTRICT);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    console.log('Submitting');
    PropertyAPI.createProperty(values)
      .then(() => {
        toast.success('Đăng thành công');
        history.push('/');
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      address: '',
      type: PropertyTypes.DEFAULT,
      district_id: '',
      price: 0,
      area: 0,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  if (user && user.isLogin) {
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          {/* // onSubmit={(e) => {
          //   e.preventDefault();
          //   console.log(formik.values);
          // }}
        // > */}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='title'
                name='title'
                label='Tiêu đề'
                margin='dense'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.title)}
                helperText={formik.errors.title || ' '}
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField
                fullWidth
                id='type'
                name='type'
                label='Thuê / Bán'
                margin='dense'
                select
                value={formik.values.type}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.type)}
                helperText={formik.errors.type || ' '}
              >
                <MenuItem value={PropertyTypes.SELL}>Bán</MenuItem>
                <MenuItem value={PropertyTypes.LENT}>Thuê</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                id='price'
                name='price'
                label='Giá (VNĐ)'
                margin='dense'
                type='number'
                value={formik.values.price}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.price)}
                helperText={formik.errors.price || ' '}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                id='area'
                name='area'
                label='Diện tích (m2)'
                margin='dense'
                type='number'
                value={formik.values.area}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.area)}
                helperText={formik.errors.area || ' '}
              />
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  id='address'
                  name='address'
                  label='Địa chỉ (Số nhà, đường, phường)'
                  margin='dense'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.address)}
                  helperText={formik.errors.address || ' '}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Autocomplete
                  fullWidth
                  value={formik.values.district_id}
                  onChange={(e, value) =>
                    formik.setFieldValue('district_id', '' + value.id)
                  }
                  options={districts}
                  isOptionEqualToValue={(option, value) => {
                    // There are warnings, OK for now
                    return '' + option.id === '' + value;
                  }}
                  getOptionLabel={(option) => {
                    if (option.id) {
                      return `${option.name}${
                        option.province ? `, ${option.province}` : ''
                      }`;
                    }

                    if (option.id === '') {
                      return option.name;
                    }

                    const data = districts.find(
                      (district) => '' + district.id === '' + option,
                    );
                    if (!data) return '(Không có)';
                    return `${data.name}${
                      data.province ? `, ${data.province}` : ''
                    }`;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin='dense'
                      label='Quận'
                      error={Boolean(formik.errors.district_id)}
                      helperText={formik.errors.district_id || ' '}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <TextField
            fullWidth
            id='description'
            name='description'
            label='Mô tả'
            margin='dense'
            multiline
            minRows={2}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.description)}
            helperText={formik.errors.description || ' '}
          />

          <Button
            fullWidth
            disabled={loading}
            type='submit'
            variant='contained'
            color='primary'
          >
            {loading ? <CircularProgress color='inherit' /> : 'Đăng'}
          </Button>
        </form>
      </>
    );
  } else {
    history.push('/');
    return <></>;
  }
}
