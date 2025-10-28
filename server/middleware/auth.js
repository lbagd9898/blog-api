const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json({ error: "Auth heading missing" });
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;
  if (!bearerToken) {
    res.status(403).send("token not found");
  }
  jwt.verify(bearerToken, "secretkey", (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = payload;
    next();
  });
}

module.exports = verifyToken;
