import { useEffect, useState } from "react";
import { getApprovedServicesLog, getServiceByIdFromAPI } from "../../../api/service";
import { useAuth } from "../../../context/AuthContext";
import { Wallet } from 'lucide-react';
import "./Pocket.css"; 

const Pocket: React.FC = () => {
  const { user } = useAuth();
  const [paidTotal, setPaidTotal] = useState(0);
  const [unpaidTotal, setUnpaidTotal] = useState(0);

  const formatCOP = (value: number): string =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(value);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const { data } = await getApprovedServicesLog();
        const { serviceLog, anotherService, products } = data;
        const filteredServiceLog = serviceLog.filter(s => s.idManicurista === user.id);
        const filteredAnotherService = anotherService.filter(s => s.idManicurista === user.id);
        const filteredProducts = products.filter(p => p.idManicurista === user.id);

        let totalPaid = 0;
        let totalUnpaid = 0;

        for (const service of filteredServiceLog) {
          try {
            const { data: serviceData } = await getServiceByIdFromAPI(service.idService);
            const price = parseFloat(serviceData.price || "0");

            if (service.paid) {
              totalPaid += price;
            } else {
              totalUnpaid += price;
            }
          } catch (error) {
            console.error("Error al obtener precio de servicio:", error);
          }
        }

        // Procesar anotherService (ya tiene precio)
        for (const other of filteredAnotherService) {
          const price = parseFloat(other.price || "0");
          if (other.paid) {
            totalPaid += price;
          } else {
            totalUnpaid += price;
          }
        }

        // Procesar productos
        for (const product of filteredProducts) {
          const price = parseFloat(product.price || "0");
          if (product.paid) {
            totalPaid += price;
          } else {
            totalUnpaid += price;
          }
        }

        setPaidTotal(totalPaid);
        setUnpaidTotal(totalUnpaid);
      } catch (error) {
        console.error("Error al cargar datos del bolsillo:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="pocket-container">
    <div className="pocket">
      <div className="pocket__header">
        <h1 className="pocket__title">Bolsillo</h1>
      </div>
      <p className="pocket__welcome">Bienvenida, {user?.username}</p>
      <div className="pocket__totals">
        <h2 className="pocket__total">
          <span className="pocket__label">Total pagado:</span> {formatCOP(paidTotal)}
        </h2>
        <h2 className="pocket__total pocket__total--unpaid">
          <span className="pocket__label">Total no pagado:</span> {formatCOP(unpaidTotal)}
        </h2>
      </div>
    </div>
    </div>
    
  );
};

export default Pocket;


