const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.end("Hello world server is responded to the broweser.");
});

app.listen(3000, () => console.log("server is listening on PORT 3000"));
