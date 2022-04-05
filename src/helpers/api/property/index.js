import api from '..'

const baseURL = 'property'

export const createProperty = async (propertyInfo) => {
    return api.post(`${baseURL}/`, propertyInfo)
}

const PropertyAPI = {
    createProperty
}

export default PropertyAPI;