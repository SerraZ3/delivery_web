import api from './api';

const getProductCategories = async (
  page = 1,
  limit = 5,
  name = '',
  way = '',
  order = '',
) => {
  const response = await api.get('/admin/product-categories', {
    params: {page, limit, name, way, order},
  });

  return response.data;
};

export default getProductCategories;
