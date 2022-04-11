import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AvatarDisplay from '../../../../_common/avatar';
import { Box, Button, Typography } from '@mui/material';
import { cellStyle, rowStyle, tableContainer } from '../../styleObj';
import { blue } from '@mui/material/colors';
import { toast } from 'react-toastify';

const leftSz = 3;
const rightSz = 7;

export default function ViewContactDialog({
  fullname,
  avatarSrc,
  contact_email,
  contact_number,
  onClose,
  selectedValue,
  open,
}) {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const copyToClipboard = (txt) => {
    navigator.clipboard.writeText(txt).then(() => {
      toast.success('Sao chép thành công');
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
      <Box sx={{ px: 4, py: 0.5 }}>
        <DialogTitle>Thông tin liên hệ</DialogTitle>

        <AvatarDisplay
          fullname={fullname}
          avatarSrc={avatarSrc}
          containerStyle={{ flexDirection: 'row' }}
        />
        <Box sx={tableContainer}>
          <Box sx={rowStyle}>
            <Typography flex={leftSz} fontWeight='bold' sx={cellStyle}>
              Email
            </Typography>
            <Box flex={rightSz} sx={cellStyle}>
              <Typography
                ml={0.5}
                display='inline'
                fontWeight='bold'
                fontSize='inherit'
              >
                {contact_email}
              </Typography>
              {contact_email && (
                <Button
                  variant='text'
                  sx={{ textTransform: 'lowercase' }}
                  disabled={!contact_email}
                  onClick={() => copyToClipboard(contact_email)}
                >
                  <Typography
                    fontWeight='bold'
                    fontSize='inherit'
                    color={blue[800]}
                  >
                    (sao chép)
                  </Typography>
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={rowStyle}>
            <Typography flex={leftSz} fontWeight='bold' sx={cellStyle}>
              SĐT
            </Typography>
            <Box flex={rightSz} sx={{ ...cellStyle, display: 'inline' }}>
              <Typography
                ml={0.5}
                display='inline'
                fontWeight='bold'
                fontSize='inherit'
              >
                {contact_number}
              </Typography>
              {contact_number && (
                <Button
                  variant='text'
                  sx={{ textTransform: 'lowercase' }}
                  disabled={!contact_number}
                  onClick={() => copyToClipboard(contact_number)}
                >
                  <Typography
                    fontWeight='bold'
                    fontSize='inherit'
                    color={blue[800]}
                  >
                    (sao chép)
                  </Typography>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
