import anotherService from "../models/anotherService.model.js"

export const createAnotherServiceController = async (req, res) => {
  const { idManicurista,manicuristaName,anotherServiceName, cliente, price } = req.body;

  try {
    const anotherServiceSaved = await anotherService.create({idManicurista,manicuristaName,anotherServiceName, cliente, price});

    res.status(201).json({
      id: anotherServiceSaved.id,
      idManicurista: anotherServiceSaved.idManicurista,
      manicuristaName:anotherServiceSaved.manicuristaName,
      serviceName: anotherServiceSaved.serviceName,
      cliente: anotherServiceSaved.cliente,
      price: anotherServiceSaved.price,
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

export const approveAnotherService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await anotherService.findByPk(id);
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