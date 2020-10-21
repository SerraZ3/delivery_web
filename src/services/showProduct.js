import api from './api';

const getProduct = async (id) => {
  const response = await api.get(`/admin/products/${id}`);
  return response.data;
};

export default getProduct;
