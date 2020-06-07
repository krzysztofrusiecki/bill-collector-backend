const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const billsRouter = require("./routes/bills");

const app = express();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/bills", billsRouter);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("connected to DB")
);

app.listen(3000);
