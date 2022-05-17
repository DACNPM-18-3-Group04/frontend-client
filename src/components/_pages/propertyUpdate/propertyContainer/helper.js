import PropertyStatus from '../../../../helpers/constants/propertyStatus';
import PropertyTypes from '../../../../helpers/constants/propertyTypes';

export default function formatResponseData(propertyDataFromResponse = {}) {
  const responseData = propertyDataFromResponse;
  const propertyData = {
    author_id: responseData.author_id || null,
    id: responseData.id || 0,
    title: responseData.title || '',
    description: responseData.description || '',
    address: responseData.address || '',
    type: responseData.type || PropertyTypes.DEFAULT,
    district_id: `${responseData.district_id}` || '',
    price: responseData.price || 0,
    area: responseData.area || 0,
    propertyStatus: responseData.status || PropertyStatus.DEFAULT,
    images: responseData.images || [],
  };

  return propertyData;
}
