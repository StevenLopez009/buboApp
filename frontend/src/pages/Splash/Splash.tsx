import { useNavigate } from 'react-router-dom';
import "./Splash.css"

const Splash: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="start-section">
      <div className="start-section__content">
        <h1 className="start-section__title">bubo</h1>
      </div>
      <div className="start-section__footer">
        <button className="start-section__button" onClick={handleStart}>Inicio</button>
      </div>
    </div>
  );
};

export default Splash;
