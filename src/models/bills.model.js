import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Bills = sequelize.define('Bills', {
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
   type: DataTypes.DECIMAL(10, 2),
    allowNull: false, 
    validate: { min: 0 }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  }
}, {
  timestamps: true,
  tableName: 'bills'
});

export default Bills