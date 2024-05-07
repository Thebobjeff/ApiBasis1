const express = require("express");
const router = express.Router();
const mongo = require("mongoose");
const Product = require("../models/product");

router.get("/", (request, response, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((doc) => {
      const data = {
        Length: doc.length,
        Products: doc.map((items) => {
          return {
            name: items.name,
            price: items.price,
            _id: items.id,
            reply: {
              type: "Get",
              Url: "http://localhost:4321/products/" + items._id,
            },
          };
        }),
      };
      response.status(200).json(data);
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
    message: "Posted",
    CreatedProduct: {
      name: product.name,
      price: product.price,
      _id: product._id,
      reply: {
        type: "Post",
        url: `http://localhost:4321/products/${product._id}`,
      },
    },
  });
});

router.get("/:id", (request, response, next) => {
  const ids = request.params.id;

  Product.findById(ids)
    .select(" name price _id")
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
  const updateOps = {};
  for (const ops of request.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: ids }, { $set: updateOps })
    .exec()
    .then((doc) => {
      console.log(doc);
      response.status(200).json({
        message: `updated product with ID: ${ids}`,
        reply: {
          type: "GET",
          url: `http://localhost:4321/products/${ids}`,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: err });
    });
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
