import { useEffect } from "react";
import { useService } from "../../../context/ServiceContext";

const Aprove = () => {
  const { getAllServices, serviceLogs, approveService } = useService(); 

  useEffect(() => {
    getAllServices();
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
    </div>
  );
};

export default Aprove;
