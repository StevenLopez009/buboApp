import Service from "./service.model.js";
import serviceLog from "./serviceLog.model.js";

Service.hasMany(serviceLog, {
  foreignKey: 'idService',
  onDelete: 'CASCADE',
  hooks: true   
});

serviceLog.belongsTo(Service, {
  foreignKey: 'idService'
});

export { Service, serviceLog };