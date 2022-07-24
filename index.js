const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("combined"));

let topMovies = [
  {
    title: "Inglorious Basterds",
  },
  {
    title: "Lord of the Rings",
  },
  {
    title: "Harry Potter",
  },
  {
    title: "The Avengers",
  },
  {
    title: "The Dark Knight",
  },
  {
    title: "Interstellar",
  },
  {
    title: "Toy Story",
  },
  {
    title: "Jurassic Park",
  },
  {
    title: "Star Wars",
  },
  {
    title: "Forest Gump",
  },
];

//step 2.2
app.get("/movies", function (req, res) {
  res.json(topMovies);
});

//step 2.3
app.get("/", function (req, res) {
  res.send("this is a test!");
});

// 2.4
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
