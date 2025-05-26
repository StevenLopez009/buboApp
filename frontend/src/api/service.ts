import axios from "axios";

interface serviceCreate {
  servicename: string;
  price: number;
}

const API = 'http://localhost:3000/api'
export const serviceRequest = (service: serviceCreate) => axios.post(`${API}/service`, service)
export const fetchServicesFromAPI = () => axios.get(`${API}/services`)