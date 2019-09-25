const express = require("express");
const morgan = require("morgan"); // to check the log of the req
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const contactRoute = require("./api/routes/contact");
const userRoute = require("./api/routes/userRoute");

const app = express();
app.use(morgan("dev"));
app.use(express.json()); // for parsing data from req.body
app.use(cors()); // handle different request from different server
// multer for file uploading
app.use((req, res, next) => {
  console.log("middleware function");
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello");
});
app.use("/api/contacts", contactRoute);
app.use("/api/users", userRoute);

//database
mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database connected");
  }
);

PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
