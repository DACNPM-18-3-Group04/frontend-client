import { useEffect, useState } from 'react';
import PropertyAPI from '../../../../helpers/api/property';
import formatErrorResponse from '../../../../helpers/utils/formatErrorResponse';
import PropertyTypes from '../../../../helpers/constants/propertyTypes';
import Loader from '../../../_common/loader';
import ErrorPage from '../../../_common/errorPage';

import UpdatePropertyForm from '../updateForm';
import formatResponseData from './helper';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/slices/user';
import PropertyStatus from '../../../../helpers/constants/propertyStatus';

export default function PropertyUpdateContainer({
  //
  propertyId = null,
}) {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (propertyId === null) {
      return;
    }

    PropertyAPI.getPropertyInfo({ propertyID: propertyId })
      .then((result) => {
        if (!result.data.success) {
          throw new Error(result.data.message);
        }
        const data = result.data.data;
        console.log(data);
        const property = formatResponseData(data.property);

        if (!property.author_id || property.author_id !== user.id) {
          throw new Error('Không có quyền truy cập thực hiện hành động này');
        }

        setProperty(property);
      })
      .catch((error) => {
        let res = formatErrorResponse(error);
        setError(res);
        setProperty({});
      })
      .finally(() => {
        setLoading(false);
      });
  }, [propertyId, user.id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage message={error.message} minHeight='50vh' />;
  }

  return (
    <>
      <UpdatePropertyForm
        propertyId={property.id || ''}
        title={property.title || ''}
        description={property.description || ''}
        address={property.address || ''}
        type={property.type || PropertyTypes.DEFAULT}
        district_id={property.district_id || ''}
        price={property.price || 0}
        area={property.area || 0}
        propertyStatus={property.propertyStatus || PropertyStatus.DEFAULT}
        images={property.images || []}
      />
    </>
  );
}
