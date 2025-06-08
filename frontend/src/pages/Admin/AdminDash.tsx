import { useNavigate } from 'react-router-dom';

const AdminDash: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate('/admin/createRol')}>Crear rol</button>
      <button onClick={() => navigate('/admin/services')}>Crear Servicios</button>
      <button onClick={() => navigate('/admin/aproveServices')}>Aprobar Servicios</button>
      <button onClick={() => navigate('/admin/bills')}>Gastos</button>
      <button onClick={() => navigate('/admin/users')}>Roles</button>
    </div>
  );
};

export default AdminDash;