import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

const UserDash: React.FC = () => {
  const navigate = useNavigate();
  
  return (
     <DashboardLayout>
      <button onClick={() => navigate('/registerService')} className="dashboard__button dashboard__button--primary">Servi</button>
      <button onClick={() => navigate('/registerProduct')} className="dashboard__button">Productos</button>
      <button onClick={() => navigate('/servicesDone')} className="dashboard__button">Hechos</button>
      <button onClick={() => navigate('/pocket')} className="dashboard__button">Bolsillo</button>
    </DashboardLayout>
  );
};

export default UserDash;