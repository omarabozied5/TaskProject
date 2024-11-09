import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post('http://demo5037325.mockable.io/login', {
    email,
    password,
  });
  return response.data;
};

const API_BASE_URL = 'https://fake-json-api.mock.beeceptor.com';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};
