const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const { connectDB } = require("./config/database");

// Dynamic CORS configuration based on the environment
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://techtinder.netlify.app/" // Deployed frontend URL
        : "http://localhost:5173", // Local frontend URL
    credentials: true, // Allow credentials (cookies, headers)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
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

const PORT = process.env.PORT || 8001;

connectDB()
  .then((res) => {
    console.log("database connection succesfull......");
    app.listen(PORT, () => console.log("server is listening on PORT 8000"));
  })
  .catch((err) => {
    console.error("database not connected");
  });

// DEVTINDER FRONTEND
