import React, { useEffect, useState } from 'react';
import { useService } from '../../../context/ServiceContext';
import { useAuth } from '../../../context/AuthContext';

const ServiceForm: React.FC = () => {
  const {services, getServices, registerService } = useService();
  const {user}= useAuth();
  const [selectedService, setSelectedService] = useState('');
  const [cliente, setCliente] = useState('');

  useEffect(() => {
    getServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !cliente|| !user) {
      alert('Completa todos los campos');
      return;
    }

    const data = {
      idManicurista: user?.id, 
      idService: selectedService,
      cliente: cliente,
      authorized: true,
    };

    try {
      await registerService(data);
      alert('Servicio registrado con éxito');
      setSelectedService('');
      setCliente('');
    } catch (err) {
      alert('Error al registrar el servicio');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
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