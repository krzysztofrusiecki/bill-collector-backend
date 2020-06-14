const express = require("express");
const router = express.Router();

const {
  getAllBills,
  getOneBill,
  postOneBill,
  deleteOneBill,
  updateOneBill,
} = require("../controllers/Bills");

// @desc    Get all bills
// @route   GET /bills
router.get("/", getAllBills);

// @desc    Get single bill
// @route   GET /bills/:id
router.get("/:id", getOneBill);

// @desc    Add bill
// @route   POST /bills
router.post("/", postOneBill);

// // @desc    Delete bill
// // @route   DELETE /bills/:id
router.delete("/:id", deleteOneBill);

// // @desc    Update bill
// // @route   PUT /bills:id
router.put("/:id", updateOneBill);

module.exports = router;
