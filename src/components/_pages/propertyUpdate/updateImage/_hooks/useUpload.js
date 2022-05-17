import { useContext } from 'react';
import { toast } from 'react-toastify';

import { UploadImageContext } from '../context';

import UploadFileAPI from '../../../../../helpers/api/uploadFile';
import formatErrorResponse from '../../../../../helpers/utils/formatErrorResponse';

export default function useUploadImage() {
  const { propertyId, images, setImages } = useContext(UploadImageContext);

  const localAddImage = (imageId = '', imageLink = '') => {
    setImages([{ id: imageId, image_link: imageLink }, ...images]);
  };

  const uploadImage = (
    formData,
    onSuccess = () => {},
    finalCallback = () => {},
  ) => {
    UploadFileAPI.uploadPropertyImage(propertyId, formData)
      .then((res) => {
        console.log(res.data);
        const data = res.data.data;
        localAddImage(data.id, data.image_link);
        toast.success('cập nhật thành công');
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        const errDetails = formatErrorResponse(err);
        toast.error(errDetails.message);
      })
      .finally(() => {
        finalCallback();
      });
  };

  return uploadImage;
}
