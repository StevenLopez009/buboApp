import React, { useEffect, useState } from 'react';
import { GetRegisterBill } from '../../../api/bills';

interface BillType {
  id: number;
  brand: string;
  product: string;
  price: string; 
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const ShowBills: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState<BillType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getBills = async () => {
    try {
      setLoading(true);
      const res = await GetRegisterBill();
      setBills(res.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Error al obtener servicios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  const total = bills?.reduce((acc, bill) => {
    return acc + parseFloat(bill.price) * bill.quantity;
  }, 0) ?? 0;

  return (
    <div>
      <h1>Show Bills</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {bills && (
        <>
          <ul>
            {bills.map((bill) => (
              <li key={bill.id}>
                <strong>{bill.product}</strong> ({bill.brand}) - ${bill.price} x {bill.quantity}
              </li>
            ))}
          </ul>
          <h2>Total: ${total.toLocaleString()}</h2>
        </>
      )}
    </div>
  );
};

export default ShowBills;
