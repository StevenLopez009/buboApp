import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const anotherService = sequelize.define('anotherService', {
  idManicurista: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  manicuristaName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  anotherServiceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorized:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'anotherServices'
});

export default anotherService