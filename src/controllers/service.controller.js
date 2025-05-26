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