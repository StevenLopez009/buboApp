import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>Bubo</h1>
      <button onClick={handleStart}>Inicio</button>
    </div>
  );
};

export default Splash;
