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

async function getPosts(req, res) {
  console.log("server reached");
  try {
    const posts = await prisma.posts.findMany({
      include: {
        user: {
          select: { username: true },
        },
        comments: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
    return res.json({ posts });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "failed to fetch posts" });
  }
}

module.exports = { getHomepage, getSignUp, postLogIn, getPosts, postSignUp };
