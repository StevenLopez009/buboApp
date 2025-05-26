import { useState } from 'react';
import { useService } from '../../context/ServiceContext'

const Services: React.FC = () => {
   const { createService } = useService();
  const [formData, setFormData] = useState({
    servicename: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService(formData); 
      alert("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al crear usuario", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="servicename" placeholder="servicename" onChange={handleChange} />
        <input type="text" name="price" placeholder="price" onChange={handleChange} />
        <button type="submit">CREAR</button>
      </form>
    </div>
  );
};

export default Services;