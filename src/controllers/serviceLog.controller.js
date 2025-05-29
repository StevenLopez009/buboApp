import serviceLog from "../models/serviceLog.model.js";

export const serviceLogController = async (req, res) => {
  const { idManicurista,manicuristaName,serviceName, idService, cliente } = req.body;

  try {
    const serviceLogSaved = await serviceLog.create({ idManicurista,manicuristaName, serviceName, idService, cliente });

    res.status(201).json({
      id: serviceLogSaved.id,
      idManicurista: serviceLogSaved.idManicurista,
      manicuristaName:serviceLogSaved.manicuristaName,
      idService: serviceLogSaved.idService,
      serviceName: serviceLogSaved.serviceName,
      cliente: serviceLogSaved.cliente,
      authorized: serviceLogSaved.authorized
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getServicesLogController = async (req, res) => {
 const idManicurista = parseInt(req.params.idManicurista);

  try {
    const services = await serviceLog.findAll({
      where: { idManicurista: idManicurista }
    });

    console.log("Registros encontrados:", services.length);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ message: error.message });
  }
}

export const getAllServicesLog = async (req, res) => {
  try {
    const services = await serviceLog.findAll();
    res.status(200).json(services)
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ message: error.message });
  }
}

export const aproveServicesLog = async (req, res) => {
  
}