import { useContext } from 'react';
import { toast } from 'react-toastify';

import { UploadImageContext } from '../context';

import UploadFileAPI from '../../../../../helpers/api/uploadFile';
import formatErrorResponse from '../../../../../helpers/utils/formatErrorResponse';

export default function useRemoveImage() {
  const { propertyId, images, setImages } = useContext(UploadImageContext);

  const localRemoveImage = (imageId = '') => {
    const index = images.findIndex((x) => x.id === imageId);
    if (index === -1) {
      // Not found, ignore
      return;
    }

    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
  };

  const removeImage = (
    imageId,
    onSuccess = () => {},
    onFailure = () => {},
    finalCallback = () => {},
  ) => {
    UploadFileAPI.removePropertyImage(propertyId, imageId)
      .then((res) => {
        // console.log(res.data);
        localRemoveImage(imageId);
        toast.success('Gỡ thành công');
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        const errDetails = formatErrorResponse(err);
        toast.error(errDetails.message);
        onFailure();
      })
      .finally(() => {
        finalCallback();
      });
  };

  return removeImage;
}
