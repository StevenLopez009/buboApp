import React, { useEffect } from 'react';
import { useService } from '../../context/ServiceContext';

const ServiceForm: React.FC = () => {
  const {services, getServices } = useService();

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div>
      <form action="">
        <select name="" id="">
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.servicename}
            </option>
          ))}
        </select>
        <input type="text" name="" id="" placeholder='cliente'/>
        <button>Registrar</button>
      </form>
    </div>
  );
};

export default ServiceForm;