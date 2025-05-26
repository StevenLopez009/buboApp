import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Service = sequelize.define('Service', {
  servicename: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [3, 20] }
  },
  price: {
   type: DataTypes.DECIMAL(10, 2),
    allowNull: false, 
    validate: { min: 0 }
  },
}, {
  timestamps: true,
  tableName: 'services'
});

export default Service