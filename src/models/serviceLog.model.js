import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const serviceLog = sequelize.define("serviceLog", {
  idManicurista: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idService: {
    type: DataTypes.INTEGER,
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
});

export default serviceLog;
