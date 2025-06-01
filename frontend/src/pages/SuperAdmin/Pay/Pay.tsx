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
  halfPrice?: string; // Mitad del precio formateado
  numericPrice?: number; // Precio como número para cálculos
}

interface ManicuristaSummary {
  name: string;
  total: number;
  formattedTotal: string;
  services: ApprovedService[];
}

const Pay: React.FC = () => {
  const [approvedServices, setApprovedServices] = useState<ApprovedService[]>([]);
  const [manicuristaSummaries, setManicuristaSummaries] = useState<ManicuristaSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para formatear el precio
  const formatPrice = (priceNumber: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(priceNumber);
  };

  // Procesar servicios para agrupar por manicurista y calcular totales
  const processServices = (services: ApprovedService[]) => {
    const manicuristasMap: Record<string, ManicuristaSummary> = {};

    services.forEach(service => {
      if (!service.manicuristaName || !service.numericPrice) return;

      // Calcular mitad del precio
      const halfPrice = service.numericPrice / 2;
      
      // Actualizar el servicio con la mitad del precio
      service.halfPrice = formatPrice(halfPrice);

      // Agrupar por manicurista
      if (!manicuristasMap[service.manicuristaName]) {
        manicuristasMap[service.manicuristaName] = {
          name: service.manicuristaName,
          total: 0,
          formattedTotal: '',
          services: []
        };
      }

      manicuristasMap[service.manicuristaName].total += halfPrice;
      manicuristasMap[service.manicuristaName].services.push(service);
    });

    // Formatear totales
    Object.values(manicuristasMap).forEach(summary => {
      summary.formattedTotal = formatPrice(summary.total);
    });

    setManicuristaSummaries(Object.values(manicuristasMap));
  };

  useEffect(() => {
    const fetchApprovedServices = async () => {
      try {
        setLoading(true);
        
        // 1. Obtenemos los servicios aprobados
        const approvedRes = await getApprovedServicesLog();
        const approvedServicesData = approvedRes.data;
        
        // 2. Obtenemos detalles de cada servicio
        const servicesWithDetails = await Promise.all(
          approvedServicesData.map(async (service: ApprovedService) => {
            try {
              const serviceDetails = await getServiceByIdFromAPI(service.idService);
              const priceString = serviceDetails.data.price;
              const numericPrice = parseFloat(priceString) || 0;
              
              return {
                ...service,
                price: priceString,
                numericPrice: numericPrice,
                formattedPrice: formatPrice(numericPrice)
              };
            } catch (err) {
              console.error(`Error obteniendo detalles del servicio ${service.idService}`, err);
              return {
                ...service,
                numericPrice: 0,
                formattedPrice: 'N/A'
              };
            }
          })
        );
        
        setApprovedServices(servicesWithDetails);
        processServices(servicesWithDetails);
      } catch (err) {
        console.error(err);
        setError("Error al obtener servicios aprobados");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedServices();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pagos a Manicuristas</h1>
      
      {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}
      {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}

      {manicuristaSummaries.map(summary => (
        <div key={summary.name} style={{ 
          marginBottom: '30px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
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
                <li key={service.id} style={{ 
                  padding: '12px',
                  margin: '8px 0',
                  borderRadius: '6px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <p><strong>Servicio:</strong> {service.serviceName}</p>
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