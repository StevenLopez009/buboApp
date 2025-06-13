import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import "./ShowUsers.css"

const ShowUsers: React.FC = () => {
  const { getEmployees, employees, deleteEmployee, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    getEmployees();
  }, []);

  const canDelete = (targetRole: string) => {
    if (user?.rol === "administrador" && targetRole === "manicurista") return true;
    if (user?.rol === "superadmin" && targetRole !== "superadmin") return true;
    return false;
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      deleteEmployee(selectedUserId);
      setShowModal(false);
      setSelectedUserId(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  return (
      <div className="employee-list">
      <h1 className="employee-list__title">Show Employees</h1>
      <ul className="employee-list__items">
        {employees.map((emp) => (
          <li className="employee-list__item" key={emp.id}>
            {emp.image ? (
              <img className="employee-list__image" src={emp.image} alt={emp.username} />
            ) : (
              <div className="employee-list__image--placeholder">
                {emp.username?.[0]?.toUpperCase() || "?"}
              </div>
            )}
            <div className="employee-list__info">
              <strong className="employee-list__name">{emp.username}</strong><br />
              <span className="employee-list__email">{emp.email}</span>
              <span className="employee-list__role">{emp.rol}</span>
              {canDelete(emp.rol) && (
                <button
                  className="employee-list__delete-button"
                  onClick={() => handleDeleteClick(emp.id.toString())}
                >
                  Eliminar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
            <div className="modal-buttons">
              <button className="modal-confirm" onClick={confirmDelete}>Sí, eliminar</button>
              <button className="modal-cancel" onClick={cancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowUsers;
