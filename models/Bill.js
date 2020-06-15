const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      required: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
    date: {
      type: String,
      required: true,
      max: new Date().toISOString().slice(0, 10),
    },
    tags: {
      type: [String],
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false, // set to false then it wont create in mongodb
  }
);

module.exports = mongoose.model("Bill", billSchema);
