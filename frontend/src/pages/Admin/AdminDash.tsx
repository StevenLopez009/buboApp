import { useNavigate } from 'react-router-dom';
import Carousel from '../SuperAdmin/Components/Carousel';
import '../SuperAdmin/RootDash.css';

const AdminDash: React.FC = () => {
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
          <p>Hello</p>
        </div>
        <Carousel/>
      </div>
      <div className="dashboard__content">
        <button onClick={() => navigate('/admin/createRol')}  className="dashboard__button dashboard__button--primary">Crear rol</button>
        <button onClick={() => navigate('/admin/services')} className="dashboard__button">Crear Servicios</button>
        <button onClick={() => navigate('/admin/aproveServices')} className="dashboard__button">Aprobar Servicios</button>
        <button onClick={() => navigate('/admin/bills')} className="dashboard__button">Gastos</button>
        <button onClick={() => navigate('/admin/users')} className="dashboard__button">Roles</button>
      </div>
    </div>
  );
};

export default AdminDash;