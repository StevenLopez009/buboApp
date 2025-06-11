import axios from 'axios'

interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister {
  username: string;
  email: string;
  password: string;
  contact: string;
  rh: string;
  eps: string;
  age: string;
  rol: string;
  image?: string;
}

const API = 'http://localhost:3000/api'
export const loginRequest = (user: UserLogin) => axios.post(`${API}/login`, user);
export const RegisterRequest = (user: UserRegister) => axios.post(`${API}/register`, user)
export const getUsersFromAPI = () => axios.get(`${API}/users`);
export const deleteUserFromAPI = (id: string) => axios.delete(`${API}/users/${id}`);