import api from './api';

const getOrders = async (
  page = 1,
  limit = 5,
  name = '',
  way = '',
  order = '',
) => {
  const response = await api.get('/admin/orders', {
    params: {page, limit, name, way, order},
  });
  return response.data;
};

export default getOrders;
