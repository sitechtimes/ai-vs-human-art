require("dotenv").config();
require("./config/database");
const { MongoClient } = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const errorHandler = require("./middleware/error_handler");
const itemController = require("./controllers/itemController");
const artModel = require("./models/artModel");
/* cors, cookieparser */

app.use("/gallery", itemController);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use(cookieParser()); // cookie middleware
app.use(errorHandler); // error handler (very basic)
app.use("/api/auth", require("./routes/api/auth")); // authenticated routes
app.all("*", (req, res) => {
  // default false endpoint rerouter
  res.sendStatus(404);
});
app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose
  .connect(process.env.DATABASE_URI, {
    dbName: "mevn_gallery",
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });
mongoose.connection.on(
  // only opens database once connection is secure
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Mongoose is connected");
  app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
    console.log(Object.keys(mongoose.connection.collections));
  });
  artModel
    .find()
    .lean()
    .exec()
    .then((result) => {
      console.log(result);
    });
});
/*
express js notes
req (request) = object containing HTTP request info
res (response) = response HTTP -- https://stackoverflow.com/questions/4696283/what-are-res-and-req-parameters-in-express-functions -- create db
*/
// You are up to https://www.youtube.com/watch?v=mCiPlL4LGtw
