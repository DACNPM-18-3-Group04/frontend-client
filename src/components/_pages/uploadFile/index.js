/* eslint-disable no-unused-vars */
import UploadFileAPI from '../../../helpers/api/uploadFile/index';

import React, {
  // Component,
  useState,
} from 'react';
import {
  // Container,
  Dialog,
} from '@mui/material';
// import { DialogProps } from '@mui/material/Dialog';

function UploadFile(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleClose = () => {};

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
    UploadFileAPI.uploadFile(formData);
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

  return (
    <Dialog
      open={props.open}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={handleClose}
    >
      <div>
        <h3>File Upload</h3>
        <div>
          <input type='file' onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>
        </div>
        {fileData()}
      </div>
    </Dialog>
  );
}

export default UploadFile;
