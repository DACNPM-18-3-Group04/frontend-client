import api, { getAuthConfig } from '..';

const baseURL = '/auth';

export const selfMakeSignIn = async (userInfo) => {
  return api.post(`${baseURL}/sign-in`, userInfo);
};

export const signOut = async () => {
  const config = getAuthConfig();
  return api.post(`${baseURL}/sign-out`, {}, config);
};

const AuthAPI = {
  selfMakeSignIn,
  signOut,
};

export default AuthAPI;
