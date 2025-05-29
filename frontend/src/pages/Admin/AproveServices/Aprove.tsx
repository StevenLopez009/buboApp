import { useEffect } from "react";
import { useService } from "../../../context/ServiceContext";


const Aprove = () => {
  const { getAllServices,serviceLogs } = useService(); 

  useEffect(() => {
      getAllServices()
    }, []);

  return (
    <div>
      <h1>Aprove Services</h1>
      <ul>
      {serviceLogs.map((log, index) => (
        <li key={index}>
          <p>Manicurista: {log.manicuristaName}</p>
          <p>Servicio: {log.serviceName}</p>
          <p>Autorizado: {log.authorized ? "Sí" : "No"}</p>
          <button>Autorizar</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Aprove;