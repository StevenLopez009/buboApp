// src/components/DashboardLayout.tsx
import { useState, type ReactNode } from 'react';
import Carousel from '../Carousel/Carousel'; 
import './DashboardLayout.css'; 
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
   const [showMenu, setShowMenu] = useState(false);
   const {logout, user} = useAuth(); 

   const toggleMenu = () => setShowMenu((prev) => !prev);
   const handleLogout = () => {
      logout(); 
   }

  return (
    <div className="dashboard">
      <div className='dashboard__header'>
        <div className='dashboard__info'>
          <svg className="dashboard__icon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div style={{ position: 'relative' }}>
            <svg
              className="dashboard__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={toggleMenu}
              style={{ cursor: 'pointer' }}
            >
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>

            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Cerrar Sesion</button>
              </div>
            )}
          </div>
        </div>
        <div className='dashboard__name'>
          <p>Hola {user?.username} !!!</p>
        </div>
        <Carousel />
      </div>
      <div className="dashboard__content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
