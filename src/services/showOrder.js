import api from './api';

const getOrders = async (id) => {
  const response = await api.get(`/admin/orders/${id}`);
  return response.data;
};

export default getOrders;
