import axios from "axios";

interface serviceCreate {
  servicename: string;
  price: number;
}

interface serviceRegister {
  idManicurista: string;
  manicuristaName: string;
  idService: string;
  serviceName: string;
  cliente: string;
  authorized: boolean;
}

const API = 'http://localhost:3000/api'
export const serviceRequest = (service: serviceCreate) => axios.post(`${API}/service`, service)
export const fetchServicesFromAPI = () => axios.get(`${API}/services`)
export const getServiceByIdFromAPI = (id: string) => axios.get(`${API}/service/${id}`)
export const deleteServiceFromAPI = (id: string) => axios.delete(`${API}/service/${id}`)

export const registerService = (service: serviceRegister) => axios.post(`${API}/serviceLog`, service)
export const getServiceLogsById = (id: string) => axios.get(`${API}/serviceLog/manicurista/${id}`)
export const getAllServicesLog = () => axios.get(`${API}/serviceLog/admin`)
export const approveServices = (id: string) => axios.put(`${API}/services/approve/${id}`)
export const getApprovedServicesLog = () => axios.get(`${API}/services/getApprove`)