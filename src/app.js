const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);

const { connectDB } = require("./config/database");
app.use(cookieParser());
app.use(express.json());

connectDB()
  .then((res) => {
    console.log("database connection succesfull......");
    app.listen(8000, () => console.log("server is listening on PORT 8000"));
  })
  .catch((err) => {
    console.error("database not connected");
  });
