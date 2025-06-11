import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './CreateRol.css';

const CreateRol: React.FC = () => {
  const { signup, user } = useAuth(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
    rh: '',
    eps: '',
    age: '',
    rol: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al crear usuario", error);
    }
  };


  const getRoleOptions = () => {
    if (!user) return null; 
    if (user.rol === 'superadmin') {
      return (
        <>
          <option value="Administrador">Administrador</option>
          <option value="Manicurista">Manicurista</option>
        </>
      );
    } else if (user.rol === 'administrador') {
      return <option value="Manicurista">Manicurista</option>;
    }
    return null;
  };

  return (
    <div className="user-form">
      <form className="user-form__form" onSubmit={handleSubmit}>
        <input className="user-form__input" type="text" name="username" placeholder="Name" onChange={handleChange} />
        <input className="user-form__input" type="text" name="email" placeholder="Email" onChange={handleChange} />
        <input className="user-form__input" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input className="user-form__input" type="text" name="contact" placeholder="Teléfono" onChange={handleChange} />

        <select className="user-form__select" name="rh" onChange={handleChange}>
          <option value="">Selecciona RH</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A-">A-</option>
          <option value="A+">A+</option>
          <option value="B-">B-</option>
          <option value="B+">B+</option>
          <option value="AB-">AB-</option>
          <option value="AB+">AB+</option>
        </select>

        <input className="user-form__input" type="text" name="eps" placeholder="EPS" onChange={handleChange} />
        <input className="user-form__input" type="text" name="age" placeholder="Edad" onChange={handleChange} />

        <select className="user-form__select" name="rol" onChange={handleChange}>
          <option value="">Selecciona Rol</option>
          {getRoleOptions()}
        </select>
        <input className="user-form__input" type="text" name="image" placeholder="Foto" onChange={handleChange} />

        <button className="user-form__button" type="submit">
          CREAR
        </button>
      </form>
    </div>
  );
};

export default CreateRol;

