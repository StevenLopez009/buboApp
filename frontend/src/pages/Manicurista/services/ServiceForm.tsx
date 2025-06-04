import { useEffect, useState } from 'react';
import { useService } from '../../../context/ServiceContext';
import { useAuth } from '../../../context/AuthContext';
import { createAnotherService } from '../../../api/service';

interface ServiceCreate {
  servicename: string;
  price: number;
}

const ServiceForm: React.FC = () => {
  const { services, getServices, registerService } = useService();
  const { user } = useAuth();

  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [anotherService, setAnotherService] = useState(false);
  const [customServiceName, setCustomServiceName] = useState('');
  const [customServicePrice, setCustomServicePrice] = useState('');
  const [cliente, setCliente] = useState('');

  useEffect(() => {
    getServices();
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;

    if (serviceId === 'otro') {
      setAnotherService(true);
      setSelectedServiceId('otro');
      setSelectedServiceName('');
    } else {
      const service = services.find(s => s.id.toString() === serviceId);
      setAnotherService(false);
      setSelectedServiceId(serviceId);
      setSelectedServiceName(service?.servicename || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente || !user || (anotherService && (!customServiceName || !customServicePrice))) {
      alert('Completa todos los campos');
      return;
    }

    if (anotherService) {
      // Crear otro servicio personalizado
      const data = {
        idManicurista: user.id,
        manicuristaName: user.username,
        anotherServiceName: customServiceName,
        price: customServicePrice,
        cliente,
        authorized: true
      };

      try {
        await createAnotherService(data);
        alert('Otro servicio registrado con éxito');
        setSelectedServiceId('');
        setCliente('');
        setAnotherService(false);
        setCustomServiceName('');
        setCustomServicePrice('');
        return;
      } catch (err) {
        console.error(err);
        alert('Error al registrar el otro servicio');
        return;
      }
    }

    // Servicio estándar
    const data = {
      idManicurista: user.id,
      manicuristaName: user.username,
      idService: selectedServiceId,
      serviceName: selectedServiceName,
      cliente,
      authorized: true
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
        <select value={selectedServiceId} onChange={handleServiceChange}>
          <option value="">Selecciona un servicio</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.servicename}
            </option>
          ))}
          <option value="otro">Otro Servicio</option>
        </select>

        {anotherService && (
          <>
            <input
              type="text"
              placeholder="Nombre del nuevo servicio"
              value={customServiceName}
              onChange={(e) => setCustomServiceName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio del nuevo servicio"
              value={customServicePrice}
              onChange={(e) => setCustomServicePrice(e.target.value)}
            />
          </>
        )}

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

