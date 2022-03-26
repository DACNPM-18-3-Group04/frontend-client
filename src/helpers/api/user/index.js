import api from '..';
// import { getAuthConfig } from '..';
const baseURL = '/user';

export const handleSignUp = async (userInfo) => {
  return api.post(`${baseURL}/register`, userInfo);
};

export const handleActivation = async (activation_code = '') => {
  const endpoint = '/activation';
  const data = {
    activation: activation_code,
  }
  return api.post(`${baseURL}${endpoint}`, data);
}

const UserAPI = {
  handleSignUp,
  handleActivation,
};

export default UserAPI;
