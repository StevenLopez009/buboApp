import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const productModel = sequelize.define('product', {
  idManicurista: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  manicuristaName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
   type: DataTypes.DECIMAL(10, 2),
    allowNull: false, 
    validate: { min: 0 }
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  timestamps: true,
  tableName: 'product'
});

export default productModel