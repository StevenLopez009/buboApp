import { useForm } from 'react-hook-form';
import { RegisterBill } from '../../../api/bills';  // Ajusta el path si es necesario
import { useState } from 'react';

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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Registrar Gasto</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("brand", { required: true })}
          type="text"
          placeholder="Marca del producto"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("product", { required: true })}
          type="text"
          placeholder="Producto"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("price", { required: true, valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Precio"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("quantity", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Cantidad"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Registrar
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Bills;
