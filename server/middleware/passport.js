const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../prismaClient/");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      //query db for user
      const user = await prisma.users.findUnique({
        where: {
          username: username,
        },
      });
      //if user doesn't exist, return error
      if (!user) {
        return done(null, false, { message: "Invalid username." });
      }
      //dehash saved password in db
      const match = await bcrypt.compare(password, user.password);
      //if passwords don't match, return error
      if (!match) {
        return done(null, false, { message: "Incorrect password." });
      }
      //if everything looks good, return the user
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);
