require("dotenv").config();
const router = require("./routes/router");
const passport = require("./middleware/passport");
const cors = require("cors");

const express = require("express");

const app = express();

console.log("DB URL: process.env.DATABASE_URL");
app.use(express.json());
app.use(passport.initialize());

//cross origin resources enabled
app.use(cors());
//configure passport

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
