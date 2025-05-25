import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CreateRol: React.FC = () => {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
    rh: '',
    eps: '',
    age: '',
    rol: ''
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Name" onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="contact" placeholder="Teléfono" onChange={handleChange} />
        <select name="rh" onChange={handleChange}>
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
        <input type="text" name="eps" placeholder="EPS" onChange={handleChange} />
        <input type="text" name="age" placeholder="Edad" onChange={handleChange} />
        <select name="rol" onChange={handleChange}>
          <option value="">Selecciona Rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Manicurista">Manicurista</option>
        </select>
        <button type="submit">CREAR</button>
      </form>
    </div>
  );
};

export default CreateRol;
