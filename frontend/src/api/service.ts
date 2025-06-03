import axios from "axios";

interface serviceCreate {
  servicename: string;
  price: number;
}

interface ServiceEdit {
  id: string;
  servicename?: string;
  price?: number;
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
//crud servicios
export const serviceRequest = (service: serviceCreate) => axios.post(`${API}/service`, service)
export const fetchServicesFromAPI = () => axios.get(`${API}/services`)
export const getServiceByIdFromAPI = (id: string) => axios.get(`${API}/service/${id}`)
export const editServices = (data: ServiceEdit) => axios.put(`${API}/services/${data.id}`, {
  servicename: data.servicename,
  price: data.price
});
export const deleteServiceFromAPI = (id: string) => axios.delete(`${API}/service/${id}`)

//servicios registrados 
export const registerService = (service: serviceRegister) => axios.post(`${API}/serviceLog`, service)
export const getServiceLogsById = (id: string) => axios.get(`${API}/serviceLog/manicurista/${id}`)
export const getAllServicesLog = () => axios.get(`${API}/serviceLog/admin`)
export const approveServices = (id: string) => axios.put(`${API}/services/approve/${id}`)
export const getApprovedServicesLog = () => axios.get(`${API}/services/getApprove`)
export const createAnotherService = (anotherService: serviceCreate) => axios.post(`${API}/anotherService`, anotherService)
export const getAnotherServicesApi = () => axios.get(`${API}/anotherServices`)