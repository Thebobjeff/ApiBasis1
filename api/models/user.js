const mongo = require("mongoose");

const userSchema = mongo.Schema({
  _id: mongo.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongo.model("User", userSchema);
