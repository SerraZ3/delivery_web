import api from './api';

const getProducts = async (
  page = 1,
  limit = 5,
  name = '',
  way = '',
  order = '',
) => {
  const response = await api.get('/admin/products', {
    params: {page, limit, name, way, order},
  });

  return response.data;
};

export default getProducts;
