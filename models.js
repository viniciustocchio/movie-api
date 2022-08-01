const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
  Title: { type: String, require: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featired: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, require: true },
  Password: { type: String, require: true },
  Email: { type: String, require: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, re: "Movie" }],
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movies = Movie;
module.exports.User = User;