const jwt = require("jsonwebtoken");

function getHomepage(req, res) {
  res.send("app running");
}

function getSignUp(req, res) {
  res.send("sign up page");
}

async function postSignUp(req, res) {
  const { username, password } = req.body;
  console.log("user created.");
}

// const postLogIn = [
//     //user is authenticated
//     //token is created
// ]

function postLogIn(req, res) {
  const user = {
    id: 1,
    username: "lydia",
    email: "lydia@lydia.com",
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    if (err) return res.status(500);
    res.json({
      token,
    });
  });
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
