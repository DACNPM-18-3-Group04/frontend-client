/* eslint-disable no-unused-vars */
import {
  //
  Dialog,
  DialogContent,
} from '@mui/material';
import BootstrapDialogTitle from '../../../../../../_common/dialogs/_utils/bootstrapDialogTitle/dialogTitle.component';
import UploadAvatarForm from './form';

function UploadFile({ open, handleClose = () => {} }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <BootstrapDialogTitle onClose={handleClose}>
        Thêm ảnh mới
      </BootstrapDialogTitle>
      <DialogContent>
        {/* Split form from dialog to make it not remember previous data */}
        <UploadAvatarForm onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default UploadFile;
