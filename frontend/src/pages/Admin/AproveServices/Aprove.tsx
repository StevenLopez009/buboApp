import { useEffect } from "react";
import { useService } from "../../../context/ServiceContext";
import "./Aprove.css";

const Aprove = () => {
  const {
    getAllServices,
    getAnotherServices,
    serviceLogs,
    anotherServicesState,
    approveService,
    approveAnotherServices,
    deleteAnotherService,
    deleteServiceLog,
  } = useService();

  useEffect(() => {
    getAllServices();
    getAnotherServices();
  }, []);

  const unauthorizedServiceLogs = serviceLogs.filter((log) => !log.authorized);
  const unauthorizedAnotherServices = anotherServicesState.filter((log) => !log.authorized);
  const handleDeleteAnotherService = (id: string) => {
    deleteAnotherService(id);
  };
  const handleDeleteServiceLog = (id: string) => {
    deleteServiceLog(id);
  };

  return (
    <div className="approve">
      <h1 className="approve__title">Aprobar</h1>
      <ul className="approve__list">
        {unauthorizedServiceLogs.map((log) => (
          <li key={log.id} className="approve__item">
            <p className="approve__text">Manicurista: {log.manicuristaName}</p>
            <p className="approve__text">Servicio: {log.serviceName}</p>
            <button
              className="approve__button"
              onClick={() => approveService(log.id)}
            >
              Autorizar
            </button>
            <button  onClick={() => handleDeleteServiceLog(log.id)} className="approve__button">Denegar</button>
          </li>
        ))}
      </ul>

      <ul className="approve__list">
        {unauthorizedAnotherServices.map((log) => (
          <li key={log.id} className="approve__item">
            <p className="approve__text">Manicurista: {log.manicuristaName}</p>
            <p className="approve__text">Servicio: {log.anotherServiceName}</p>
            <button
              className="approve__button"
              onClick={() => approveAnotherServices(log.id)}
            >
              Autorizar
            </button>
             <button onClick={() => handleDeleteAnotherService(log.id)} className="approve__button">Denegar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Aprove;

