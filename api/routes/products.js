const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewear/check-auth");
const productscon = require("../controllers/products");

router.get("/", productscon.get_all_products);

router.post("/", checkAuth, productscon.add_new_product);

router.get("/:id", productscon.get_product);

router.patch("/:id", checkAuth, productscon.update_product);

router.delete("/:id", checkAuth, productscon.delete_product);

module.exports = router;
