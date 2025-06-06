import Bills from "../models/bills.model.js"; 

export const createBillController = async (req, res) => {
  const { brand, product, price, quantity } = req.body;

  try {
    const billSaved = await Bills.create({ brand, product, price, quantity });

    res.status(201).json({
      data: billSaved,
    });
  } catch (error) {
    console.error("Error al crear factura:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

export const getBillController = async (req, res)=> {
    try {
    const bills = await Bills.findAll();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
