const express = require("express");
const app = express();
const mango = require("mongoose");
const morgan = require("morgan");
const body = require("body-parser");

const userRotutes = require("./api/routes/User");
const productsRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mango.connect(<mongodb_connection_string>);

app.use(morgan("dev")); /// allows for auto server reloadss
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Method", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// middle ware
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRotutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// cathces all other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
