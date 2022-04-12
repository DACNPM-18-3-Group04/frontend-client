/* eslint-disable no-unused-vars */
import UploadFileAPI from '../../../helpers/api/uploadFile/index';

import React, {
  // Component,
  useState,
} from 'react';
import {
  // Container,
  Box,
  Dialog,
  DialogContent,
} from '@mui/material';
import BootstrapDialogTitle from '../../_common/dialogs/_utils/bootstrapDialogTitle/dialogTitle.component';
import { toast } from 'react-toastify';
import formatErrorResponse from '../../../helpers/utils/formatErrorResponse';
// import { DialogProps } from '@mui/material/Dialog';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/slices/user';

function UploadFile({
  open,
  onClose = () => {
    console.log('close');
  },
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const dispatch = useDispatch();

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append('file', selectedFile);
    formData.append('action', 'upload-avatar');
    UploadFileAPI.uploadFile(formData)
      .then((res) => {
        dispatch(updateUser(res.data?.data));
        toast.success('cập nhật thành công');
      })
      .catch((err) => {
        console.log(err);
        const errDetails = formatErrorResponse(err);
        toast.error(errDetails.message);
      });
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={handleClose}
    >
      <BootstrapDialogTitle onClose={handleClose}>
        File Upload
      </BootstrapDialogTitle>
      <DialogContent>
        <input type='file' onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
        {fileData()}
      </DialogContent>
    </Dialog>
  );
}

export default UploadFile;
