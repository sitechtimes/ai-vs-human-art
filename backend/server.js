require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/error_handler");
/* cors, cookieparser */
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
// cookie middleware
app.use(cookieParser());
// static files
app.use("/static", express.static(path.join(__dirname, "public")));
// error handler (very basic)
app.use(errorHandler);
// authenticated routes
app.use("/api/auth", require("./routes/api/auth"));
// default false endpoint rerouter
app.all("*", (req, res) => {
  res.sendStatus(404);
});
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// only opens database once connection is secure
mongoose.connection.once("open", () => {
  console.log("Mongoose is connected");
  app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
  });
});

/*
express js notes
req (request) = object containing HTTP request info
res (response) = response HTTP -- https://stackoverflow.com/questions/4696283/what-are-res-and-req-parameters-in-express-functions -- create db
*/
// You are up to https://www.youtube.com/watch?v=mCiPlL4LGtw
