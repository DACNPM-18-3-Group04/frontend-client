import { useHistory } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../helpers/error';

import UserAPI from '../../../helpers/api/user';

const validationSchema = yup.object({
  email: yup
    .string('Nhập email')
    .email('Email không hợp lệ')
    .required('Bắt buộc'),
});

export default function FormPasswordForgot() {
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
  });

  const history = useHistory();

  const handleSubmit = async (formValues) => {
    const redirect = '/';
    const values = {
      ...formValues,
      username: formValues.email,
    };

    setFormStates({ ...formStates, isSubmitting: true });
    UserAPI.handleForgotPassword(values)
      .then(() => {
        toast.success('Thành công, vui lòng check email của bạn');
        history.push(redirect);
      })
      .catch((err) => {
        toast.error(`Lỗi - ${getErrorMessage(err)}`);
        setFormStates({ ...formStates, isSubmitting: false });
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        disabled={formStates.isSubmitting}
        autoFocus
        id='email'
        name='email'
        label='Email tài khoản'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.email)}
        helperText={formik.errors.email || ' '}
      />
      <LoadingButton
        loading={formStates.isSubmitting}
        variant='contained'
        fullWidth
        type='submit'
      >
        Reset
      </LoadingButton>
    </form>
  );
}
