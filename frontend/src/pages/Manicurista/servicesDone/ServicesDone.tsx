import { useEffect } from "react";
import { useService } from "../../../context/ServiceContext";
import { useAuth } from "../../../context/AuthContext";

const ServicesDone = () => {
  const {getServicesByRol, serviceLogs } = useService();
  const {user}= useAuth();

  useEffect(() => {
      if (user?.id) {
        getServicesByRol(user.id); 
      }
    }, [user]);

  return (
     <div>
      <h2>Servicios Registrados</h2>
      {serviceLogs.length === 0 ? (
        <p>No hay servicios registrados aún.</p>
      ) : (
        <ul>
          {serviceLogs.map((log, index) => (
            <li key={index}>
              Cliente: {log.cliente} | Servicio ID: {log.idService} | Autorizado:
              {log.authorized ? "Sí" : "No"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServicesDone;