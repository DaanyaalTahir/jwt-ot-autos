const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const app = express();
const PORT = 3003;
const cors = require("cors");

var jwt = require("jsonwebtoken");
var publicKey = "";

app.use(cors());
app.use(express.json());
const uploadsDirectory = path.join(__dirname, "uploads");
app.use(express.static(uploadsDirectory));

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId, listingId, previousImg } = req.body;
    var dir = path.join(__dirname + `/uploads/${userId}/${listingId}/`);

    if (previousImg) {
      fs.unlinkSync(
        path.join(__dirname + `/uploads/${userId}/${listingId}/${previousImg}`)
      );
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

axios
  .get("http://localhost:3002/keys")
  .then((response) => {
    publicKey = response.data;
    console.log("Public token acquired");
  })
  .catch((error) => {
    console.error("Error fetching public key:", error);
  });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send({ message: "Token is required" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(403).send({ message: "Token is required" });
  }

  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.user = decoded;

    next();
  });
};

app.post("/saveImage", verifyToken, upload.single("file"), (req, res) => {
  res.send({ result: "success" });
});

app.post("/editImage", verifyToken, upload.single("file"), (req, res) => {
  res.send({ result: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
