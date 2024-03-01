const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3002;

var publicKey = fs.readFileSync("./public.key", "utf8");

app.use(bodyParser.json());

// Route to get all keys
app.get("/keys", (req, res) => {
  res.json(publicKey);
});

// Route to add a new key
app.post("/keys", (req, res) => {
  const { id, publicKey } = req.body;

  if (!id || !publicKey) {
    return res
      .status(400)
      .json({ error: "Both id and publicKey are required." });
  }

  keyRepository[id] = publicKey;
  res.json({ message: "Key added successfully." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
