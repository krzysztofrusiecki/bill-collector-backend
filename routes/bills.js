const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verify-token");

const {
  getAllBills,
  getOneBill,
  postOneBill,
  deleteOneBill,
  updateOneBill,
} = require("../controllers/Bills");

// @desc    Get all bills
// @route   GET /bills
router.get("/", verifyToken, getAllBills);

// @desc    Get single bill
// @route   GET /bills/:id
router.get("/:id", verifyToken, getOneBill);

// @desc    Add bill
// @route   POST /bills
router.post("/", verifyToken, postOneBill);

// // @desc    Delete bill
// // @route   DELETE /bills/:id
router.delete("/:id", verifyToken, deleteOneBill);

// // @desc    Update bill
// // @route   PUT /bills:id
router.put("/:id", verifyToken, updateOneBill);

module.exports = router;
