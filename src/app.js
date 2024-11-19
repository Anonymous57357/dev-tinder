const express = require("express");

const app = express();

const { connectDB } = require("./config/database");

const User = require("./models/user");

app.use(express.json());

// signup user
app.post("/signup", async (req, res, next) => {
  const user = req.body;

  try {
    const userObj = new User(user);

    if (user.age < 18) {
      throw new Error("minimum age required");
    } 

    await userObj.save();
    res
      .status(200)
      .json({ message: "user created successfully", data: userObj });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User API - GET user by email
app.get("/user", async (req, res, next) => {
  const users = await User.findOne(req.body.email).exec();

  try {
    if (!users) {
      res.status(404).json({ message: "Email is not verified" });
    } else {
      res.status(200).json({ message: "Email verified successfully", users });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "error fetching a user", error: error.message });
  }

  // try {
  //   if (users.length === 0) {
  //     res.status(404).json({ message: "User not found" });
  //   } else {
  //     res
  //       .status(200)
  //       .json({ message: "user fetched successfully", userCount, data: users });
  //   }
  // } catch (error) {
  //   res
  //     .status(400)
  //     .json({ message: "error fetching a user", error: error.message });
  // }
});

// Feed API - GET all the users from the database
app.get("/feed", async (req, res, next) => {
  const feed = await User.countDocuments();

  try {
    res.status(200).json({ message: "user fetched successfully", feed });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error fetching a user", error: error.message });
  }
});

// User API - DELETE user from the database
app.delete("/user", async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const user = await User.findOneAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    res.status(204).json({ message: "user deleted successflly" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error fetching a user", error: error.message });
  }
});

// User API - UPDATA user from the database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const user = req.body;
  console.log(user.skills);

  try {
    // api validation
    const ALLOWED_USERS = [
      "userId",
      "photoUrl",
      "gender",
      "about",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(user).every((key) =>
      ALLOWED_USERS.includes(key)
    );

    if (user?.skills.length > 10) {
      throw new Error("skills is not more than 10");
    }

    if (!isUpdateAllowed) {
      throw new Error("Update contains disallowed fields");
    }
    const updateUser = await User.findByIdAndUpdate(userId, user, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updateUser) {
      new Error("User not found");
    }

    res
      .status(200)
      .json({ message: "User updated successfully", data: updateUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

connectDB()
  .then((res) => {
    console.log("database connection succesfull......");
    app.listen(3000, () => console.log("server is listening on PORT 3000"));
  })
  .catch((err) => {
    console.error("database not connected");
  });
