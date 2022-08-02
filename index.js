const express = require("express"),
  app = express(),
  morgan = require("morgan"),
  fs = require("fs"), // import built in node modules fs and path
  path = require("path"),
  uuid = require("uuid");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");

const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

try {
  mongoose.connect("mongodb://localhost:27017/myflixDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch {
  console.log("can not conntact to db");
}

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));
// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie website!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.use(express.static("public"));

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
