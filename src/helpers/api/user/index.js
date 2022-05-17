import api, { getAuthConfig } from '..';
// import { getAuthConfig } from '..';
const baseURL = '/user';

export const handleSignUp = async (userInfo) => {
  return api.post(`${baseURL}/register`, userInfo);
};

export const handleActivation = async (activation_code = '') => {
  const endpoint = '/activation';
  const data = {
    activation: activation_code,
  };
  return api.post(`${baseURL}${endpoint}`, data);
};

export const handleUpdateUserAccount = ({
  email,
  fullname,
  contact_email,
  contact_number,
  password,
  newPassword,
}) => {
  const config = getAuthConfig();
  return api.post(
    `${baseURL}/update`,
    { email, fullname, contact_email, contact_number, password, newPassword },
    config,
  );
};

export const getUserInfo = () => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/info`, config);
};

export const handleChangeWishedState = (property_id) => {
  return api.post(`${baseURL}/wishlist`, { property_id }, getAuthConfig());
};

export const verifyResetCode = async (ot_code = '', uid = '') => {
  const endpoint = '/password/verify-reset';
  const params = {
    userid: uid,
    otcode: ot_code,
  };
  return api.get(`${baseURL}${endpoint}`, {
    params: params,
  });
};

export const handleForgotPassword = async (formData = {}) => {
  const endpoint = '/password/forgot';
  const data = {
    email: formData.email,
    username: formData.email,
  };
  return api.post(`${baseURL}${endpoint}`, data);
};

export const handleResetPassword = async (
  reset_id = '',
  uid = '',
  formData = {},
) => {
  const endpoint = '/password/reset';
  const data = {
    userid: uid,
    otcode: reset_id,
    ...formData,
  };
  return api.post(`${baseURL}${endpoint}`, data);
};

const UserAPI = {
  handleSignUp,
  handleActivation,
  verifyResetCode,
  handleForgotPassword,
  handleResetPassword,
};

export default UserAPI;
