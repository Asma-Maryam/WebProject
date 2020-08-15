require("./config/config");
require("./models/db");
const stripe = require("stripe")(
  "sk_test_51HEesoLqC7uthaIRnCUAKXA0pBMKWJs30mvafI5gnDU1aAtOtMsRSXWSZZsOOu8OvbtnbE1SsLMKb2QGRuZnqRNB007YlN7pwz"
);

const express = require("express");
var multer = require("multer");
const rtsIndex = require("./routes/index.router");

var app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
app.use("/api", rtsIndex);
app.use("/public", express.static("public"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage }).single("image");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

// middleware

// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);
