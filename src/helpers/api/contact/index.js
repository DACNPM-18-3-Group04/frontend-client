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

export const handleSendReview = (content, rating, propertyID) => {
  return api.post(
    `${baseURL}/review?property_id=${propertyID}`,
    { content, rating },
    getAuthConfig(),
  );
};

export const handleGetListContact = () =>
  api.get(`${baseURL}/list`, getAuthConfig());

export const handleGetReviewsOnPost = (propertyID) =>
  api.get(`${baseURL}/reviews?property_id=${propertyID}`, getAuthConfig());

export const handleReportReview = (propertyID, reviewID, reason) =>
  api.post(
    `${baseURL}/report?property_id=${propertyID}&review_id=${reviewID}`,
    { reason },
    getAuthConfig(),
  );

const ContactAPI = {
  handleLeaveContactForThePropertyPoster,
  handleGetListContact,
};

export default ContactAPI;
