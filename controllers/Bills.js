const mongoose = require("mongoose");

const Bill = require("../models/Bill");

const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getOneBill = async (req, res) => {
  const id = req.params.id;
  try {
    const bill = await Bill.findById(id);
    res.status(200).json(bill);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const postOneBill = async (req, res) => {
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
    res.status(201).json(savedBill);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const deleteOneBill = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBill = await Bill.findByIdAndRemove(id);
    res.status(200).json(deletedBill);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const updateOneBill = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedBill = await Bill.findOneAndUpdate(id, body, { new: true });
    res.status(200).json(updatedBill);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

module.exports = {
  getAllBills,
  getOneBill,
  postOneBill,
  deleteOneBill,
  updateOneBill,
};
