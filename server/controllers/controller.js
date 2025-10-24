const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const passport = require("../middleware/passport");

function getHomepage(req, res) {
  res.send("app running");
}

function getSignUp(req, res) {
  res.send("sign up page");
}

async function postSignUp(req, res) {
  console.log("signup initiated");
  const body = req.body;
  const usernameExists = await prisma.users.findUnique({
    where: {
      username: body.username,
    },
  });
  if (usernameExists) {
    return res.status(409).json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  await prisma.users.create({
    data: {
      username: body.username,
      password: hashedPassword,
    },
  });
  return res.status(201).json({ message: "signup successful" });
}

function postLogIn(req, res, next) {
  console.log("reached server");
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    console.log("passport info", info);
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    //if user exists
    jwt.sign(
      { id: user.id, username: user.username },
      "secretkey",
      (err, token) => {
        if (err)
          return res.status(500).json({ message: "token generation failed" });
        return res.json({
          token,
        });
      }
    );
  })(req, res, next);
}

function getPosts(req, res) {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403);
    } else {
      res.json({ authData });
    }
  });
}

module.exports = { getHomepage, getSignUp, postLogIn, getPosts, postSignUp };
