import { useNavigate } from 'react-router-dom';
import "./RootDash.css"

const RootDash: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className='dashboard__header'>
        <div className='dashboard__info'>
          <svg className="dashboard__icon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg className="dashboard__icon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className='dashboard__name'>
          <p>Hello Steven</p>
        </div>
        <div className='dashboard__img'></div>
      </div>
      <div className="dashboard__content">
        <button
          className="dashboard__button dashboard__button--primary"
          onClick={() => navigate("/superadmin/createRol")}
        >
          Crear rol
        </button>

        <button
          className="dashboard__button"
          onClick={() => navigate('/superadmin/services')}
        >
          Servicios
        </button>

        <button
          className="dashboard__button"
          onClick={() => navigate('/superadmin/bills')}
        >
          Gastos
        </button>

        <button
          className="dashboard__button"
          onClick={() => navigate('/superadmin/pays')}
        >
          Pagar
        </button>

        <button
          className="dashboard__button"
          onClick={() => navigate('/superadmin/users')}
        >
          Roles
        </button>
      </div>
    </div>
  );
};

export default RootDash;