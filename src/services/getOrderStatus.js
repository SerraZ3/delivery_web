import api from './api';

const getOrderStatus = async (page = 1, limit = 10, name = '') => {
  const response = await api.get('/admin/order-status', {
    params: {page, limit, name},
  });
  return response.data;
};

export default getOrderStatus;
