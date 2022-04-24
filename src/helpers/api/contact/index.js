import api, { getAuthConfig } from '..';
const baseURL = '/contact';

export const handleLeaveContactForThePropertyPoster = ({
  notes,
  propertyID,
}) => {
  return api.post(
    `${baseURL}/send`,
    {
      notes,
      propertyID,
    },
    getAuthConfig(),
  );
};

export const handleGetListContact = () =>
  api.get(`${baseURL}/list`, getAuthConfig());

const ContactAPI = {
  handleLeaveContactForThePropertyPoster,
  handleGetListContact,
};

export default ContactAPI;
