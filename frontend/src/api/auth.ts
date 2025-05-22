import axios from 'axios'

interface UserLogin {
  email: string;
  password: string;
}

const API = 'http://localhost:3000/api'
export const loginRequest = (user: UserLogin) => axios.post(`${API}/login`, user);