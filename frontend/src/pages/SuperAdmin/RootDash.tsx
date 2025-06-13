import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

const RootDash: React.FC = () => {
  const navigate = useNavigate();

  return (
     <DashboardLayout>
      <button onClick={() => navigate('/superadmin/createRol')} className="dashboard__button dashboard__button--primary">Crear rol</button>
      <button onClick={() => navigate('/superadmin/services')} className="dashboard__button">Servicios</button>
      <button onClick={() => navigate('/superadmin/bills')} className="dashboard__button">Gastos</button>
      <button onClick={() => navigate('/superadmin/pays')} className="dashboard__button">Pagar</button>
      <button onClick={() => navigate('/superadmin/users')} className="dashboard__button">Roles</button>
    </DashboardLayout>
  );
};

export default RootDash;