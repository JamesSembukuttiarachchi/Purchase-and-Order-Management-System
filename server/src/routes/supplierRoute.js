const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

// Routes for supplier management
router.post("/", createSupplier); // Create supplier
router.get("/", getSuppliers); // Get all suppliers
router.get("/:id", getSupplierById); // Get supplier by ID
router.put("/:id", updateSupplier); // Update supplier details
router.delete("/:id", deleteSupplier); // Delete supplier

module.exports = router;
