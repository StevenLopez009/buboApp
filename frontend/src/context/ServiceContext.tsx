import { createContext, useContext, useState } from "react";
import { serviceRequest, fetchServicesFromAPI , deleteServiceFromAPI,getServiceLogsById } from "../api/service";
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
  idManicurista: string;
  idService: string;
  cliente: string;
  authorized: boolean;
}

interface ServiceContextType {
  services: Service[];
  createService: (data: ServiceCreate) => Promise<void>;
  getServices: () => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  registerService:(data: ServiceRegister) => Promise<void>;
  getServicesByRol: (id: string) => Promise<void>;
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


  return (
    <ServiceContext.Provider value={{ services,serviceLogs, createService, getServices, deleteService,registerService,getServicesByRol, error, loading }}>
      {children}
    </ServiceContext.Provider>
  );
};
