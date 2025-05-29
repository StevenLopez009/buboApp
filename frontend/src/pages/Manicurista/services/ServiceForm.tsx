import React, { useEffect, useState } from 'react';
import { useService } from '../../../context/ServiceContext';
import { useAuth } from '../../../context/AuthContext';

const ServiceForm: React.FC = () => {
  const {services, getServices, registerService } = useService();
  const {user}= useAuth();
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [cliente, setCliente] = useState('');

  useEffect(() => {
    getServices();
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    const service = services.find(s => s.id.toString() === serviceId);
    setSelectedServiceId(serviceId);
    setSelectedServiceName(service?.servicename || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedServiceId || !cliente|| !user) {
      alert('Completa todos los campos');
      return;
    }

    const data = {
      idManicurista: user?.id, 
      manicuristaName: user.username,
      idService: selectedServiceId,
      serviceName: selectedServiceName,
      cliente: cliente,
      authorized: true,
    };

    try {
      await registerService(data);
      alert('Servicio registrado con éxito');
      setSelectedServiceId('');
      setSelectedServiceName('');
      setCliente('');
    } catch (err) {
      alert('Error al registrar el servicio');
    }
  };

  return (
     <div>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedServiceId}
          onChange={handleServiceChange}
        >
          <option value="">Selecciona un servicio</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.servicename}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default ServiceForm;