const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

app.use(bodyParser.json());

const morgan = require("morgan");
app.use(morgan("combined"));

let users = [
  {
    id: 1,
    name: "Andrea",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Felipe",
    favoriteMovies: ["Star Wars"],
  },
];

let movies = [
  {
    Title: "Inglorious Basterds",
    Genre: {
      Name: "War",
    },
  },
  {
    Title: "Lord of the Rings",
    Genre: {
      Name: "Adventure",
    },
  },
  {
    Title: "Harry Potter",
    Genre: {
      Name: "Fantasy",
    },
  },
  {
    Title: "The Avengers",
    Genre: {
      Name: "Action",
    },
  },
  {
    Title: "The Dark Knight",
    Genre: {
      Name: "Action",
    },
  },
  {
    Title: "Interstellar",
    Genre: {
      Name: "Adventure",
    },
  },
  {
    Title: "Toy Story",
    Genre: {
      Name: "Comedy",
    },
  },
  {
    Title: "Jurassic Park",
    Genre: {
      Name: "Adventure",
    },
  },
  {
    Title: "Star Wars",
    Genre: {
      Name: "Fantasy",
    },
  },
  {
    Title: "Forest Gump",
    Genre: {
      Name: "Drama",
    },
  },
];

//CREAT
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("user need names");
  }
});

//UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//CREAT
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

//READ
app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
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
<<<<<<< HEAD
});
=======
});
>>>>>>> 03f9af4d17ac266092623ff8760490aec640f0f9
