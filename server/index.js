// server/index.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const PORT = 3001;
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
var jwt = require("jsonwebtoken");

var privateKey = fs.readFileSync("./private.key", "utf8");
var publicKey = "";

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "ot_autos",
});

// Fetch the public key from localhost:3002/keys
axios
  .get("http://localhost:3002/keys")
  .then((response) => {
    publicKey = response.data;
    console.log("Public token retrieved");
  })
  .catch((error) => {
    console.error("Error fetching public key:", error);
  });

db.connect();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send({ message: "Token is required" });
  }

  // Check if the authorization header starts with "Bearer " and remove it if present
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
    console.log(decoded);

    next();
  });
};

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

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?; ", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    if (result.length > 0) {
      console.log("Email Already Exists!");
      res.status(400).send({ message: "Email Already Exists!" });
    } else {
      console.log("Email is good!");
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO users (username, email, password) VALUES (?,?,?);",
          [username, email, hash],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            console.log(result.insertId);
            var signOptions = {
              issuer: "OT-Autos",
              subject: email,
              audience: "otautos.com",
              expiresIn: "24h",
              algorithm: "RS256",
            };

            var payload = {
              email,
              username: username,
              id: result.insertId,
            };

            var token = jwt.sign(payload, privateKey, signOptions);
            res.send({ id: result.insertId, token });
          }
        );
      });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT password FROM users WHERE email = ?; ",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log(result);

      bcrypt.compare(password, result[0].password, (err, result) => {
        if (result) {
          db.query(
            "SELECT username, id FROM users WHERE email = ?; ",
            [email],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              console.log(result);

              var signOptions = {
                issuer: "OT-Autos",
                subject: email,
                audience: "otautos.com",
                expiresIn: "24h",
                algorithm: "RS256",
              };

              var payload = {
                email,
                username: result[0].username,
                id: result[0].id,
              };

              var token = jwt.sign(payload, privateKey, signOptions);

              res.send({
                message: "Success",
                data: {
                  username: result[0].username,
                  id: result[0].id,
                  token,
                },
              });
            }
          );
        } else res.status(400).send({ message: "Incorrect password" });
      });
    }
  );
});
const upload = multer({ storage: fileStorageEngine });

app.post("/saveImage", upload.single("file"), (req, res) => {
  res.send({ result: "success" });
});

app.post("/postAd", verifyToken, (req, res) => {
  console.log(req.body);
  const {
    userId,
    make,
    model,
    year,
    mileage,
    fuelType,
    transmission,
    trim,
    description,
    imageName,
    address,
    phone,
    price,
    vehicleCondition,
    color,
  } = req.body;

  db.query(
    "INSERT INTO listings (userId, make, model, year, mileage, fuelType, transmission, trim, description, imageName, address, phone, price, vehicleCondition, color ) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      userId,
      make,
      model,
      year,
      mileage,
      fuelType,
      transmission,
      trim,
      description,
      imageName,
      address,
      phone,
      price,
      vehicleCondition,
      color,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send({ listingId: result.insertId });
    }
  );
});

app.get("/getUserAds", verifyToken, (req, res) => {
  const { userId } = req.query;
  console.log(req.query);

  db.query(
    "SELECT * FROM listings WHERE userId = ? ORDER BY id DESC;",
    [userId],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send({ listings: result });
    }
  );
});

app.post("/deleteListing", verifyToken, (req, res) => {
  const { listingId, userId } = req.body;
  const imgDir = `./uploads/${userId}/${listingId}`;
  db.query("DELETE FROM listings WHERE id = ?", [listingId], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    fs.rmSync(imgDir, { recursive: true, force: true });
    res.send({ result: "success" });
  });
});

app.post("/editAd", verifyToken, (req, res) => {
  const { id } = req.body;
  var values = [];

  let setValue = "";

  for (const property in req.body) {
    values.push(req.body[property]);
    setValue += `${property} = ?`;
    if (Object.keys(req.body)[Object.keys(req.body).length - 1] != property) {
      setValue += ",";
    }
  }

  db.query(
    `UPDATE listings SET ${setValue} WHERE id=${id}`,
    values,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result: "success" });
    }
  );
});

app.post("/editImage", verifyToken, upload.single("file"), (req, res) => {
  res.send({ result: "success" });
});

app.get("/search", (req, res) => {
  console.log(req.query);

  var values = [];
  let getValues = "";
  let index = 0;

  for (const property in req.query) {
    values.push(req.query[property]);
    if (index != 0) getValues += " AND ";
    else getValues += "WHERE ";
    index++;
    if (property == "price" || property == "mileage")
      getValues += `listings.${property} <= ?`;
    else if (property == "userId") getValues += `listings.userId != ?`;
    else getValues += `listings.${property} = ?`;
  }

  console.log(values);
  console.log(
    `SELECT listings.*, users.email, users.username FROM listings INNER JOIN users ON  listings.userId = users.id ${getValues} ORDER BY listings.id DESC;`
  );
  db.query(
    `SELECT listings.*, users.email, users.username FROM listings INNER JOIN users ON  listings.userId = users.id ${getValues} ORDER BY listings.id DESC;`,
    values,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send({ listings: result });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
