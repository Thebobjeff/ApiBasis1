const mongo = require("mongoose");

const productSchema = mongo.Schema({
  _id: mongo.Schema.Types.ObjectId,
  name: String,
  price: Number,
});

module.exports = mongo.model("Product", productSchema);
