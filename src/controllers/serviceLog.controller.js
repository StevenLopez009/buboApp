import serviceLog from "../models/serviceLog.model.js";

export const serviceLogController = async (req, res) => {
  const { idManicurista, idService, cliente } = req.body;

  try {
    const serviceLogSaved = await serviceLog.create({ idManicurista, idService, cliente });

    res.status(201).json({
      id: serviceLogSaved.id,
      idManicurista: serviceLogSaved.idManicurista,
      idService: serviceLogSaved.idService,
      cliente: serviceLogSaved.cliente,
      authorized: serviceLogSaved.authorized
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}