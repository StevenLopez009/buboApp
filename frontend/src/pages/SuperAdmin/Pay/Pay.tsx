import React, { useEffect, useState } from 'react';
import { getServiceByIdFromAPI, getApprovedServicesLog } from '../../../api/service';

import {
  payServiceLogAPI,
  payAnotherServiceAPI,
  payProductAPI
} from '../../../api/service';


interface ApprovedService {
  id: number;
  cliente: string;
  serviceName: string;
  manicuristaName: string;
  authorized: boolean;
  paid: boolean;
  idService?: number;
  price?: string;
  formattedPrice?: string;
  halfPrice?: string;
  numericPrice?: number;
  count?: number;
  tipo?: 'producto' | 'servicio'; 
}

interface ManicuristaSummary {
  name: string;
  total: number;
  formattedTotal: string;
  services: ApprovedService[];
}

const Pay: React.FC = () => {
  const [manicuristaSummaries, setManicuristaSummaries] = useState<ManicuristaSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (value: number): string =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);

  const calculatePrices = (price: number) => {
    const formatted = formatPrice(price);
    const half = price / 2;
    const formattedHalf = formatPrice(half);
    return { formatted, half, formattedHalf };
  };

  const processServices = (services: ApprovedService[]) => {
    const manicuristasMap: Record<string, ManicuristaSummary> = {};

    services.forEach(service => {
      if (!service.manicuristaName || !service.numericPrice) return;

      const manicurista = service.manicuristaName;
      if (!manicuristasMap[manicurista]) {
        manicuristasMap[manicurista] = {
          name: manicurista,
          total: 0,
          formattedTotal: '',
          services: []
        };
      }

      const summary = manicuristasMap[manicurista];
      const existingService = summary.services.find(s => s.serviceName === service.serviceName);

      const porcentajePago = service.tipo === 'producto' ? 0.06 : 0.5;
      const pagoManicurista = service.numericPrice * porcentajePago;
      const { formatted: formattedPrice } = calculatePrices(service.numericPrice);
      const formattedPago = formatPrice(pagoManicurista);

      if (existingService) {
        existingService.count! += 1;
        existingService.numericPrice! += service.numericPrice!;
        existingService.halfPrice = formatPrice(existingService.numericPrice! * porcentajePago);
        existingService.formattedPrice = formatPrice(existingService.numericPrice!);
      } else {
        summary.services.push({
          ...service,
          count: 1,
          formattedPrice,
          halfPrice: formattedPago
        });
      }

      summary.total += pagoManicurista;
    });

    Object.values(manicuristasMap).forEach(summary => {
      summary.formattedTotal = formatPrice(summary.total);
    });

    setManicuristaSummaries(Object.values(manicuristasMap));
  };

  const fetchApprovedServices = async () => {
  try {
    setLoading(true);

    const { data } = await getApprovedServicesLog();
    const { serviceLog, anotherService, products } = data;

    const enrichedServiceLog = await Promise.all(
      serviceLog
        .filter((service: ApprovedService) => service.paid === false)
        .map(async (service: ApprovedService) => {
          try {
            const { data: details } = await getServiceByIdFromAPI(service.idService!);
            const price = parseFloat(details.price) || 0;
            return {
              ...service,
              price: details.price,
              numericPrice: price,
              tipo: 'servicio'
            };
          } catch (error) {
            console.error(`Error al obtener el servicio ${service.idService}`, error);
            return {
              ...service,
              numericPrice: 0,
              formattedPrice: 'N/A',
              tipo: 'servicio'
            };
          }
        })
    );

    const enrichedAnotherServices = anotherService
      .filter((service: any) => service.paid === false)
      .map((service: any) => {
        const price = parseFloat(service.price) || 0;
        return {
          ...service,
          serviceName: service.anotherServiceName,
          numericPrice: price,
          price: service.price,
          tipo: 'servicio'
        };
      });

    const enrichedProducts = products
      .filter((product: any) => product.paid === false)
      .map((product: any) => {
        const price = parseFloat(product.price) || 0;
        return {
          ...product,
          serviceName: product.productName,
          numericPrice: price,
          price: product.price,
          tipo: 'producto'
        };
      });

    const combined = [...enrichedServiceLog, ...enrichedAnotherServices, ...enrichedProducts];
    processServices(combined);
  } catch (err) {
    console.error(err);
    setError('Error al obtener servicios aprobados');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchApprovedServices();
  }, []);

  const handlePay = async (services: ApprovedService[]) => {
  try {
    setLoading(true);

    for (const service of services) {
      if (!service.id) continue;

      if (service.tipo === 'producto') {
        await payProductAPI(service.id);
      } else if (service.idService) {
        await payServiceLogAPI(service.id);
      } else {
        await payAnotherServiceAPI(service.id);
      }
    }

   await fetchApprovedServices();

  } catch (error) {
    console.error('Error al pagar servicios:', error);
    setError('Hubo un problema al procesar el pago.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pagos a Manicuristas</h1>

      {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {manicuristaSummaries.map(summary => (
        <div key={summary.name} style={{
          marginBottom: '30px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          display: 'inline-block'
        }}>
          <h2 style={{
            marginTop: 0,
            borderBottom: '2px solid #ddd',
            paddingBottom: '10px'
          }}>
            {summary.name}
          </h2>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ margin: '10px 0' }}>Servicios:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {summary.services.map(service => (
                <li key={service.serviceName} style={{
                  padding: '12px',
                  margin: '8px 0',
                  borderRadius: '6px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <p>
                    <strong>{service.tipo === 'producto' ? 'Producto' : 'Servicio'}:</strong> {service.serviceName}
                    {service.count > 1 ? ` x${service.count}` : ''}
                  </p>
                  <p><strong>Precio completo:</strong> {service.formattedPrice}</p>
                  <p style={{ color: service.tipo === 'producto' ? '#2980b9' : '#e67e22', fontWeight: 'bold' }}>
                    <strong>{service.tipo === 'producto' ? '6% para manicurista:' : 'Mitad para manicurista:'}</strong> {service.halfPrice}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            padding: '15px',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2em'
          }}>
            <p style={{ margin: 0 }}>TOTAL A PAGAR: {summary.formattedTotal}</p>
          </div>
          <button
            onClick={() => handlePay(summary.services)}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#2980b9',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Pagar a {summary.name}
          </button>

        </div>
      ))}
    </div>
  );
};

export default Pay;
