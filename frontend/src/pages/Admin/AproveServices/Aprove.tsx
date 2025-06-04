import { useEffect } from "react";
import { useService } from "../../../context/ServiceContext";

const Aprove = () => {
  const { getAllServices, getAnotherServices, serviceLogs, anotherServicesState, approveService, approveAnotherServices } = useService();


  useEffect(() => {
    getAllServices();
    getAnotherServices();
  }, []);

  return (
    <div>
      <h1>Aprobar Servicios</h1>
      <ul>
        {serviceLogs.map((log, index) => (
          <li key={index}>
            <p>Manicurista: {log.manicuristaName}</p>
            <p>Servicio: {log.serviceName}</p>
            <p>Autorizado: {log.authorized ? "Sí" : "No"}</p>
            {!log.authorized && (
              <button onClick={() => approveService(log.id)}>
                Autorizar
              </button>
            )}
          </li>
        ))}
      </ul>
      <h1>Aprobar otros servicios</h1>
       <ul>
        {anotherServicesState.map((log, index) => (
          <li key={index}>
            <p>Manicurista: {log.manicuristaName}</p>
            <p>Servicio: {log.anotherServiceName}</p>
            <p>Autorizado: {log.authorized ? "Sí" : "No"}</p>
            {!log.authorized && (
              <button onClick={() => approveAnotherServices(log.id)}>
                Autorizar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Aprove;
