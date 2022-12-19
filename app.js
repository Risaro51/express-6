const database = require("./database");
const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.APP_PORT ?? 3000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("api/movies", movieHandlers.updateMovie);

const usersHandler = require("./usersHandler");

app.get("/api/users", usersHandler.getUsers);
app.get("/api/users/:id", usersHandler.getUserById);
app.post("/api/users", usersHandler.postUser);
app.put("api/users", usersHandler.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
