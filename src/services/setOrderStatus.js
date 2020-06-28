import api from './api';

const setOrderStatus = async (order_id, order_status_id) => {
  const response = await api.put(`/admin/orders/${order_id}`, {
    order_status_id,
  });
  return response.data;
};

export default setOrderStatus;
