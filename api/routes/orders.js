const express = require("express");
const router = express.Router();

const mango = require("mongoose");

const Orders = require("../models/order");

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Orders.find()
    .select(" _id product total ")
    .exec()
    .then((request) => {
      res.status(200).json({
        Count: request.length,
        order: request.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            total: doc.total,
            reply: {
              type: "GET",
              Url: "http://localhost:4321/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.product)
    .then((prod) => {
      console.log(req.body.product);
      if (!prod) {
        return res.status(404).json({
          message: "Product not Found",
        });
      }
      const order = new Orders({
        _id: new mango.Types.ObjectId(),
        product: req.body.product,
        total: req.body.total,
      });
      return order.save();
    })
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  Orders.findById(orderId)
    .select(" _id product total")
    .exec()
    .then((order1) => {
      res.status(200).json({
        order: order1,
        repy: {
          type: "GET",
          url: "http://localhost:4321/orders/" + orderId,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  Orders.deleteOne({ _id: orderId })
    .select("name product total")
    .exec()
    .then((order1) => {
      res.status(200).json({
        message: `Product Id:${orderId} has been removed`,
        order: order1,
      });
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});
module.exports = router;
