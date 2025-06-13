import { useForm } from 'react-hook-form';
import { RegisterBill } from '../../../api/bills';  
import { useState } from 'react';
import "./Bills.css"
import bgGastos from '../../../assets/products.png';

interface Bill {
  brand: string;
  product: string;
  price: number;
  quantity: number;
}

const Bills: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Bill>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: Bill) => {
    try {
      await RegisterBill(data);
      setMessage('Factura registrada correctamente');
      reset();
    } catch (error: any) {
      setMessage(`Error al registrar factura: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="bills">
      <h2 className="bills__title">Registrar Gasto</h2>
      <img className='bills__img' src={bgGastos} alt="" />
      <form onSubmit={handleSubmit(onSubmit)} className="bills__form">
        <input
          {...register("brand", { required: true })}
          type="text"
          placeholder="Marca del producto"
          className="bills__input"
        />
        <input
          {...register("product", { required: true })}
          type="text"
          placeholder="Producto"
          className="bills__input"
        />
        <input
          {...register("price", { required: true, valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Precio"
          className="bills__input"
        />
        <input
          {...register("quantity", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Cantidad"
          className="bills__input"
        />

        <button type="submit" className="bills__button">
          Registrar
        </button>
      </form>

      {message && <p className="bills__message">{message}</p>}
      
    </div>
  );
};

export default Bills;
