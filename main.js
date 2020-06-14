const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const billsRouter = require("./routes/bills");
const usersRouter = require("./routes/users");

const app = express();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES MIDDLEWARE
app.use("/bills", billsRouter);
app.use("/users", usersRouter);

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
