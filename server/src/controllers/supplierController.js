const Supplier = require("../models/Supplier");
const logger = require("../config/logger");

// Create a new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { supplierName, telephone, email, contactPerson, notes } = req.body;
    const newSupplier = await Supplier.create({
      supplierName,
      telephone,
      email,
      contactPerson,
      notes,
    });

    logger.info(`Supplier created: ${newSupplier.supplierName}`);
    res.status(201).json(newSupplier);
  } catch (error) {
    logger.error(`Error creating supplier: ${error.message}`);
    res.status(500).json({ error: "Server Error. Could not create supplier." });
  }
};

// Get all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    logger.info("Suppliers fetched successfully");
    res.status(200).json(suppliers);
  } catch (error) {
    logger.error(`Error fetching suppliers: ${error.message}`);
    res.status(500).json({ error: "Server Error. Could not fetch suppliers." });
  }
};

// Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      logger.warn(`Supplier with ID ${req.params.id} not found`);
      return res.status(404).json({ error: "Supplier not found" });
    }

    logger.info(`Supplier fetched: ${supplier.supplierName}`);
    res.status(200).json(supplier);
  } catch (error) {
    logger.error(`Error fetching supplier: ${error.message}`);
    res.status(500).json({ error: "Server Error. Could not fetch supplier." });
  }
};

// Update supplier details
exports.updateSupplier = async (req, res) => {
  try {
    const { supplierName, telephone, email, contactPerson, notes } = req.body;
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      logger.warn(`Supplier with ID ${req.params.id} not found`);
      return res.status(404).json({ error: "Supplier not found" });
    }

    supplier.supplierName = supplierName || supplier.supplierName;
    supplier.telephone = telephone || supplier.telephone;
    supplier.email = email || supplier.email;
    supplier.contactPerson = contactPerson || supplier.contactPerson;
    supplier.notes = notes || supplier.notes;

    await supplier.save();

    logger.info(`Supplier updated: ${supplier.supplierName}`);
    res.status(200).json(supplier);
  } catch (error) {
    logger.error(`Error updating supplier: ${error.message}`);
    res.status(500).json({ error: "Server Error. Could not update supplier." });
  }
};

// Delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      logger.warn(`Supplier with ID ${req.params.id} not found`);
      return res.status(404).json({ error: "Supplier not found" });
    }

    await supplier.destroy();
    logger.info(`Supplier deleted: ${supplier.supplierName}`);
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting supplier: ${error.message}`);
    res.status(500).json({ error: "Server Error. Could not delete supplier." });
  }
};
