exports.adminAuth = (req, res, next) => {
  console.log("Middleware called");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    console.log("admin auth is getting checked");
    res.send("NOT AUTHORIZED");
  } else {
    next();
  }
};

exports.userAuth = (req, res, next) => {
  console.log("Middleware called");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    console.log("user auth is getting checked");
    res.send("NOT AUTHORIZED");
  } else {
    next();
  }
};
