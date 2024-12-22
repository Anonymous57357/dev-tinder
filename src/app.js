const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const { connectDB } = require("./config/database");

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then((res) => {
    console.log("database connection succesfull......");
    app.listen(8001, () => console.log("server is listening on PORT 8000"));
  })
  .catch((err) => {
    console.error("database not connected");
  });


  // DEVTINDER FRONTEND