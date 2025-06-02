import React, { useEffect, useState } from 'react';
import { getServiceByIdFromAPI, getApprovedServicesLog } from '../../../api/service';

interface ApprovedService {
  id: number;
  cliente: string;
  serviceName: string;
  manicuristaName: string;
  authorized: boolean;
  idService: number;
  price?: string;
  formattedPrice?: string;
  halfPrice?: string;
  numericPrice?: number;
  count?: number;
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

      if (existingService) {
        existingService.count! += 1;
        existingService.numericPrice! += service.numericPrice!;
        const { formatted,  formattedHalf } = calculatePrices(existingService.numericPrice!);
        existingService.formattedPrice = formatted;
        existingService.halfPrice = formattedHalf;
      } else {
        const { formatted, formattedHalf } = calculatePrices(service.numericPrice);
        summary.services.push({
          ...service,
          count: 1,
          formattedPrice: formatted,
          halfPrice: formattedHalf
        });
      }

      summary.total += service.numericPrice / 2;
    });

    Object.values(manicuristasMap).forEach(summary => {
      summary.formattedTotal = formatPrice(summary.total);
    });

    setManicuristaSummaries(Object.values(manicuristasMap));
  };

  useEffect(() => {
    const fetchApprovedServices = async () => {
      try {
        setLoading(true);
        const { data: approvedServices } = await getApprovedServicesLog();

        const enrichedServices = await Promise.all(
          approvedServices.map(async (service: ApprovedService) => {
            try {
              const { data: details } = await getServiceByIdFromAPI(service.idService);
              const price = parseFloat(details.price) || 0;
              return {
                ...service,
                price: details.price,
                numericPrice: price
              };
            } catch (error) {
              console.error(`Error al obtener el servicio ${service.idService}`, error);
              return {
                ...service,
                numericPrice: 0,
                formattedPrice: 'N/A'
              };
            }
          })
        );

        processServices(enrichedServices);
      } catch (err) {
        console.error(err);
        setError('Error al obtener servicios aprobados');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedServices();
  }, []);

  return (
    <div style={{ width: '100%', margin: '0 auto'}}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pagos a Manicuristas</h1>

      {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {manicuristaSummaries.map(summary => (
        <div key={summary.name} style={{
          marginBottom: '30px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          display:'inline-block'
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
                    <strong>Servicio:</strong> {service.serviceName}
                    {service.count > 1 ? ` x${service.count}` : ''}
                  </p>
                  <p><strong>Precio completo:</strong> {service.formattedPrice}</p>
                  <p style={{ color: '#e67e22', fontWeight: 'bold' }}>
                    <strong>Mitad para manicurista:</strong> {service.halfPrice}
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
        </div>
      ))}
    </div>
  );
};

export default Pay;