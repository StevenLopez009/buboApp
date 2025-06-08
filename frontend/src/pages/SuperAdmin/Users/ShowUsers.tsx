import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const ShowUsers: React.FC = () => {
  const { getEmployees, employees, deleteEmployee, user } = useAuth();

  useEffect(() => {
    getEmployees();
  }, []);

  const canDelete = (targetRole: string) => {
    if (user?.rol === "administrador" && targetRole === "manicurista") return true;
    if (user?.rol === "superadmin" && targetRole !== "superadmin") return true;
    return false;
  };

  return (
    <div>
      <h1>Show Employees</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <strong>{emp.username}</strong> - {emp.email} - {emp.rol}
            {canDelete(emp.rol) && (
              <button onClick={() => deleteEmployee(emp.id.toString())}>
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowUsers;
