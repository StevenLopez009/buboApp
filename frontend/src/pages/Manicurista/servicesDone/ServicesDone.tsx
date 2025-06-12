import { useEffect } from "react";
import { useService } from "../../../context/ServiceContext";
import { useAuth } from "../../../context/AuthContext";
import "./ServicesDone.css";

const ServicesDone = () => {
  const { getServicesByRol, serviceLogs, loading, error } = useService(); 
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      getServicesByRol(user.id);
    }
  }, [user]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="services-container">
      <h2>Servicios Registrados</h2>
      {serviceLogs.length === 0 ? (
        <p>No hay servicios registrados aún.</p>
      ) : (
        <ul className="services-list">
          {serviceLogs.map((log) => (
            <li className="service-item">
              <div className="service-details">
                <p><strong>Cliente:</strong> {log.cliente}</p>
                <p><strong>Servicio:</strong> {log.serviceName}</p>
                <p><strong>Realizado por:</strong> {log.manicuristaName}</p>
                <p><strong>Estado:</strong> 
                  <span className={log.authorized ? "status-approved" : "status-pending"}>
                    {log.authorized ? "Aprobado" : "Pendiente"}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServicesDone;
