const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Bill = require("../models/Bill");

// @desc    Get all bills
// @route   GET /bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    console.log(err);
    res.statusCode(400).json(err);
  }
});

// @desc    Get single bill
// @route   GET /bills/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bill = await Bill.findById(id);
    res.statusCode(200).json(bill);
  } catch (err) {
    console.log(err);
    res.statusCode(404).json({ message: err });
  }
});

// @desc    Add bill
// @route   POST /bills
router.post("/", async (req, res) => {
  const { shop, price, date, tags } = req.body;
  const bill = new Bill({
    shop: shop,
    price: {
      amount: price.amount,
      currency: price.currency,
    },
    date: date,
    tags: [...tags],
  });
  try {
    const savedBill = await bill.save();
    res.statusCode(201).json(savedBill);
  } catch (err) {
    console.log(err);
    res.statusCode(400).json({ message: err });
  }
});

// // @desc    Delete bill
// // @route   DELETE /bills/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBill = await Bill.findByIdAndRemove(id);
    res.statusCode(200).json(deletedBill);
  } catch (err) {
    console.log(err);
    res.statusCode(404).json({ message: err });
  }
});

// // @desc    Update bill
// // @route   PUT /bills:id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedBill = await Bill.findOneAndUpdate(id, body, { new: true });
    res.statusCode(200).json(updatedBill);
  } catch (err) {
    console.log(err);
    res.statusCode(404).json({ message: err });
  }
});

module.exports = router;
