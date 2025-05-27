import { useEffect } from "react";
import { useService } from "../../../context/ServiceContext";
import { useAuth } from "../../../context/AuthContext";

const ServicesDone = () => {
  const { getServicesByRol, serviceLogs, services } = useService(); // <-- Aquí dentro
  const { user } = useAuth();

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
          {serviceLogs.map((log, index) => {
            const serviceName =
              services.find((s) => s.id === parseInt(log.idService))?.servicename ||
              "Servicio desconocido";
            return (
              <li key={index}>
                Cliente: {log.cliente} | Servicio: {serviceName} | Autorizado:{" "}
                {log.authorized ? "Sí" : "No"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ServicesDone;
