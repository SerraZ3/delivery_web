import api from './api';

const showProductCategories = async (id) => {
  const response = await api.get(`/admin/product-categories/${id}`);
  return response.data;
};

export default showProductCategories;
