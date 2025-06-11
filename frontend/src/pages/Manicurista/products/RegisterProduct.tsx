import { useState } from "react";
import { useAuth } from '../../../context/AuthContext';
import {createProductAPI } from "../../../api/service";
import './RegisterProduct.css'; 

const RegisterProduct = () => {
  const { user } = useAuth();
   const [formData, setFormData] = useState({
    productName: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
        if (!user) {
        setMessage('❌ Usuario no autenticado');
        return;
      }
      await createProductAPI({
        productName: formData.productName,
        price: formData.price,
        idManicurista: user.id,
        manicuristaName: user.username
      });
      setMessage('✅ Producto registrado con éxito');
      setFormData({ productName: '', price: ''});
    } catch (error: any) {
      console.error(error);
      setMessage('❌ Error al registrar producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h2 className="product-form__title">Registrar producto vendido</h2>
      <form onSubmit={handleSubmit} className="product-form__form">
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
          className="product-form__input"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio"
          required
          className="product-form__input"
        />
        <button
          type="submit"
          disabled={loading}
          className="product-form__button"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
      {message && <p className="product-form__message">{message}</p>}
    </div>
  );
};

export default RegisterProduct;