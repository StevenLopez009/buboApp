import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

const AdminDash: React.FC = () => {
  const navigate = useNavigate();

  return (
     <DashboardLayout>
      <button onClick={() => navigate('/admin/createRol')} className="dashboard__button dashboard__button--primary">Crear rol</button>
      <button onClick={() => navigate('/admin/services')} className="dashboard__button">Crear Servicios</button>
      <button onClick={() => navigate('/admin/aproveServices')} className="dashboard__button">Aprobar Servicios</button>
      <button onClick={() => navigate('/admin/bills')} className="dashboard__button">Gastos</button>
      <button onClick={() => navigate('/admin/users')} className="dashboard__button">Roles</button>
    </DashboardLayout>
  );
};

export default AdminDash;