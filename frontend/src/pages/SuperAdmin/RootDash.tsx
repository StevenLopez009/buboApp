import { useNavigate } from 'react-router-dom';

const RootDash: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard de superadmin</h1>
      <button onClick={() => navigate("/superadmin/createRol")}>Crear rol</button>
      <button onClick={() => navigate('/superadmin/services')}>Servicios</button>
      <button onClick={() => navigate('/superadmin/bills')}>Gastos</button>
      <button onClick={() => navigate('/superadmin/pays')}>Pagar</button>
      <button onClick={() => navigate('/superadmin/users')}>Roles</button>
    </div>
  );
};

export default RootDash;