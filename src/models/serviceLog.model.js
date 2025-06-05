import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const serviceLog = sequelize.define("serviceLog", {
  idManicurista: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  manicuristaName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  idService: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serviceName: {
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
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

export default serviceLog;
