import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { idManicurista,manicuristaName,productName, price  } = req.body;

  try {
    const productSaved = await productModel.create({  idManicurista,manicuristaName,productName, price});

    res.status(201).json({
      data: productSaved,
    });
  } catch (error) {
    console.error("Error al crear factura:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

export const getProductsById = async (req, res) => {
  const { idManicurista } = req.params;

  try {
    const products = await productModel.findAll({
      where: { idManicurista }
    });


    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos vendidos por esta manicurista" });
    }

    res.status(200).json({
      data: products,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
}

export const payProduct= async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    product.paid = true;
    await product.save();

    res.status(200).json({ message: "product paid successfully", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};