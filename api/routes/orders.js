const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "order",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productID: req.body.productID,
    total: req.body.total,
  };
  res.status(201).json({
    message: "order was created",
    OrderInfo: order,
  });
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  if (orderId) {
    res.status(200).json({
      message: `order was created with id: ${orderId}`,
    });
  } else {
    res.status(200).json({
      message: "Fails",
    });
  }
});

router.delete("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  if (orderId) {
    res.status(200).json({
      message: `order,  ${orderId}, was deleted`,
    });
  } else {
    res.status(200).json({
      message: "Fails",
    });
  }
});
module.exports = router;
