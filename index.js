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
  mongoose.connect("mongodb://localhost:27017/myflixdatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch {
  console.log("can not conntact to db");
}

app.post("/users", (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + "already exists");
      } else {
        Users.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

app.post("/movies", (req, res) => {
  try {
    Movies.create({
      Title: req.body.Title,
      Description: req.body.Description,
      Genre: req.body.Genre,
      Director: req.body.Director,
      Actors: req.body.Actors,
      ImagePath: req.body.ImagePath,
    })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  } catch {
    console.log("can not add this movie");
  }
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

app.post("/movies", (req, res) => {
  try {
    Movies.create({
      Title: req.body.Title,
      Description: req.body.Description,
      Genre: req.body.Genre,
      Director: req.body.Director,
      Actors: req.body.Actors,
      ImagePath: req.body.ImagePath,
    })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  } catch {
    console.log("can not add this movie");
  }
});

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

//READ - Shows a list of all the movies
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ - Shows a certain movie title
app.get("/movies/:title", (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ - Shows a specific genre
app.get("/movies/genre/:name", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.name })
    .then((movies) => {
      res.json(movies.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ - Shows director
app.get("/movies/directors/:name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.name })
    .then((movies) => {
      res.json(movies.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Update user's info by username
app.put("/users/:username", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        Birthday: req.body.Birthday,
        FavouriteMovies: req.body.FavouriteMovies,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// add a movie to user's list of favourites
app.post("/users/:username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: { FavouriteMovies: req.params.MovieID },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE - Delete movie title from users array
app.delete("/users/:username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    {
      $pull: { FavouriteMovies: req.params.MovieID },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete a user by username
app.delete("/users/:username", (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + " was not found");
      } else {
        res.status(200).send(req.params.username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});