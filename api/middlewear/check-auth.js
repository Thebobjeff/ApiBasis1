const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_Key);
    req.useData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      messaged: "Auth Failed :(",
      error: req.body.token,
    });
  }
};
