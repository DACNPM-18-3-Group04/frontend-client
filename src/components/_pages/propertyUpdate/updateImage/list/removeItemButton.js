import { useState } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import useRemoveImage from '../_hooks/useRemove';

export default function ListItemRemoveButton({ id = '' }) {
  const removeImage = useRemoveImage();
  const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    setLoading(true);
    removeImage(
      id,
      () => {},
      () => {},
      () => {
        setLoading(false);
      },
    );
  };

  return (
    <Tooltip title={loading ? 'Đang tải' : 'Gỡ hình'}>
      <IconButton
        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
        onClick={handleRemove}
      >
        {loading ? <CircularProgress size={24} /> : <DeleteIcon />}
      </IconButton>
    </Tooltip>
  );
}
