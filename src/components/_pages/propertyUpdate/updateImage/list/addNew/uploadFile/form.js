// Split form from dialog to make it not remember previous data
import React, { useState } from 'react';
import {
  //
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

import { ACCEPT_IMAGE_MIMETYPES } from '../../../../../../../helpers/constants';
import useUploadImage from '../../../_hooks/useUpload';

// Leave rooms for later additional types
const acceptFileMimetypes = ACCEPT_IMAGE_MIMETYPES;

export default function UploadImageForm({ onSuccess = () => {} }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadImage = useUploadImage();

  const isNoFileSelected = selectedFile == null;

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    if (!newFile || !acceptFileMimetypes.includes(newFile.type)) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(newFile);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append('image', selectedFile);
    setIsSubmitting(true);
    uploadImage(formData, onSuccess, () => {
      setIsSubmitting(false);
    });
  };

  return (
    <>
      <Box my={1}>
        <TextField
          focused
          readOnly
          fullWidth
          id='image-file'
          name='image-file'
          type='file'
          onChange={handleFileChange}
          label='File ảnh'
          error={isNoFileSelected}
          helperText='Chỉ chấp nhận .png|.jpeg|.jpg'
        />
      </Box>
      <Button
        fullWidth
        disabled={isNoFileSelected || isSubmitting}
        type='submit'
        variant='contained'
        color='primary'
        onClick={onFileUpload}
      >
        {isSubmitting ? <CircularProgress color='inherit' /> : 'Thêm'}
      </Button>
      <FileDataDetail file={selectedFile} />
    </>
  );
}

const FileDataDetail = ({ file }) => {
  if (file) {
    return (
      <Box my={1}>
        <Typography variant='caption'>Chi tiết file</Typography>
        <Typography variant='subtitle2'>Tên file: {file.name}</Typography>
        <Typography variant='subtitle2'>Loại file: {file.type}</Typography>
      </Box>
    );
  }

  return <div></div>;
};
