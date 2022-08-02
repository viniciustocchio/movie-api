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
    id: "62c862269bc75c5e27c7a4dc",
    Username: "Andrea",
    Password: "1234",
    Email: "and@gmail.com",
    Birthday: "1985-02-19",
    favoriteMovies: ["Silence of the Lambs", "Inception", "Dunkirk"]
  },
  {
    id: "62c862269bc75c5e27c7a4dc",
    Username: "Felipe",
    Password: "4567",
    Email: "feli@gmail.com",
    Birthday: "1984-04-26",
    favoriteMovies: ["Inception", "Saving Private Ryan"]
  },
  {
    id: "62c862269bc75c5e27c7a4de",
    Username: "Icaro",
    Password: "4732",
    Email: "ic@hotmail.com",
    Birthday: "1988-05-13",
    favoriteMovies: ["Toy Story", "Indiana Jones and the Raiders of the Lost Ark"]
  },
  {
    id: "62c862269bc75c5e27c7a4df",
    Username: "Rosa",
    Password: "4562",
    Email: "rosa@hotmail.com",
    Birthday: "1978-05-16",
    favoriteMovies: ["Jurassic Park", "Toy Story"]
  },
  {
    id: "62c862279bc75c5e27c7a4e0",
    Username: "Regina",
    Password: "1543",
    Email: "reg@yahoo.com",
    Birthday: "1970-11-14",
    favoriteMovies: ["Tenet", "Dunkirk", "Saving Private Ryan"]
  },
];

let movies = [
  {
    id: "62c862259bc75c5e27c7a4d2",
    Title: "Silence of the Lambs",
    Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    Genre: {
      Name: "Thriller",
      Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
    },
    Director: {
      Name: "Jonathan Demme",
      Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      Birth: "1944",
      Death: "2017"
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg"
  },
  {
    id: "62c862259bc75c5e27c7a4d3",
    Title: "Interstellar",
    Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
      Birth: "1970",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
  },
  {
    id: "62c862259bc75c5e27c7a4d4",
    Title: "Tenet",
    Description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
      Birth: "1970",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Tenet_movie_poster.jpg/220px-Tenet_movie_poster.jpg"
  },
  {
    id: "62c862259bc75c5e27c7a4d5",
    Title: "Inception",
    Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
      Birth: "1970",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
  },
  {
    id: "62c862259bc75c5e27c7a4d6",
    Title: "Dunkirk",
    Description: "Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.",
    Genre: {
      Name: "Drama",
      Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
      Birth: "1970",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/1/15/Dunkirk_Film_poster.jpg"
  },
  {
    id: "62c862259bc75c5e27c7a4d7",
    Title: "The Manchurian Candidate",
    Description: "In the midst of the Gulf War, soldiers are kidnapped and brainwashed for sinister purposes.",
    Genre: {
      Name: "Drama",
      Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    Director: {
      Name: "Jonathan Demme",
      Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      Birth: "1944",
      Death: "2017"
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/The_Manchurian_Candidate_poster.jpg/220px-The_Manchurian_Candidate_poster.jpg"
  },
  {
    id: "62c862259bc75c5e27c7a4d8",
    Title: "Saving Private Ryan",
    Description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    Genre: {
      Name: "War",
      Description: "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
    },
    Director: {
      Name: "Steven Spielberg",
      Bio: "Steven Allan Spielberg is an American film director, producer, and screenwriter. A figure of the New Hollywood era, he is the most commercially successful director of all time.",
      Birth: "1946",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Saving_Private_Ryan_poster.jpg/220px-Saving_Private_Ryan_poster.jpg"
  },
  {
    id: "62c862259bc75c5e27c7a4d9",
    Title: "Indiana Jones and the Raiders of the Lost Ark",
    Description: "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
    Genre: {
      Name: "Adventure",
      Description: "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films."
    },
    Director: {
      Name: "Steven Spielberg",
      Bio: "Steven Allan Spielberg is an American film director, producer, and screenwriter. A figure of the New Hollywood era, he is the most commercially successful director of all time.",
      Birth: "1946",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Raiders_of_the_Lost_Ark_Theatrical_Poster.jpg/220px-Raiders_of_the_Lost_Ark_Theatrical_Poster.jpg"
  },
  {
    id: "62c862269bc75c5e27c7a4da",
    Title: "Jurassic Park",
    Description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    Genre: {
      Name: "Adventure",
      Description: "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films."
    },
    Director: {
      Name: "Steven Spielberg",
      Bio: "Steven Allan Spielberg is an American film director, producer, and screenwriter. A figure of the New Hollywood era, he is the most commercially successful director of all time.",
      Birth: "1946",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg"
  },
  {
    id: "62c862269bc75c5e27c7a4db",
    Title: "Toy Story",
    Description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    Genre: {
      Name: "Animation",
      Description: "Animation is a method in which figures are manipulated to appear as moving images."
    },
    Director: {
      Name: "John Lasseter",
      Bio: "John Alan Lasseter is an American film director, producer, screenwriter, animator, voice actor, and the head of animation at Skydance Animation.",
      Birth: "1957",
      Death: null
    },
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Toy_Story.jpg/220px-Toy_Story.jpg"
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

app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName} = req.params;
   const director = directors.find((director) => director.name === directorName);
   if (director) {
     res.status(200).json(director);
   } else {
     res.status(400).send("no such director");
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