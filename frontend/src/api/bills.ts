import axios from "axios";

interface Bill {
  brand: string;
  product: string;
  price: number;
  quantity: number;
}

const API = 'http://localhost:3000/api'
export const RegisterBill = (bill: Bill) => axios.post(`${API}/bills`, bill);
export const GetRegisterBill = () => axios.get(`${API}/bills`)