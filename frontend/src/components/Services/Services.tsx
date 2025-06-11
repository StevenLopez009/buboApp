import { useEffect, useState } from 'react';
import { useService } from '../../context/ServiceContext';
import './Services.css';

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
    <>
      <div className="services">
        <div className="services__header">
          <h1 className="services__title">Crear Servicios</h1>
        </div>
        <form className="service-form" onSubmit={handleSubmit}>
          <input
            className="service-form__input"
            type="text"
            name="servicename"
            placeholder="Nombre del servicio"
            value={formData.servicename}
            onChange={handleChange}
          />
          <input
            className="service-form__input"
            type="text"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
          />
          <button className="service-form__button" type="submit">
            {isEditing ? 'GUARDAR CAMBIOS' : 'CREAR'}
          </button>
          {isEditing && (
            <button
              className="service-form__button service-form__button--cancel"
              type="button"
              onClick={handleCancelEdit}
            >
              CANCELAR
            </button>
          )}
        </form>

        <div className="service-list">
          {loading ? (
            <p className="service-list__message">Cargando servicios...</p>
          ) : error ? (
            <p className="service-list__message">{error}</p>
          ) : (
            <ul className="service-list__items">
              {services.map(service => (
                <li className="service-list__item" key={service.id}>
                  <span className="service-list__text">
                    {service.servicename} <br /> ${parseInt(service.price.toString()).toLocaleString()}
                  </span>
                  <div className="service-list__buttons">
                  <button
                    className="service-list__button service-list__button--edit"
                    onClick={() => handleEditClick(service)}
                  >
                    Editar
                  </button>
                  <button
                    className="service-list__button service-list__button--delete"
                    onClick={() => deleteService(service.id.toString())}
                  >
                    Eliminar
                  </button>
                </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
    
  );
};

export default Services;
