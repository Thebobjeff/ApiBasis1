const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");

const orderSchema = mongo.Schema({
  _id: mongo.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  total: { type: Number, default: 1 },
});

module.exports = mongo.model("Order", orderSchema);
