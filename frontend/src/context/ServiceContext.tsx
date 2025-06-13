import { createContext, useContext, useState } from "react";
import { serviceRequest, fetchServicesFromAPI , deleteServiceFromAPI,getServiceLogsById, getAllServicesLog, getServiceByIdFromAPI, approveServices, editServices, getAnotherServicesApi, approveAnotherService, deleteAnotherServiceAPI, deleteServiceLogAPI, getAnotherServicesByRolAPI } from "../api/service";
import { registerService as registerServiceAPI } from "../api/service";

interface Service {
  id: number;
  servicename: string;
  price: number;
}

interface ServiceCreate {
  servicename: string;
  price: number;
}

interface ServiceRegister {
  id:string,
  idManicurista: string;
  manicuristaName: string;
  idService: string;
  serviceName: string;
  cliente: string;
  authorized: boolean;
}

interface ServiceEdit {
  id: string;
  servicename?: string;
  price?: number;
}

interface AotherServiceRegister {
  id:string,
  idManicurista: string;
  manicuristaName: string;
  anotherServiceName: string;
  cliente: string;
  authorized: boolean;
}


interface ServiceContextType {
  services: Service[];
  anotherServicesState: AotherServiceRegister[]; 
  createService: (data: ServiceCreate) => Promise<void>;
  getServices: () => Promise<void>;
  getServiceById:(id: string) => Promise<void>;
  editService: (data:ServiceEdit) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  registerService:(data: ServiceRegister) => Promise<void>;
  getServicesByRol: (id: string) => Promise<void>;
  getAnotherServicesByRol: (id: string) => Promise<void>;
  getAllServices:()=> Promise<void>;
  approveService:(id:string)=> Promise<void>;
  approveAnotherServices:(id:string)=> Promise<void>;
  getAnotherServices:()=> Promise<void>;
  deleteAnotherService: (id: string) => Promise<void>;
  deleteServiceLog: (id: string) => Promise<void>;
  serviceLogs: ServiceRegister[];
  error: string | null;
  loading: boolean;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};

export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceLogs, setServiceLogs] = useState<ServiceRegister[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [anotherServicesState, setAnotherServicesState] = useState([]);

  const createService = async (data: ServiceCreate) => {
    try {
      setLoading(true);
      const res = await serviceRequest(data);
      setServices((prev) => [...prev, res.data]);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Error al crear servicio");
    } finally {
      setLoading(false);
    }
  };

  const getServices = async () => {
    try {
      setLoading(true);
      const res = await fetchServicesFromAPI ();
      setServices(res.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Error al obtener servicios");
    } finally {
      setLoading(false);
    }
  }

  const getServiceById = async ()=>{
    try {
      setLoading(true)
      await getServiceByIdFromAPI()
      setError(null);
    } catch (error) {
      console.error(error);
    setError("Error al obtener el servicio por id");
    }
  }

  const editService= async(data: ServiceEdit)=>{
    try {
      setLoading(true);
      const res = await editServices(data)
       setServices((prev) =>
      prev.map((service) =>
        service.id === parseInt(data.id)
          ? { ...service, ...res.data.service }
          : service
      )
    );
    setError(null);
    } catch (error) {
    console.error(error);
    setError("Error al editar el servicio");
  } finally {
    setLoading(false);
  }
  }


  const deleteService = async (id: string) => {
    try {
      setLoading(true);
      await deleteServiceFromAPI(id);
      setServices((prev) => prev.filter((service) => service.id !== parseInt(id)));
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Error al eliminar servicio");
    } finally {
      setLoading(false);
    }
   }

  const registerService = async (data: ServiceRegister) => {
  try {
    setLoading(true);
    await registerServiceAPI(data);
    setError(null);
  } catch (error) {
    console.error(error);
    setError("Error al registrar el servicio");
  } finally {
    setLoading(false);
  }
};

  const getServicesByRol = async (id: string) => {
    try {
      setLoading(true);
      const res = await getServiceLogsById(id);
      setServiceLogs(res.data); 
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error al obtener los servicios por rol");
    } finally{
      setLoading(false);
    }
  }

  
  const getAnotherServicesByRol = async (id: string) => {
  try {
    setLoading(true);
    const res = await getAnotherServicesByRolAPI(id);
    setAnotherServicesState(res.data); 
    setError(null);
  } catch (error) {
    console.error(error);
    setError("Error al obtener los servicios adicionales por rol");
  } finally{
    setLoading(false);
  }
  }

   const getAllServices = async () => {
    try {
      setLoading(true);
      const res = await getAllServicesLog();
      setServiceLogs(res.data); 
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error al obtener los servicios");
    } finally{
      setLoading(false);
    }
  }

  const approveService = async (id:string) => {
    try {
      await approveServices(id)
      getAllServices();
    } catch (error) {
      console.error("Error approving service:", error);
    }
  };

  const approveAnotherServices = async (id:string) => {
    try {
      await approveAnotherService(id)
      getAnotherServices();
    } catch (error) {
      console.error("Error approving another service:", error);
    }
  }

  const getAnotherServices = async () => {
  try {
    const { data } = await getAnotherServicesApi(); 
    setAnotherServicesState(data);
  } catch (error) {
    console.error("Error al obtener servicios adicionales", error);
  }
};

  const deleteAnotherService = async (id: string) => {
  try {
    setLoading(true);
    await deleteAnotherServiceAPI(id);
    setAnotherServicesState((prev) => prev.filter((service) => service.id !== parseInt(id)));
    setError(null);
  } catch (err: any) {
    console.error(err);
    setError("Error al eliminar servicio adicional");
  } finally {
    setLoading(false);
  }
  };

 const deleteServiceLog = async (id: string) => {
  try {
    setLoading(true);
    await deleteServiceLogAPI(id); // Usa la API correcta
    setServiceLogs((prev) => prev.filter((log) => log.id !== parseInt(id)));
    setError(null);
  } catch (err: any) {
    console.error(err);
    setError("Error al eliminar el registro del servicio");
  } finally {
    setLoading(false);
  }
};

  return (
    <ServiceContext.Provider value={{ 
      services,
      serviceLogs, 
      anotherServicesState,
      createService, 
      getServices,
      getServiceById,
      editService, 
      deleteService,
      registerService,
      getServicesByRol, 
      getAnotherServicesByRol,
      getAllServices,
      approveService,
      approveAnotherServices, 
      getAnotherServices,
      deleteAnotherService,
      deleteServiceLog,
      error, 
      loading }}>
      {children}
    </ServiceContext.Provider>
  );
};
