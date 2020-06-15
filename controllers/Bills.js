const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Bill = require("../models/Bill");

const getAllBills = async (req, res) => {
  let userId;
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, authData) => {
    if (err) {
      return res.sendStatus(403).json({ message: err });
    } else {
      userId = authData._id;
    }
  });

  try {
    const bills = await Bill.find({ userId });
    res.status(200).json(bills);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getOneBill = async (req, res) => {
  let userId;
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, authData) => {
    if (err) {
      return res.sendStatus(403).json({ message: err });
    } else {
      userId = authData._id;
    }
  });

  const id = req.params.id;
  try {
    const bill = await Bill.findOne({ _id: id, userId });
    res.status(200).json(bill);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const postOneBill = async (req, res) => {
  let userId;
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, authData) => {
    if (err) {
      return res.sendStatus(403).json({ message: err });
    } else {
      userId = authData._id;
    }
  });

  const { shop, price, date, tags } = req.body;
  const bill = new Bill({
    shop: shop,
    price: {
      amount: price.amount,
      currency: price.currency,
    },
    date: date,
    tags: [...tags],
    userId: userId,
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
  let userId;
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, authData) => {
    if (err) {
      return res.sendStatus(403).json({ message: err });
    } else {
      userId = authData._id;
    }
  });

  const id = req.params.id;
  try {
    const deletedBill = await Bill.findOneAndRemove({ _id: id, userId });
    res.status(200).json(deletedBill);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const updateOneBill = async (req, res) => {
  let userId;
  jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, authData) => {
    if (err) {
      return res.sendStatus(403).json({ message: err });
    } else {
      userId = authData._id;
    }
  });

  const id = req.params.id;
  const body = req.body;
  try {
    const updatedBill = await Bill.findOneAndUpdate({ _id: id, userId }, body, {
      new: true,
    });
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
