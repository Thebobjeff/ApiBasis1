const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewear/check-auth");
const orderscon = require("../controllers/allorders");

router.get("/", orderscon.orders_get_all);

router.post("/", checkAuth, orderscon.new_order);

router.get("/:orderId", checkAuth, orderscon.get_order);

router.delete("/:orderId", checkAuth, orderscon.delete_order);
module.exports = router;
