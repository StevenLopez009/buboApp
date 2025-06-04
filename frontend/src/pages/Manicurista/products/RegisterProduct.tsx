import { useState } from "react";
import { useAuth } from '../../../context/AuthContext';
import {createProductAPI } from "../../../api/service";

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
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Registrar producto vendido</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default RegisterProduct;