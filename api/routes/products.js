const express = require("express");
const router = express.Router();
const mongo = require("mongoose");
const Product = require("../models/product");

router.get("/", (request, response, next) => {
  Product.find()
    .exec()
    .then((doc) => {
      console.log(doc);
      response.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: err });
    });
});

router.post("/", (request, response, next) => {
  const product = new Product({
    _id: new mongo.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  response.status(201).json({
    message: "handling postt request",
    CreatedProduct: product,
  });
});

router.get("/:id", (request, response, next) => {
  const ids = request.params.id;
  Product.findById(ids)
    .exec()
    .then((doc) => {
      console.log(doc);
      response.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:id", (request, response, next) => {
  const ids = request.params.id;
  if (ids) {
    response.status(200).json({
      message: "updated producted",
      ids: ids,
    });
  } else {
    response.status(200).json({
      message: "fail",
    });
  }
});

router.delete("/:id", (request, response, next) => {
  const ids = request.params.id;
  Product.deleteOne({ _id: ids })
    .exec()
    .then((doc) => {
      response.status(200).json({
        message: `You have delete ${ids}`,
        result: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: err });
    });
});

module.exports = router;
