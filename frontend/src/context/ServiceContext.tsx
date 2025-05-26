import { createContext, useContext, useState } from "react";
import { serviceRequest, fetchServicesFromAPI  } from "../api/service";

interface Service {
  id: number;
  servicename: string;
  price: number;
}

interface ServiceCreate {
  servicename: string;
  price: number;
}

interface ServiceContextType {
  services: Service[];
  createService: (data: ServiceCreate) => Promise<void>;
  getServices: () => Promise<void>;
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

  return (
    <ServiceContext.Provider value={{ services, createService, getServices, error, loading }}>
      {children}
    </ServiceContext.Provider>
  );
};
