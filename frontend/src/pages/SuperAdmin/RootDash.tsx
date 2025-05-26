import { useNavigate } from 'react-router-dom';

const RootDash: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard de superadmin</h1>
      <button onClick={() => navigate('/createRol')}>Crear rol</button>
      <button onClick={() => navigate('/services')}>Servicios</button>
    </div>
  );
};

export default RootDash;
