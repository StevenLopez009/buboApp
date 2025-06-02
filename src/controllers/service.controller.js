import Service from "../models/service.model.js";

export const serviceController = async (req, res) => {
  const { servicename, price } = req.body;

  try {
    const serviceSaved = await Service.create({ servicename, price });

    res.status(201).json({
      id: serviceSaved.id,
      servicename: serviceSaved.servicename,
      price: serviceSaved.price
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServicesController = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id)
     if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    res.status(500).json({ message: error.message });
  }
}

export const editService = async (req, res) => {
  const { id } = req.params;
  const { servicename, price } = req.body;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (servicename !== undefined) service.servicename = servicename;
    if (price !== undefined) service.price = price;
    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service: {
        id: service.id,
        servicename: service.servicename,
        price: service.price,
      }
    });
  } catch (error) {
    console.error("Error al editar el servicio:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteServiceController = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}