import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AvatarDisplay from '../../../../_common/avatar';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import { cellStyle, rowStyle, tableContainer } from '../../styleObj';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

const leftSz = 2;
const rightSz = 8;

let schema = yup.object({
  email: yup.string().email('Sai cú pháp email').required('Không thể bỏ trống'),
  tel: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'SĐT không chính xác',
    )
    .required('Không thể bỏ trống'),
  notes: yup.string(),
});

const customInputStyle = {
  '& .MuiInputLabel-root': {
    fontSize: '.85rem',
    lineHeight: '.9rem',
  },
  '& .MuiInput-root': {
    mt: 1.4,
  },
  '& .MuiInput-input': {
    fontSize: '.8rem',
    lineHeight: '.9rem',
  },
  '& .MuiFormHelperText-root': {
    fontSize: '.72rem',
    lineHeight: '.9rem',
  },
};

export default function LeaveContactDialog({
  fullname,
  avatarSrc,
  onClose,
  open,
  handleSubmit,
}) {
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: user.contact_email || '',
      tel: user.contact_number || '',
      notes: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      await handleSubmit({
        contact_email: values.email,
        contact_number: values.tel,
        notes: values.notes,
      });
      onClose();
    },
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
      <Box sx={{ px: 4, pt: 0.5, pb: 2 }}>
        <DialogTitle>Để lại thông tin liên hệ cho</DialogTitle>

        <AvatarDisplay
          fullname={fullname}
          avatarSrc={avatarSrc}
          containerStyle={{ flexDirection: 'row' }}
        />

        <form onSubmit={formik.handleSubmit}>
          <Box sx={tableContainer}>
            <Box sx={{ ...rowStyle, height: '3.6rem' }}>
              <Typography flex={leftSz} fontWeight='bold' sx={cellStyle}>
                Email liên hệ
              </Typography>
              <Box flex={rightSz} sx={cellStyle}>
                <TextField
                  ml={0.5}
                  fullWidth
                  variant='standard'
                  autoFocus={user.id === undefined}
                  name='email'
                  label='Email'
                  value={formik.values.email}
                  helperText={formik.errors.email}
                  onChange={formik.handleChange}
                  size='small'
                  sx={customInputStyle}
                />
              </Box>
            </Box>

            <Box sx={{ ...rowStyle, height: '3.6rem' }}>
              <Typography flex={leftSz} fontWeight='bold' sx={cellStyle}>
                SĐT liên hệ
              </Typography>
              <Box flex={rightSz} sx={{ ...cellStyle, display: 'inline' }}>
                <TextField
                  ml={0.5}
                  fullWidth
                  variant='standard'
                  name='tel'
                  label='SĐT'
                  value={formik.values.tel}
                  helperText={formik.errors.tel}
                  onChange={formik.handleChange}
                  size='small'
                  sx={customInputStyle}
                />
              </Box>
            </Box>
          </Box>

          <Box my={2} display='flex' flexDirection='column'>
            <Typography marginBottom={1.5} fontWeight='bold'>
              Chi tiết
            </Typography>
            <TextField
              name='notes'
              label='Lời nhắn..'
              autoFocus={user.id !== undefined}
              value={formik.values.notes}
              onChange={formik.handleChange}
              helperText={formik.errors.notes}
              multiline
              type='text'
              minRows={3}
              maxRows={4}
            />
          </Box>

          <Box display='flex' justifyContent='flex-end'>
            <Tooltip
              disableHoverListener={user.id !== undefined}
              title='Bạn cần đăng nhập để gửi thông tin liên hệ'
            >
              <span>
                <Button
                  color='info'
                  variant='contained'
                  sx={{ textTransform: 'capitalize' }}
                  disabled={user.id === undefined}
                  type='submit'
                >
                  Xác nhận
                </Button>
              </span>
            </Tooltip>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
}
