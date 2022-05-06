import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AvatarDisplay from '../../../../_common/avatar';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import { cellStyle, rowStyle, tableContainer } from '../../styleObj';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { handleLeaveContactForThePropertyPoster } from '../../../../../helpers/api/contact';
import { useParams } from 'react-router-dom';
import { handleFailure } from '../../../../../helpers/api/_helpers';
import { toast } from 'react-toastify';

const leftSz = 2;
const rightSz = 8;

let schema = yup.object({
  notes: yup.string(),
});

export default function LeaveContactDialog({
  fullname,
  avatarSrc,
  onClose,
  open,
}) {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      notes: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      handleLeaveContactForThePropertyPoster({
        notes: values.notes,
        propertyID: id,
      })
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          handleFailure(err);
        });
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
                <Typography>{user.contact_email}</Typography>
              </Box>
            </Box>

            <Box sx={{ ...rowStyle, height: '3.6rem' }}>
              <Typography flex={leftSz} fontWeight='bold' sx={cellStyle}>
                SĐT liên hệ
              </Typography>
              <Box flex={rightSz} sx={{ ...cellStyle, display: 'inline' }}>
                <Typography>{user.contact_number}</Typography>
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
