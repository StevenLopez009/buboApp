import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [3, 20] }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [7, 15] }
  },
  rh: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']]
    }
  },
  eps: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 100 }
  },
  rol: {
    type: DataTypes.ENUM('manicurista', 'administrador', 'cliente'),
    allowNull: false,
    defaultValue: 'manicurista'
  },
}, {
  timestamps: true,
  tableName: 'users'
});

export default User

