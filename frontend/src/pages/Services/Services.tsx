import { useEffect, useState } from 'react';
import { useService } from '../../context/ServiceContext'

const Services: React.FC = () => {
  const { services, createService, getServices, loading, error } = useService();
  const [formData, setFormData] = useState<{ servicename: string; price: string }>({
  servicename: '',
  price: '',
});


  useEffect(() => {
    getServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     await createService({
        servicename: formData.servicename,
        price: Number(formData.price), 
      });
      setFormData({ servicename: '', price: '' });
      getServices(); 
    } catch (error) {
      console.error("Error al crear service", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="servicename" placeholder="servicename" onChange={handleChange} />
        <input type="text" name="price" placeholder="price"  value={formData.price.toString()}  onChange={handleChange} />
        <button type="submit">CREAR</button>
      </form>
      {loading ? (
        <p>Cargando servicios...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {services.map(service => (
            <li key={service.id}>
              {service.servicename} - ${parseInt(service.price).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Services;