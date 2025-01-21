const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const { connectDB } = require("./config/database");

app.use(
  cors({
    origin: "https://wonderful-scone-eff20c.netlify.app/", // Allow only your frontend URL
    credentials: true, // Allow cookies and headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const PORT = process.env.PORT || 8000;

connectDB()
  .then((res) => {
    console.log("database connection succesfull......");
    app.listen(PORT, () => console.log("server is listening on PORT 8000"));
  })
  .catch((err) => {
    console.error("database not connected");
  });

// DEVTINDER FRONTEND
