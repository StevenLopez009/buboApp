import { useNavigate } from 'react-router-dom';

const RootDash: React.FC = () => {
   const navigate= useNavigate()
   const goToCreateRol =()=>{
    navigate ("/createRol")
   }
  return (
    <div>
      <h1>Dashboard de superadmin</h1>
      <button onClick={goToCreateRol}>
        crear rol
      </button>
      <button>
        servicios
      </button>
    </div>
  );
};

export default RootDash;