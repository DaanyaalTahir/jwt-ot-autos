// server/index.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const PORT = 3001;
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "ot_autos",
});

db.connect();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

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
            res.send({ id: result.insertId });
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
              res.send({
                message: "Success",
                data: {
                  username: result[0].username,
                  id: result[0].id,
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

app.post("/postAd", (req, res) => {
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

app.get("/getUserAds", (req, res) => {
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

app.post("/deleteListing", (req, res) => {
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

app.post("/editAd", (req, res) => {
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

app.post("/editImage", upload.single("file"), (req, res) => {
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
