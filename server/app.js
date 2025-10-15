require("dotenv").config();
const router = require("./routes/router");

const express = require("express");

const app = express();

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
