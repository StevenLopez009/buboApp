import { useEffect, useState } from "react";
import { getApprovedServicesLog, getServiceByIdFromAPI } from "../../../api/service";
import { useAuth } from "../../../context/AuthContext";

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

        // Filtrar solo los que pertenecen a este manicurista
        const filteredServiceLog = serviceLog.filter(s => s.idManicurista === user.id);
        const filteredAnotherService = anotherService.filter(s => s.idManicurista === user.id);
        const filteredProducts = products.filter(p => p.idManicurista === user.id);

        let totalPaid = 0;
        let totalUnpaid = 0;

        // Procesar serviceLog (necesita fetch del precio)
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
    <div>
      <h1>Bolsillo</h1>
      <p>Bienvenido, {user?.username}</p>
      <h2>Total pagado: {formatCOP(paidTotal)}</h2>
      <h2>Total no pagado: {formatCOP(unpaidTotal)}</h2>
    </div>
  );
};

export default Pocket;


