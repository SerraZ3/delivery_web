import api from './api';

const getRolePermission = async () => {
  const response = await api.get('/auth/role-permission');
  return response.data.data;
};

export default getRolePermission;
