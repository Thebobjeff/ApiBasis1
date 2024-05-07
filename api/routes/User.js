const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mango = require("mongoose");
const User = require("../models/user");

router.get();

router.post("/signup", (request, response, next) => {
  User.find({ email: request.body.email })
    .exec()
    .then((uses) => {
      if (uses.length >= 1) {
        return response.status(409).json({
          message: "Email already in use",
        });
      } else {
        bcrypt.hash(request.body.password, 10, (err, hash) => {
          if (err) {
            return response.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mango.Types.ObjectId(),
              email: request.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                response.status(200).json({
                  message: "User Was created",
                  user: result,
                });
              })
              .catch((err) => {
                response.status(500).json({ error: err });
              });
          }
        });
      }
    });
});

router.post("/login", (req, response, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((acc) => {
      if (acc.length < 1) {
        return response.status(401).json({ message: "login Failed" });
      }
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.delete("/:id", (request, response, next) => {
  const userId = request.params.id;
  User.deleteOne({ _id: userId })
    .select("_id email password")
    .exec()
    .then((find) => {
      response.status(200).json({ message: `Deleted user, ID:${userId}` });
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

module.exports = router;
