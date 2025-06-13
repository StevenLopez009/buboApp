import anotherService from "../models/anotherService.model.js";
import { serviceLog } from "../models/index.js";
import productModel from "../models/product.model.js";

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
      authorized: serviceLogSaved.authorized,
      paid: serviceLogSaved.paid
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
  const { id } = req.params;

  try {
    const service = await serviceLog.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service log not found" });
    }

    service.authorized = true;
    await service.save();

    res.status(200).json({ message: "Service authorized successfully", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const payServiceLog = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await serviceLog.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service log not found" });
    }

    service.paid = true;
    await service.save();

    res.status(200).json({ message: "Service paid successfully", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedServicesLog = async (req, res) => {
  try {
    const approvedServices = await serviceLog.findAll({
      where: { authorized: true }
    });

    const anotherServicesApproved= await anotherService.findAll({
      where: { authorized: true }
    })

    const productsSold = await productModel.findAll()

     res.status(200).json({
      serviceLog: approvedServices,
      anotherService: anotherServicesApproved,
      products: productsSold
    });
  } catch (error) {
    console.error("Error al obtener servicios aprobados:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteServiceLog = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await serviceLog.findByPk(Number(id));
    if (!service) {
      return res.status(404).json({ message: "Service log not found" });
    }

    await service.destroy();
    res.status(200).json({ message: "Service log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}