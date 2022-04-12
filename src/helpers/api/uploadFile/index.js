import api, { getAuthConfig } from '..';
// import { getAuthConfig } from '..';
const baseURL = '/uploadfile';

export const uploadFile = async (file) => {
  const config = getAuthConfig();
  return api.post(`${baseURL}`, file, config);
};

const UploadFileAPI = {
  uploadFile,
};

export default UploadFileAPI;
