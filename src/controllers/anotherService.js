import anotherService from "../models/anotherService.model.js"

export const createAnotherServiceController = async (req, res) => {
  const { idManicurista,manicuristaName,anotherServiceName, cliente } = req.body;

  try {
    const anotherServiceSaved = await anotherService.create({idManicurista,manicuristaName,anotherServiceName, cliente});

    res.status(201).json({
      id: anotherServiceSaved.id,
      idManicurista: anotherServiceSaved.idManicurista,
      manicuristaName:anotherServiceSaved.manicuristaName,
      serviceName: anotherServiceSaved.serviceName,
      cliente: anotherServiceSaved.cliente,
      authorized: anotherServiceSaved.authorized
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnotherServicesController = async (req, res) => {
  try {
    const anotherServices = await anotherService.findAll();
    res.status(200).json(anotherServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}