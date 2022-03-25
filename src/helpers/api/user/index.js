import api from '..';
// import { getAuthConfig } from '..';
const baseURL = '/user';

export const handleSignUp = async (userInfo) => {
  return api.post(`${baseURL}/register`, userInfo);
};

const UserAPI = {
  handleSignUp,
};

export default UserAPI;
