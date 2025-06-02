import { useEffect, useState } from 'react';
import { useService } from '../../context/ServiceContext';

const Services: React.FC = () => {
  const {
    services,
    createService,
    getServices,
    editService,
    deleteService,
    loading,
    error,
  } = useService();

  const [formData, setFormData] = useState<{ servicename: string; price: string }>({
    servicename: '',
    price: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    getServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingId !== null) {
        await editService({
          id: editingId.toString(),
          servicename: formData.servicename,
          price: Number(formData.price),
        });
      } else {
        await createService({
          servicename: formData.servicename,
          price: Number(formData.price),
        });
      }

      setFormData({ servicename: '', price: '' });
      setIsEditing(false);
      setEditingId(null);
      getServices();
    } catch (error) {
      console.error("Error al guardar el servicio", error);
    }
  };

  const handleEditClick = (service: { id: number; servicename: string; price: number }) => {
    setIsEditing(true);
    setEditingId(service.id);
    setFormData({
      servicename: service.servicename,
      price: service.price.toString(),
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ servicename: '', price: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="servicename"
          placeholder="Nombre del servicio"
          value={formData.servicename}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? 'GUARDAR CAMBIOS' : 'CREAR'}</button>
        {isEditing && <button type="button" onClick={handleCancelEdit}>CANCELAR</button>}
      </form>

      {loading ? (
        <p>Cargando servicios...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {services.map(service => (
            <li key={service.id}>
              {service.servicename} - ${parseInt(service.price.toString()).toLocaleString()}
              <button onClick={() => deleteService(service.id.toString())}>Eliminar</button>
              <button onClick={() => handleEditClick(service)}>Editar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Services;
