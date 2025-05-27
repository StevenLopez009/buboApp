import { useNavigate } from 'react-router-dom';
const UserDash: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Manicurista Dashboard</h1>
      <button onClick={() => navigate('/registerService')}>Servicios</button>
      <button>Productos</button>
      <button onClick={() => navigate('/servicesDone')}>servicios hechos</button>
      <button>Bolsillo</button>
    </div>
  );
};

export default UserDash;