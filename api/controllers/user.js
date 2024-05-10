const bcrypt = require("bcrypt");
const mango = require("mongoose");
const User = require("../models/user");
const Jwt = require("jsonwebtoken");

exports.add_user = (request, response, next) => {
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
};

exports.loggin_user = (req, response, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((acc) => {
      if (acc.length < 1) {
        return response.status(401).json({ message: "login Failed" });
      } else {
        bcrypt.compare(req.body.password, acc[0].password, (err, reply) => {
          if (err) {
            return response.status(401).json({ message: "login Failed" });
          } else if (reply) {
            const token = Jwt.sign(
              {
                email: acc[0].email,
                password: acc[0]._id,
              },
              process.env.JWT_Key,
              {
                expiresIn: "1hr",
              }
            );
            return response
              .status(201)
              .json({ message: "Auth Passed", Expites: "1 HR", token: token });
          } else {
            return response.status(401).json({ message: "login Failed" });
          }
        });
      }
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
};

exports.delete_User = (request, response, next) => {
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
};
