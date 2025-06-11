import React, { useEffect, useState } from 'react';
import { GetRegisterBill } from '../../../api/bills';
import './ShowBills.css'; 

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
    <div className="expenses">
      <h1 className="expenses__title">Gastos</h1>
      <div className="expenses__info">
        <p className="expenses__description">info</p>
      </div>

      <div className="expenses__filters">
        <button className="expenses__button expenses__button--may">mayo</button>
        <button className="expenses__button expenses__button--june">junio</button>
      </div>

      {loading && <p className="expenses__message">Cargando...</p>}
      {error && <p className="expenses__message">{error}</p>}

      {bills && (
        <>
          <ul className="expenses__list">
            {bills.map((bill) => (
              <li className="expenses__item" key={bill.id}>
                <strong className="expenses__product">{bill.product}</strong>
                <span className="expenses__details">
                  ({bill.brand}) - ${bill.price} x {bill.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="expenses__total">
            <h2 className="expenses__total-value">
              Total: ${total.toLocaleString()}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowBills;
