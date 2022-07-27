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
    Description: "A few Jewish soldiers are on an undercover mission to bring down the Nazi government and put an end to the war.",
    Genre: {
      Name: "War",
    },
    Director: {
      Name: "Quentin Tarantino"
    },
    Image: "https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg"
  },
  {
    Title: "Lord of the Rings",
    Description: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.",
    Genre: {
      Name: "Adventure",
    },
    Director: {
      Name: "Peter Jackson"
    },
    Image: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg"
  },
  {
    Title: "Harry Potter",
    Description: "Harry Potter is a film series based on the eponymous novels by J. K. Rowling. ",
    Genre: {
      Name: "Fantasy",
    },
    Director: {
      Name: "Chris Columbus"
    },
    Image: "https://static.wikia.nocookie.net/harrypotter/images/f/fb/PS_poster.jpg/revision/latest/scale-to-width-down/338?cb=20180318153750"
  },
  {
    Title: "The Avengers",
    Description: "Nick Fury is compelled to launch the Avengers Initiative when Loki poses a threat to planet Earth.",
    Genre: {
      Name: "Action",
    },
    Director: {
      Name: "Joss Whedon"
    },
    Image: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg"
  },
  {
    Title: "The Dark Knight",
    Description: "After Gordon, Dent and Batman begin an assault on Gotham's organised crime, the mobs hire the Joker, a psychopathic criminal mastermind who offers to kill Batman and bring the city to its knees.",
    Genre: {
      Name: "Action",
    },
    Director: {
      Name: "Christopher Nolan"
    },
    Image: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg"
  },
  {
    Title: "Interstellar",
    Description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    Genre: {
      Name: "Sci-fi",
    },
    Director: {
      Name: "Christopher Nolan"
    },
    Image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
  },
];

let directors = [
  {
    name: "Quentin Tarantino",
    bio: "Quentin Jerome Tarantino is an American filmmaker, actor, film critic and author.",
    birthYear: "1963",
    deathYear: null,
  },
  {
    name: "Peter Jackson",
    bio: "Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer.",
    birthYear: "1961",
    deathYear: null,
  },
  {
    name: "Chris Columbus",
    bio: "Chris Joseph Columbus is an American filmmaker.",
    birthYear: "1958",
    deathYear: null,
  },
  {
    name: "Joss Whedon",
    bio: "Joseph Hill Whedon is an American filmmaker, composer, and comic book writer.",
    birthYear: "1964",
    deathYear: null,
  },
  {
    name: "Christopher Nolan",
    bio: "Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
    birthYear: "1970",
    deathYear: null,
  },
];

//CREAT
//USERS
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

//MOVIES
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
});

app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName} = req.params;
   const director = directors.find((director) => director.name === directorName);
   if (director) {
     res.status(200).json(director);
   } else {
     res.status(400).send("no such director");
   }
 });
